/**
 * RecipientPage.jsx
 * Created by Lizzie Salita 8/23/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import { recipientPageMetaTags } from 'Helpers/metaTagHelper';

import Footer from 'Containers/Footer';
import MetaTags from 'Components/sharedComponents/metaTags/MetaTags';
import Header from 'Components/sharedComponents/header/Header';
import StickyHeader from 'Components/sharedComponents/stickyHeader/StickyHeader';
import Error from 'Components/sharedComponents/Error';
import { LoadingWrapper } from "Components/sharedComponents/Loading";

import RecipientModalContainer from 'Containers/recipient/modal/RecipientModalContainer';
import RecipientContent from './RecipientContent';


const propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.bool,
    id: PropTypes.string,
    recipient: PropTypes.object,
    pickedFy: PropTypes.func
};

export default class RecipientPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false
        };

        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    showModal() {
        this.setState({
            showModal: true
        });
    }

    hideModal() {
        this.setState({
            showModal: false
        });
    }

    render() {
        let content = (
            <RecipientContent
                showModal={this.showModal}
                {...this.props} />
        );
        if (this.props.error) {
            content = (<Error
                title="Invalid Recipient"
                message="The recipient ID provided is invalid. Please check the ID and try again." />);
        }

        return (
            <div className="usa-da-recipient-page">
                <MetaTags {...recipientPageMetaTags} />
                <Header />
                <StickyHeader>
                    <div className="sticky-header__title">
                        <h1 tabIndex={-1} id="main-focus">
                            Recipient Profile
                        </h1>
                    </div>
                </StickyHeader>
                <main
                    id="main-content"
                    className="main-content">
                    <LoadingWrapper isLoading={this.props.loading}>
                        {content}
                        <RecipientModalContainer
                            mounted={this.state.showModal}
                            hideModal={this.hideModal}
                            recipient={this.props.recipient} />
                    </LoadingWrapper>
                </main>
                <Footer />
            </div>
        );
    }
}

RecipientPage.propTypes = propTypes;
