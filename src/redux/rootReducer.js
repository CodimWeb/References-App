import { combineReducers } from 'redux';

import toggleProfile from './reducers/profile';
import toggleModalRecord from './reducers/modalRecord';
import showActiveSlide from './reducers/showActiveSlide';
import getSharedLink from './reducers/getSharedLink';

const rootReducer = combineReducers({
    toggleProfile,
    toggleModalRecord,
    showActiveSlide,
    getSharedLink,
});

export default rootReducer;
