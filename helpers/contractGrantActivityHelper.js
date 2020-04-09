/**
 * Created By Jonathan Hill 03/26/20
 */

import { cloneDeep } from 'lodash';
import { isAwardFinancialAssistance } from 'Helpers/awardSummaryHelper';
// import { badPotentialEndDate } from '../../../tests/testResources/mockContractGrantActivityHelper';

/**
 * lineHelper
 * - determines if a line should be drawn
 * @param {Moment{}} date
 * @returns {null || Number}
 */
export const lineHelper = (date) => {
    if (!date || isNaN(date.valueOf())) return null;
    return date.valueOf();
};
/**
 * areTransactionDatesOrAwardAmountsInvalid
 * - determines if we do not have suitable data to draw the chart based on dates,
 * award type and transactions
 * @param {Object} dates - award dates
 * @param {string} awardType - award type
 * @param {Object[]} transactions - array of transaction objects
 * @returns {Boolean} - is the data suitable for charting
 */
export const areTransactionDatesOrAwardAmountsInvalid = (dates, awardType, transactions) => {
    const {
        _startDate: startDate,
        _endDate: currentEndDate,
        _potentialEndDate: potentialEndDate
    } = dates;
    // any running obligation total is negative
    if (transactions.some((x) => {
        if (x.running_obligation_total) {
            return x.running_obligation_total.toString().startsWith('-');
        }
        return false;
    })) return true;
    /**
     * handles null, '', or 'random string' passed to moment
     */
    const badStart = isNaN(startDate.valueOf());
    const badCurrent = isNaN(currentEndDate.valueOf());
    const badEnd = isNaN(potentialEndDate.valueOf());
    const noTransactionHasDates = transactions.every((t) => isNaN(t.action_date.valueOf()));
    const onlyOneTransaction = transactions.length === 1;
    if (isAwardFinancialAssistance(awardType)) { // grant
        // 3
        if (noTransactionHasDates) return true;
        if (badStart && badCurrent && onlyOneTransaction) return true;
        // 4.b and 5.b
        if (onlyOneTransaction) {
            // 4.b
            if ((badStart && !badCurrent)) {
                if (transactions[0].action_date.valueOf() > currentEndDate.valueOf()) return true;
            }
            // 5.b
            if (badCurrent && !badStart) {
                if (transactions[0].action_date.valueOf() < startDate.valueOf()) return true;
            }
        }
        return false;
    }
    // contract
    // 3
    if (noTransactionHasDates) return true;
    if (badStart && badCurrent && badEnd && onlyOneTransaction) return true;
    // 4.b and 5.b
    if (onlyOneTransaction) {
        // 4.b
        if ((badStart && (!badCurrent || !badEnd))) {
            // since contracts could have current or potential we test both - potential first
            if (potentialEndDate.valueOf() && (transactions[0].action_date.valueOf() > potentialEndDate.valueOf())) return true;
            if (currentEndDate.valueOf() && (transactions[0].action_date.valueOf() > currentEndDate.valueOf())) return true;
        }
        // 5.b
        if ((badCurrent && badEnd) && !badStart) {
            if (transactions[0].action_date.valueOf() < startDate.valueOf()) return true;
        }
    }
    return false;
};
/**
 * beforeDate
 * - determines if the first date is before the second date
 * @param {Moment{}} start - date to compare
 * @param {Moment{}} end - date to compare
 * @returns {Moment{}} - moment object
 */
export const beforeDate = (start, end) => {
    if (start.isBefore(end)) return start;
    return end;
};
/**
 * afterDate
 * - determines if the first date is after the second date
 * @param {Moment{}} start - date to compare
 * @param {Moment{}} end - date to compare
 * @returns {Moment{}} - moment object
 */
