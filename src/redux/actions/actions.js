import {OPEN_PROFILE, 
        CLOSE_PROFILE,
        OPEN_MODAL_RECORD, 
        CLOSE_MODAL_RECORD,
        ACTIVE_SLIDE,
        REQUEST_SHARED_LINK,
        SEARCH_QUERY, 
    } from './actionTypes.js';

export const openProfile = () => {
    return {
        type: OPEN_PROFILE
    }
}

export const closeProfile = () => {
    return {
        type: CLOSE_PROFILE
    }
}

export const openModalRecord = () => {
    return {
        type: OPEN_MODAL_RECORD
    }
}

export const closeModalRecord = () => {
    return {
        type: CLOSE_MODAL_RECORD
    }
}

export const showActiveSlide = (payload) => {
    return {
        type: ACTIVE_SLIDE,
        payload: payload
    }
}

export const getSharedLink = (payload) => {
    return {
        type: REQUEST_SHARED_LINK,
        payload: payload
    }
}