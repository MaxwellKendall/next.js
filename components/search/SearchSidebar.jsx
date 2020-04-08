/**
 * SearchSidebar.jsx
 * Created by Emily Gullo 10/14/2016
 **/

import React from 'react';
import PropTypes from 'prop-types';

import SearchSidebarSubmitContainer from 'Containers/search/SearchSidebarSubmitContainer';

import KeywordContainer from 'Containers/search/filters/KeywordContainer';
import AwardTypeContainer from 'Containers/search/filters/AwardTypeContainer';
import TimePeriodContainer from 'Containers/search/filters/TimePeriodContainer';
import AgencyContainer from 'Containers/search/filters/AgencyContainer';
import LocationSectionContainer from 'Containers/search/filters/location/LocationSectionContainer';
import RecipientSearchContainer from 'Containers/search/filters/recipient/RecipientSearchContainer';
import ProgramSourceContainer from 'Containers/search/filters/programSource/ProgramSourceContainer';
import TASCheckboxTree from 'Containers/search/filters/programSource/TASCheckboxTreeContainer';
import RecipientTypeContainer from 'Containers/search/filters/recipient/RecipientTypeContainer';
import AwardIDSearchContainer from 'Containers/search/filters/awardID/AwardIDSearchContainer';
import AwardAmountSearchContainer from
    'Containers/search/filters/awardAmount/AwardAmountSearchContainer';
import CFDASearchContainer from 'Containers/search/filters/cfda/CFDASearchContainer';
import NAICSSearchContainer from 'Containers/search/filters/naics/NAICSSearchContainer';
import NAICSContainer from 'Containers/search/filters/naics/NAICSContainer';
import PSCSearchContainer from 'Containers/search/filters/psc/PSCSearchContainer';
import PricingTypeContainer from 'Containers/search/filters/PricingTypeContainer';
import SetAsideContainer from 'Containers/search/filters/SetAsideContainer';
import ExtentCompetedContainer from 'Containers/search/filters/ExtentCompetedContainer';

import KeywordHover from 'Components/search/filters/keyword/KeywordHover';

import { Filter as FilterIcon } from 'Components/sharedComponents/icons/Icons';
import FilterSidebar from 'Components/sharedComponents/filterSidebar/FilterSidebar';
import * as SidebarHelper from 'Helpers/sidebarHelper';

import kGlobalConstants from 'GlobalConstants';

const naicsComponent = kGlobalConstants.DEV ? NAICSContainer : NAICSSearchContainer;
const naicsTitle = kGlobalConstants.DEV ?
    'North American Industry Classification System (NAICS)' :
    'NAICS Code';
const tasComponent = kGlobalConstants.DEV ? TASCheckboxTree : ProgramSourceContainer;
const tasTitle = kGlobalConstants.DEV ? 'Treasury Account Symbol (TAS)' : 'Product/Service Code (PSC)';

const filters = {
    options: [
        'Keyword',
        'Time Period',
        'Award Type',
        'Agency',
        tasTitle,
        'Location',
        'Recipient',
        'Recipient Type',
        'Award Amount',
        'Award ID',
        'CFDA Program',
        naicsTitle,
        'Product/Service Code (PSC)',
        'Type of Contract Pricing',
        'Type of Set Aside',
        'Extent Competed'
    ],
    components: [
        KeywordContainer,
        TimePeriodContainer,
        AwardTypeContainer,
        AgencyContainer,
        tasComponent,
        LocationSectionContainer,
        RecipientSearchContainer,
        RecipientTypeContainer,
        AwardAmountSearchContainer,
        AwardIDSearchContainer,
        CFDASearchContainer,
        naicsComponent,
        PSCSearchContainer,
        PricingTypeContainer,
        SetAsideContainer,
        ExtentCompetedContainer
    ],
    accessories: [
        KeywordHover,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null
    ],
    glossaryEntries: [
        null,
        null,
        null,
        null,
        'treasury-account-symbol-tas',
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null
    ]
};

const propTypes = {
    mobile: PropTypes.bool,
    filters: PropTypes.object,
    requestsComplete: PropTypes.bool,
    hash: PropTypes.string
};

const defaultProps = {
    mobile: false
};

export default class SearchSidebar extends React.Component {
    render() {
        const expanded = [];
        filters.options.forEach((filter) => {
            // Collapse all by default, unless the filter has a selection made
            if (filter === 'Time Period') {
                // time period is always expanded
                expanded.push(true);
            }
            else {
                expanded.push(SidebarHelper.filterHasSelections(this.props.filters, filter));
            }
        });

        return (
            <div
                className="search-sidebar"
                role="search"
                aria-label="Filters">
                <div className="sidebar-header">
                    <span className="filter-icon">
                        <FilterIcon />
                    </span>
                    <h2 className="sidebar-title">Filters</h2>
                </div>
                <div className="sidebar-top-submit">
                    <SearchSidebarSubmitContainer />
                </div>
                <FilterSidebar
                    {...filters}
                    expanded={expanded}
                    hash={this.props.hash} />
                <div className="sidebar-bottom-submit">
                    <SearchSidebarSubmitContainer />
                </div>
            </div>
        );
    }
}

SearchSidebar.propTypes = propTypes;
SearchSidebar.defaultProps = defaultProps;
