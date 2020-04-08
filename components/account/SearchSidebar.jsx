/**
 * SearchSidebar.jsx
 * Created by Kevin Li 3/20/17
 */

import React from 'react';

import { Filter as FilterIcon } from 'Components/sharedComponents/icons/Icons';
import FilterSidebar from 'Components/sharedComponents/filterSidebar/FilterSidebar';

import AccountTimePeriodContainer from 'Containers/account/filters/AccountTimePeriodContainer';
import AccountObjectClassContainer from 'Containers/account/filters/AccountObjectClassContainer';
import AccountProgramActivityContainer
    from 'Containers/account/filters/AccountProgramActivityContainer';

const filters = {
    options: [
        'Time Period',
        'Object Class',
        'Program Activity',
        'Treasury Account Symbol (TAS)'
    ],
    components: [
        AccountTimePeriodContainer,
        AccountObjectClassContainer,
        AccountProgramActivityContainer,
        null
    ]
};

export default class SearchSidebar extends React.Component {
    render() {
        return (
            <div className="search-sidebar">
                <div className="sidebar-header">
                    <span className="filter-icon">
                        <FilterIcon />
                    </span>
                    <h6>Filter by:</h6>
                </div>
                <FilterSidebar {...filters} />
            </div>
        );
    }
}
