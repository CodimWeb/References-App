import { ACTIVE_SLIDE } from '../actions/actionTypes'

const initialState = {
    title: 'Profile',
    position: 0,
};

export default function showActiveSlide(state = initialState, action) {
    switch(action.type) {
        case ACTIVE_SLIDE :
            return {
                title: action.payload.title,
                position: action.payload.position
            }   
        default:
            return state    
    }
}