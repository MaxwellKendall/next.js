/**
 * StatePage.jsx
 * Created by Lizzie Salita 5/2/18
 */

import React from 'react';
import PropTypes from 'prop-types';

import { capitalize } from 'lodash';
import { statePageMetaTags } from 'Helpers/metaTagHelper';

import Footer from 'Containers/Footer';
import MetaTags from 'Components/sharedComponents/metaTags/MetaTags';
import Header from 'Components/sharedComponents/header/Header';
import StickyHeader from 'Components/sharedComponents/stickyHeader/StickyHeader';
import Error from 'Components/sharedComponents/Error';
import { LoadingWrapper } from "Components/sharedComponents/Loading";

import StateContent from './StateContent';

const propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.bool,
    id: PropTypes.string,
    stateProfile: PropTypes.object,
    pickedFy: PropTypes.func
};

export default class StatePage extends React.Component {
    render() {
        let content = <StateContent {...this.props} />;
        if (this.props.error) {
            content = (
                <Error
                    title="Invalid State"
                    message="The state ID provided is invalid. Please check the ID and try again." />
            );
        }

        return (
            <div className="usa-da-state-page">
                <MetaTags {...statePageMetaTags} />
                <Header />
                <StickyHeader>
                    <div className="sticky-header__title">
                        <h1 tabIndex={-1} id="main-focus">
                            {capitalize(this.props.stateProfile.overview.type)} Profile
                        </h1>
                    </div>
                </StickyHeader>
                <main
                    id="main-content"
                    className="main-content">
                    <LoadingWrapper isLoading={this.props.loading}>
                        {content}
                    </LoadingWrapper>
                </main>
                <Footer />
            </div>
        );
    }
}

StatePage.propTypes = propTypes;
