/**
 * ExplorerLanding.jsx
 * Created by Kevin Li 8/16/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import { explorerPageMetaTags } from 'Helpers/metaTagHelper';

import Footer from 'Containers/Footer';
import MetaTags from 'Components/sharedComponents/metaTags/MetaTags';
import Header from 'Components/sharedComponents/header/Header';
import StickyHeader from 'Components/sharedComponents/stickyHeader/StickyHeader';

const propTypes = {
    children: PropTypes.element
};

require('Pages/explorer/explorerPage.scss');

const ExplorerWrapperPage = (props) => (
    <div className="usa-da-explorer-page">
        <MetaTags {...explorerPageMetaTags} />
        <Header />
        <StickyHeader>
            <div className="sticky-header__title">
                <h1 tabIndex={-1} id="main-focus">
                    Spending Explorer
                </h1>
            </div>
        </StickyHeader>
        <main
            id="main-content"
            className="main-content">
            {props.children}
        </main>
        <Footer />
    </div>
);

ExplorerWrapperPage.propTypes = propTypes;

export default ExplorerWrapperPage;
