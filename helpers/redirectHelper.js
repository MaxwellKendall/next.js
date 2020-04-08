/**
 * redirectHelper.js
 * Created by Lizzie Salita 2/23/18
 **/

import storeSingleton from 'Redux/storeSingleton';
import * as redirectModalActions from 'Redux/actions/redirectModal/redirectModalActions';

// eslint-disable-next-line import/prefer-default-export
export const showRedirectModal = (url) => {
    storeSingleton.store.dispatch(redirectModalActions.showModal(url));
};
