import {
    ADD_I_LOT_FAIL,
    ADD_I_LOT_SUCCESS,
    ADD_LOT_FAIL,
    ADD_LOT_SUCCESS,
    DELETE_I_LOT_FAIL,
    DELETE_I_LOT_SUCCESS,
    DELETE_LOT_FAIL,
    DELETE_LOT_SUCCESS,
    GET_I_LOT_FAIL,
    GET_I_LOT_SUCCESS,
    GET_LOT_FAIL,
    GET_LOT_SUCCESS,
    GET_LOTS_FAIL,
    GET_LOTS_PRODUCTION_FAIL,
    GET_LOTS_PRODUCTION_SUCCESS,
    GET_LOTS_SUCCESS,
    UPDATE_I_LOT_FAIL,
    UPDATE_I_LOT_SUCCESS,
} from '../actions/types';

const initialState = {

    lots: null,
    lot: null,
    data: null,
    lot_prod: null,
    count: null,
    next: null,
    previous: null

};

export default function RawMaterial(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case GET_I_LOT_SUCCESS:
            return {
                ...state, data: payload.result
            }
        case GET_I_LOT_FAIL:
            return {
                ...state, data: null
            }
        case GET_LOTS_SUCCESS:
            return {
                ...state,
                lots: payload.results.result,
                count: payload.count,
                next: payload.next,
                previous: payload.previous
            }
        case GET_LOTS_FAIL:
            return {
                ...state, lots: null, count: null, next: null, previous: null
            }
        case ADD_LOT_SUCCESS:
        case ADD_LOT_FAIL:
            return {
                ...state
            }
        case GET_LOT_SUCCESS:
            return {
                ...state, lot: payload.result
            }
        case GET_LOT_FAIL:
            return {
                ...state, lot: null,
            }
        case GET_LOTS_PRODUCTION_SUCCESS:
            return {
                ...state, lot_prod: payload.result
            }
        case GET_LOTS_PRODUCTION_FAIL:
            return {
                ...state, lot_prod: null,
            }

        case DELETE_LOT_SUCCESS:
        case DELETE_LOT_FAIL:
        case ADD_I_LOT_SUCCESS:
        case ADD_I_LOT_FAIL:
        case UPDATE_I_LOT_SUCCESS:
        case UPDATE_I_LOT_FAIL:
        case DELETE_I_LOT_SUCCESS:
        case DELETE_I_LOT_FAIL:
            return {
                ...state
            }
        default:
            return state;
    }
}