import React, { useEffect, useState, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { cloneDeep } from 'lodash';

import { fetchAwardTransaction } from 'Helpers/searchHelper';
import { areTransactionDatesOrAwardAmountsInvalid } from 'Helpers/contractGrantActivityHelper';
import ResultsTableLoadingMessage from 'Components/search/table/ResultsTableLoadingMessage';
import ResultsTableErrorMessage from 'Components/search/table/ResultsTableErrorMessage';
import NoResultsMessage from 'Components/sharedComponents/NoResultsMessage';
import ContractGrantActivity from 'Components/award/shared/activity/ContractGrantActivity';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TooltipWrapper } from 'data-transparency-ui';
import {
    contractActivityGrants,
    contractActivityInfoContracts
} from 'Components/award/shared/InfoTooltipContent';

const propTypes = {
    awardId: PropTypes.string,
    awardType: PropTypes.string,
    dates: PropTypes.object
};

const ContractGrantActivityContainer = ({ awardId, awardType, dates }) => {
    // bad dates
    const [badDates, setBadDates] = useState(false);
    // loading
    const [loading, setLoading] = useState(false);
    // transactions
    const [transactions, updateTransactions] = useState([]);
    // errors
    const [error, updateError] = useState({ error: false, message: '' });
    // requests
    const request = useRef(null);
    const hasNext = useRef(true);
    /**
     * formatTransactions
     * - any transactions that have the same date must be summed into one amount.
     * We need to keep all transactions with the same date for the paginating tooltips.
     * @param {Object[]} - an array of all transaction objects for this award.
     * @returns {Object[]} - an array of all transaction objects for this award.
     */
    const formatTransactions = (rawTransactions) => {
        // Reduce into unique transaction objects
        let newData = rawTransactions
            .sort((a, b) => a.action_date.valueOf() - b.action_date.valueOf())
            .reduce((acc, data) => {
                const updatedData = { ...data };
                updatedData.action_date = moment(updatedData.action_date, 'YYYY-MM-DD');
                const currentTransactionIndex = acc.findIndex((x) => x.action_date.valueOf() === updatedData.action_date.valueOf());
                /**
                 * When we have multiple transactions on the same day, we will sum their obligation and
                 * we will keep track of all the transactions on the same date for the tooltips in the
                 * allTransactions property.
                 */
                if (currentTransactionIndex !== -1) {
                    // update the allTransactions array if it exists
                    if (acc[currentTransactionIndex]?.allTransactions) {
                        acc[currentTransactionIndex].allTransactions.push(updatedData);
                    }
                    else {
                        /**
                         * The first duplicate found.
                         * We will add the duplicate which is this data, and we will add the
                         * original node which is acc[currentTransactionIndex].
                         */
                        const clonedTransaction = cloneDeep(acc[currentTransactionIndex]);
                        acc[currentTransactionIndex].allTransactions = [clonedTransaction, updatedData];
                    }
                    /**
                     * We sum the obligation last since we will want to keep the original obligation
                     * value if we add it to the allTransactions array.
                     */
                    const sumOfObligations = acc[currentTransactionIndex].federal_action_obligation + updatedData.federal_action_obligation;
                    acc[currentTransactionIndex].federal_action_obligation = sumOfObligations;
                    return acc;
                }
                acc.push(updatedData);
                return acc;
            }, []);
        // remove negative values or data with no dates
        let previousRunningObligationTotal = 0;
        newData = newData
            .filter((data) => !isNaN(data.action_date.valueOf()))
            .sort((a, b) => a.action_date.valueOf() - b.action_date.valueOf())
            .map((data, i) => {
                const updatedData = data;
                // handles missing federal action obligation
                if (!updatedData.federal_action_obligation) updatedData.federal_action_obligation = 0;
                if (i === 0) { // first one do not sum
                    updatedData.running_obligation_total = data.federal_action_obligation;
                    previousRunningObligationTotal = data.federal_action_obligation;
                    return updatedData;
                }
                const total = previousRunningObligationTotal + data.federal_action_obligation;
                updatedData.running_obligation_total = total;
                previousRunningObligationTotal = total;
                return updatedData;
            });
        return newData;
    };
    // Get all transactions ascending
    const getTransactions = useCallback(() => {
        const asyncFunc = async () => {
            if (request.current) request.current.cancel();
            setLoading(true);
            const params = {
                award_id: awardId,
                page: 1,
                sort: 'federal_action_obligation',
                order: 'asc',
                limit: 5000
            };
            // let hasNext = true;
            /**
             * paginateTransactions
             * - Generator function that fetches transactions
             * @returns {Object[]} - an array of one page of transactions
             */
            async function* paginateTransactions() {
                while (hasNext.current) {
                    try {
                        request.current = fetchAwardTransaction(params);
                        const response = await request.current.promise;
                        params.page++;
                        hasNext.current = response.data.page_metadata.hasNext;
                        yield response.data;
                    }
                    catch (e) {
                        hasNext.current = false;
                        updateError({ error: true, message: e.message });
                    }
                }
                return null;
            }
            /**
             * getAllTransactions
             * - Iterator that iterates through all transactions
             * @returns {Object[]} - an array of all transactions
             */
            const getAllTransactions = async () => {
                const data = [];
                const iterator = paginateTransactions();
                for await (const transaction of iterator) {
                    data.push(...transaction.results);
                }
                return data;
            };
            /**
             * allTransactions
             * - executes getAllTransactions
             * @returns {Object[]} - an array of all transactions
             */
            const allTransactions = await getAllTransactions();
            updateTransactions(formatTransactions(allTransactions));
            setLoading(false);
        };
        asyncFunc();
    }, [awardId]);
    // hook - runs on mount and anytime awardId and getTransactions change
    useEffect(() => {
        getTransactions();
        return () => {
            if (request.current) request.current.cancel();
            if (hasNext.current) hasNext.current = false;
        };
    }, [getTransactions, awardId]);
    // Bad Data - hook - run on mount and if award changes
    useEffect(() => {
        setBadDates(areTransactionDatesOrAwardAmountsInvalid(dates, awardType, transactions));
    }, [
        dates,
        awardType,
        transactions
    ]);
    /**
     * title
     * - updates title based on award type
     * @returns {String} - '[Grants || Contract] Activity'
     */
    const title = () => (awardType === 'grant' ? 'Grant Activity' : 'Contract Activity');
    /**
     * message
     * - updates the message displayed to users based on error, loading, and
     * transactions state properties
     * @returns {Component} - respective error, loading or no results component
     */
    const message = () => {
        if (error.error) return <ResultsTableErrorMessage />;
        if (loading) return <ResultsTableLoadingMessage />;
        if (badDates || !transactions.length) {
            return (
                <NoResultsMessage
                    title="Chart Not Available"
                    message="Data in this instance is not suitable for charting" />
            );
        }
        return null;
    };
    /**
     * content
     * - displays content if there is data
     * @returns {Component} - ContractGrantsActivity
     */
    const content = () => {
        if (
            !error.error
            && !loading
            && transactions.length > 0
            && !badDates
        ) {
            return (
                <ContractGrantActivity
                    transactions={transactions}
                    dates={dates}
                    awardType={awardType} />
            );
        }
        return null;
    };
    /**
     * tooltip info
     * - updates the tooltip data based on award type
     * @return {Component} - respective tooltip data
     */
    const tooltipInfo = () => {
        if (awardType === 'grant') return contractActivityGrants;
        return contractActivityInfoContracts;
    };

    return (
        <div className="award__col award-viz contract-grant-activity">
            <div className="award__col__content">
                <div className="award-viz__heading">
                    <div className="award-viz__icon">
                        <FontAwesomeIcon size="lg" icon="chart-area" />
                    </div>
                    <h3 className="award-viz__title">{title()}</h3>
                    <TooltipWrapper
                        className="award-section-tt"
                        icon="info"
                        wide
                        tooltipComponent={tooltipInfo()} />
                </div>
                <hr />
                <div className="results-table-message-container">
                    {message()}
                </div>
                {content()}
            </div>
        </div>
    );
};

ContractGrantActivityContainer.propTypes = propTypes;

export default ContractGrantActivityContainer;