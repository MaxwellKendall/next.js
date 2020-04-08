import App from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faAngleDown,
    faAngleRight,
    faAngleLeft,
    faArrowCircleLeft,
    faBan,
    faBook,
    faBuilding,
    faCalendarAlt,
    faChartArea,
    faChartBar,
    faChartPie,
    faCheckSquare,
    faCheckCircle,
    faChevronDown,
    faChevronUp,
    faChevronRight,
    faEllipsisH,
    faExternalLinkAlt,
    faHandsHelping,
    faInfo,
    faInfoCircle,
    faLandmark,
    faLevelUpAlt,
    faMapMarkerAlt,
    faMinusSquare,
    faPencilAlt,
    faSearch,
    faSitemap,
    faSpinner,
    faSquare,
    faTable,
    faTag,
    faThLarge,
    faTimes,
    faUserTie,
    faShareAlt,
    faEnvelope,
    faLink,
    faExclamationCircle
} from "@fortawesome/free-solid-svg-icons";

library.add(
    faAngleDown,
    faAngleRight,
    faAngleLeft,
    faArrowCircleLeft,
    faBan,
    faBook,
    faBuilding,
    faCalendarAlt,
    faChartArea,
    faChartBar,
    faChartPie,
    faCheckSquare,
    faCheckCircle,
    faChevronDown,
    faChevronUp,
    faChevronRight,
    faEllipsisH,
    faExternalLinkAlt,
    faHandsHelping,
    faInfo,
    faInfoCircle,
    faLandmark,
    faLevelUpAlt,
    faMapMarkerAlt,
    faMinusSquare,
    faPencilAlt,
    faSearch,
    faSitemap,
    faSpinner,
    faSquare,
    faTable,
    faTag,
    faThLarge,
    faTimes,
    faUserTie,
    faShareAlt,
    faEnvelope,
    faLink,
    faExclamationCircle
);

import withReduxStore from '../redux/withRedux';

import '../styles/global.scss';

class MyApp extends App {
  render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <Provider store={reduxStore}>
        <Component {...pageProps} />
      </Provider>
    );
  }
};

export default withReduxStore(MyApp);
