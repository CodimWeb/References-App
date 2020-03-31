import { OPEN_MODAL_RECORD, CLOSE_MODAL_RECORD } from '../actions/actionTypes'

const initialState = {
    isOpenModalRecord: false
};

export default function toggleModalRecord(state = initialState, action) {
    switch(action.type) {
        case OPEN_MODAL_RECORD :
            return {
                isOpenModalRecord: true
            }     
        case CLOSE_MODAL_RECORD :
            return {
                isOpenModalRecord: false
            }     
        default:
            return state    
    }
}