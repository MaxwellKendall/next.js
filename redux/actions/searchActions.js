import * as searchFilterActions from 'Redux/actions/search/searchFilterActions';

// combine the filter and result Redux actions into one object for the React-Redux connector
const combinedActions = Object.assign({}, searchFilterActions);

export default combinedActions;
