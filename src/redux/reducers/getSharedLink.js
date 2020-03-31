import { REQUEST_SHARED_LINK } from '../actions/actionTypes';

const initialState = {
    sharedLink: ''
}

export default function getSharedLink(state = initialState, action) {
    switch(action.type) {
        case REQUEST_SHARED_LINK :
            return {
                sharedLink: action.payload
            }
        default:
            return state    
    }
}