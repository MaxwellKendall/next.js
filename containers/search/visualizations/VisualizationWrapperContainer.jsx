/**
 * VisualizationWrapperContainer.jsx
 * Created by Kevin Li 4/30/18
 */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as searchViewActions from 'Redux/actions/search/searchViewActions';

import VisualizationWrapper from 'Components/search/visualizations/VisualizationWrapper';

export default connect(
    (state) => (
        state.searchView
    ),
    (dispatch) => bindActionCreators(searchViewActions, dispatch)
)(VisualizationWrapper);
