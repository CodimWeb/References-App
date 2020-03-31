import { OPEN_PROFILE, CLOSE_PROFILE } from '../actions/actionTypes'

const initialState = {
    isOpenProfile: false
};

export default function toggleProfile(state = initialState, action) {
    switch(action.type) {
        case OPEN_PROFILE :
            return {
                isOpenProfile: true
            }
        case CLOSE_PROFILE :
            return {
                isOpenProfile: false
            }  
        default:
            return state    
    }
}