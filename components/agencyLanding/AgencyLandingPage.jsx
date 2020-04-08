/**
 * AgencyLandingPage.jsx
 * Created by Lizzie Salita 7/7/17
 */

import React from 'react';

import { agencyLandingPageMetaTags } from 'Helpers/metaTagHelper';

import Footer from 'Containers/Footer';
import MetaTags from 'Components/sharedComponents/metaTags/MetaTags';
import Header from 'Components/sharedComponents/header/Header';
import StickyHeader from 'Components/sharedComponents/stickyHeader/StickyHeader';
import AgencyLandingContainer from 'Containers/agencyLanding/AgencyLandingContainer';

require('Pages/agencyLanding/agencyLandingPage.scss');

export default class AgencyLandingPage extends React.Component {
    render() {
        return (
            <div className="usa-da-agency-landing">
                <MetaTags {...agencyLandingPageMetaTags} />
                <Header />
                <StickyHeader>
                    <div className="sticky-header__title">
                        <h1 tabIndex={-1} id="main-focus">
                            Agency Profiles
                        </h1>
                    </div>
                </StickyHeader>
                <main
                    id="main-content"
                    className="main-content">
                    <AgencyLandingContainer />
                </main>
                <Footer />
            </div>
        );
    }
}
