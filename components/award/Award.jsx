/**
 * Award.jsx
 * Created by David Trinh 10/5/2018
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { find } from 'lodash';

import * as MetaTagHelper from 'helpers/metaTagHelper';
import StickyHeader from 'components/sharedComponents/stickyHeader/StickyHeader';
import { scrollToY } from 'helpers/scrollToHelper';
import Footer from 'containers/Footer';

import SummaryBar from './SummaryBar';
import ContractContent from './contract/ContractContent';
import IdvContent from './idv/IdvContent';
import FinancialAssistanceContent from './financialAssistance/FinancialAssistanceContent';
import MetaTags from '../sharedComponents/metaTags/MetaTags';
import { LoadingWrapper } from '../sharedComponents/Loading';
import Header from '../sharedComponents/header/Header';
import Error from '../sharedComponents/Error';

const propTypes = {
    awardId: PropTypes.string,
    award: PropTypes.object,
    noAward: PropTypes.bool,
    downloadData: PropTypes.func,
    downloadModalProps: PropTypes.shape({
        mounted: PropTypes.bool,
        hideModal: PropTypes.func
    }),
    isDownloadPending: PropTypes.bool,
    isSubAwardIdClicked: PropTypes.bool,
    subAwardIdClicked: PropTypes.func,
    isLoading: PropTypes.bool
};

const awardSections = [
    {
        section: 'overview',
        label: 'Overview'
    },
    {
        section: 'additional-information',
        label: 'Additional Information'
    },
    {
        section: 'referenced-awards',
        label: 'Referenced Awards'
    },
    {
        section: 'award-history',
        label: 'Award History'
    },
    {
        section: 'cfda',
        label: 'CFDA Program / Assistance Listing Information'
    }
];

export default class Award extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sectionPositions: [],
            window: {
                height: 0
            }
        };

        this.jumpToSection = this.jumpToSection.bind(this);
        this.renderContent = this.renderContent.bind(this);
    }

    jumpToSection(section = '') {
        // we've been provided a section to jump to
        // check if it's a valid section
        const matchedSection = find(awardSections, {
            section
        });

        if (!matchedSection) {
            // no matching section
            return;
        }

        // scroll to the correct section
        const sectionDom = document.querySelector(`#award-${section}`);

        if (!sectionDom) {
            return;
        }

        const sectionTop = sectionDom.offsetTop - 145;
        scrollToY(sectionTop, 700);
        console.log("BLEH")
    }

    renderContent(overview, awardId) {
        debugger;
        if (!overview) return null;
        if (overview.category === 'contract') {
            return (
                <ContractContent
                    awardId={awardId}
                    overview={overview}
                    counts={{ subawardCount: overview.subawardCount }}
                    jumpToSection={this.jumpToSection}
                    isSubAwardIdClicked={this.props.isSubAwardIdClicked}
                    subAwardIdClicked={this.props.subAwardIdClicked} />
            );
        }
        else if (overview.category === 'idv') {
            return (
                <IdvContent
                    awardId={awardId}
                    overview={overview}
                    counts={this.props.award.counts}
                    jumpToSection={this.jumpToSection} />
            );
        }
        else if (this.props.noAward) {
            return (
                <div className="wrapper">
                    <Error
                        title="Invalid Award ID"
                        message="The award ID provided is invalid.
                        Please check the ID and try again." />
                </div>
            );
        }
        return (
            <FinancialAssistanceContent
                awardId={awardId}
                overview={overview}
                jumpToSection={this.jumpToSection}
                isSubAwardIdClicked={this.props.isSubAwardIdClicked}
                subAwardIdClicked={this.props.subAwardIdClicked} />
        );
    }

    render() {
        const { overview } = this.props.award;
        const { awardId, isLoading } = this.props;
        const content = this.renderContent(overview, awardId);
        return (
            <div className="usa-da-award-v2-page">
                HI
                <MetaTags {...MetaTagHelper.awardPageMetaTags} />
                <Header />
                <StickyHeader>
                    <SummaryBar
                        downloadData={this.props.downloadData}
                        isDownloadPending={this.props.isDownloadPending}
                        isInvalidId={this.props.noAward}
                        isLoading={isLoading}
                        category={overview ? overview.category : ''} />
                </StickyHeader>
                <LoadingWrapper isLoading={isLoading}>
                    <main className={!this.props.noAward ? 'award-content' : ''}>
                        {content}
                    </main>
                </LoadingWrapper>
                <Footer />
            </div>
        );
    }
}

Award.propTypes = propTypes;