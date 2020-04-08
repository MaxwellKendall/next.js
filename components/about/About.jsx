/**
 * About.jsx
 * Created by Mike Bray 11/20/2017
 **/

import React from 'react';

import { aboutPageMetaTags } from 'Helpers/metaTagHelper';
import Footer from 'Containers/Footer';

import MetaTags from '../sharedComponents/metaTags/MetaTags';
import Header from '../sharedComponents/header/Header';
import StickyHeader from '../sharedComponents/stickyHeader/StickyHeader';

import AboutContent from './AboutContent';

require('Pages/about/aboutPage.scss');

export default class About extends React.Component {
    render() {
        return (
            <div className="usa-da-about-page">
                <MetaTags {...aboutPageMetaTags} />
                <Header />
                <StickyHeader>
                    <div className="sticky-header__title">
                        <h1 tabIndex={-1} id="main-focus">
                            About
                        </h1>
                    </div>
                </StickyHeader>
                <main
                    id="main-content"
                    className="main-content">
                    <AboutContent />
                </main>
                <Footer />
            </div>
        );
    }
}