export const afterDate = (start, end) => {
    if (start.isAfter(end)) return start;
    return end;
};
/**
 * getXDomain
 * - Determines the getXDomain based on dates, award type and transactions for a given award.
 * @param {Object} dates - award dates
 * @param {string} awardType - award type
 * @param {Object[]} transactions - array of transaction objects
 * @returns {Number[]} - array with a min and max value, e.g. [min, max]
 */
export const getXDomain = (dates, awardType, transactions) => {
    const {
        _startDate: startDate,
        _endDate: currentEndDate,
        _potentialEndDate: potentialEndDate
    } = dates;
    const transactionData = cloneDeep(transactions);
    /**
     * handles null, '', or 'random string' passed to moment
     */
    const badStart = isNaN(startDate.valueOf());
    const badCurrent = isNaN(currentEndDate.valueOf());
    const badEnd = isNaN(potentialEndDate.valueOf());
    const onlyOneTransaction = transactions.length === 1;

    // only one transaction
    if (onlyOneTransaction) {
        if (isAwardFinancialAssistance(awardType)) { // grant
            // 5.a start and no end use transaction as end domain
            if (!badStart && badCurrent) return [startDate.valueOf(), transactions[0].action_date.valueOf()];
            // 4.a no start and end use transaction as start domain
            if (badStart && !badCurrent) return [transactions[0].action_date.valueOf(), currentEndDate.valueOf()];
            return [beforeDate(transactionData[0].action_date, startDate).valueOf(), afterDate(transactionData[0].action_date, currentEndDate).valueOf()];
        }
        // 5.a start and no end use transaction as end domain
        if (!badStart && (badCurrent && badEnd)) return [startDate.valueOf(), transactions[0].action_date.valueOf()];
        // 4.a no start and end use transaction as start domain
        if (badStart && (!badCurrent || !badEnd)) {
            const date = !badEnd ? potentialEndDate : currentEndDate;
            return [transactions[0].action_date.valueOf(), date.valueOf()];
        }
        return [beforeDate(transactionData[0].action_date, startDate).valueOf(), afterDate(transactionData[0].action_date, potentialEndDate).valueOf()];
    }

    if (isAwardFinancialAssistance(awardType)) { // grant
        // 6 no dates use transactions
        if (badStart && badEnd) return [transactionData.shift().action_date.valueOf(), transactionData.pop().action_date.valueOf()];
        // 7 no start and end use first transaction
        if (badStart && !badCurrent) return [transactionData.shift().action_date.valueOf(), afterDate(transactionData.pop().action_date, currentEndDate).valueOf()];
        // 8 no end and start use last transaction
        if (badCurrent && !badStart) return [beforeDate(transactionData.shift().action_date, startDate).valueOf(), transactionData.pop().action_date.valueOf()];
        return [beforeDate(transactionData.shift().action_date, startDate).valueOf(), afterDate(transactionData.pop().action_date, currentEndDate).valueOf()];
    }
    // 6 no dates use transactions
    if (badStart && badCurrent && badPotentialEndDate) return [transactionData.shift().action_date.valueOf(), transactionData.pop().action_date.valueOf()];
    // 7 no start and end use first transaction
    if (badStart && (!badCurrent || !badEnd)) {
        const date = !badEnd ? potentialEndDate : currentEndDate;
        return [transactionData.shift().action_date.valueOf(), afterDate(transactionData.pop().action_date, date).valueOf()];
    }
    // 8 no end and start use last transaction
    if ((badCurrent && badEnd) && !badStart) return [beforeDate(transactionData.shift().action_date, startDate).valueOf(), transactionData.pop().action_date.valueOf()];
    // 9 no current end and start and potential end
    if (badEnd && (!badStart && !badCurrent)) return [beforeDate(transactionData.shift().action_date, startDate).valueOf(), afterDate(transactionData.pop().action_date, currentEndDate).valueOf()];
    return [beforeDate(transactionData.shift().action_date, startDate).valueOf(), afterDate(transactionData.pop().action_date, potentialEndDate).valueOf()];
};
