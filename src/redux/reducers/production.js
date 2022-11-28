import {
    DETAIL_PRODUCTION_PINEAPPLE_FAIL,
    DETAIL_PRODUCTION_PINEAPPLE_SUCCESS,
    GET_PRODUCTION_PINEAPPLE_FAIL,
    GET_PRODUCTION_PINEAPPLE_SUCCESS,
    GET_REPORT_PRODUCTION_FAIL,
    GET_REPORT_PRODUCTION_SUCCESS,
} from "../actions/types";

const initialState = {
    pineapple_list: null,
    pineapple_data: null,
    summary: null,
    count: null,
};

export default function Production(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case GET_REPORT_PRODUCTION_SUCCESS:
            return {
                ...state,
                summary: payload.result,
            }
        case GET_REPORT_PRODUCTION_FAIL:
            return {
                ...state,
                summary: null,
            }
        case GET_PRODUCTION_PINEAPPLE_SUCCESS:
            return {
                ...state,
                pineapple_list: payload.results, count: payload.count,
            }
        case GET_PRODUCTION_PINEAPPLE_FAIL:
            return {
                ...state,
                pineapple_list: null, count: null,
            }
        case DETAIL_PRODUCTION_PINEAPPLE_SUCCESS:
            return {
                ...state,
                pineapple_data: payload.result,
            }
        case DETAIL_PRODUCTION_PINEAPPLE_FAIL:
            return {
                ...state,
                pineapple_data: null,
            }

        default:
            return state
    }
}