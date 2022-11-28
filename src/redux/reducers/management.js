import {
    ADD_KARDEX_FAIL,
    ADD_KARDEX_SUCCESS,
    ADD_MOTION_FAIL,
    ADD_MOTION_SUCCESS,
    ADD_PAYMENTS_FAIL,
    ADD_PAYMENTS_SUCCESS,
    DELETE_MOTION_FAIL,
    DELETE_MOTION_SUCCESS,
    DELETE_PAYMENTS_FAIL,
    DELETE_PAYMENTS_SUCCESS,
    GET_DATA_LOCATION_FAIL,
    GET_DATA_LOCATION_SUCCESS,
    GET_KARDEX_FAIL,
    GET_KARDEX_SUCCESS,
    GET_LOCATIONS_FAIL,
    GET_LOCATIONS_SUCCESS,
    GET_MOTIONS_FAIL,
    GET_MOTIONS_SUCCESS,
    GET_PAYMENTS_FAIL,
    GET_PAYMENTS_SUCCESS,
    UPDATE_PAYMENTS_FAIL,
    UPDATE_PAYMENTS_SUCCESS,
} from '../actions/types';

const initialState = {
    events: null,
    motions: null,
    location: null,
    data: null,
    count_motions: null,
    count_payments: null,
}

export default function Management(state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case GET_KARDEX_SUCCESS:
            return {
                ...state, events: payload.result
            }
        case GET_KARDEX_FAIL:
            return {
                ...state, events: null
            }
        case ADD_KARDEX_SUCCESS:
        case ADD_KARDEX_FAIL :
            return {
                ...state
            }
        case GET_MOTIONS_SUCCESS:
            return {
                ...state, motions: payload.results, count_motions: payload.count
            }
        case GET_MOTIONS_FAIL:
            return {
                ...state, motions: null, count_motions: null
            }
        case GET_PAYMENTS_SUCCESS:
            return {
                ...state, payments: payload.results, count_payments: payload.count
            }
        case GET_PAYMENTS_FAIL:
            return {
                ...state, payments: null, count_payments: null
            }
        case GET_LOCATIONS_SUCCESS:
            return {
                ...state, location: payload.result
            }
        case GET_LOCATIONS_FAIL:
            return {
                ...state, location: null
            }
        case GET_DATA_LOCATION_SUCCESS:
            return {
                ...state, data: payload.result
            }
        case GET_DATA_LOCATION_FAIL:
            return {
                ...state, data: null,
            }
        case ADD_PAYMENTS_SUCCESS:
        case ADD_PAYMENTS_FAIL:
        case UPDATE_PAYMENTS_SUCCESS:
        case UPDATE_PAYMENTS_FAIL:
        case DELETE_PAYMENTS_SUCCESS:
        case DELETE_PAYMENTS_FAIL:
        case DELETE_MOTION_SUCCESS:
        case DELETE_MOTION_FAIL:
        case ADD_MOTION_SUCCESS:
        case ADD_MOTION_FAIL:
            return {
                ...state,
            }
        default:
            return state
    }
}