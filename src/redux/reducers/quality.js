import {
    GET_ANALYSIS_AGUAYMANTO_FAIL,
    GET_ANALYSIS_AGUAYMANTO_SUCCESS,
    GET_ANALYSIS_BANANO_FAIL,
    GET_ANALYSIS_BANANO_SUCCESS,
    GET_ANALYSIS_BLUEBERRY_FAIL,
    GET_ANALYSIS_BLUEBERRY_SUCCESS,
    GET_ANALYSIS_MANGO_FAIL,
    GET_ANALYSIS_MANGO_SUCCESS,
    GET_ANALYSIS_PINEAPPLE_FAIL,
    GET_ANALYSIS_PINEAPPLE_SUCCESS,
    GET_CUT_TEST_FAIL,
    GET_CUT_TEST_SUCCESS,
} from "../actions/types";

const initialState = {
    cut_test: null,
    pineapple: null,
    banano: null,
    mango: null,
    aguaymanto: null,
    blueberry: null,
    count_cut_test: null,
    count_pineapple: null,
    count_banano: null,
    count_aguaymanto: null,
    count_blueberry: null,
    count_mango: null,
};

export default function Quality(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case GET_CUT_TEST_SUCCESS:
            return {
                ...state,
                cut_test: payload.results, count_cut_test: payload.count
            }
        case GET_CUT_TEST_FAIL:
            return {
                ...state,
                cut_test: null, count_cut_test: null
            }
        case GET_ANALYSIS_PINEAPPLE_SUCCESS:
            return {
                ...state,
                pineapple: payload.results, count_pineapple: payload.count
            }
        case GET_ANALYSIS_PINEAPPLE_FAIL:
            return {
                ...state,
                pineapple: null, count_pineapple: null
            }
        case GET_ANALYSIS_BANANO_SUCCESS:
            return {
                ...state,
                banano: payload.results, count_banano: payload.count
            }
        case GET_ANALYSIS_BANANO_FAIL:
            return {
                ...state,
                banano: null, count_banano: null
            }
        case GET_ANALYSIS_MANGO_SUCCESS:
            return {
                ...state,
                mango: payload.results, count_mango: payload.count
            }
        case GET_ANALYSIS_MANGO_FAIL:
            return {
                ...state,
                mango: null, count_mango: null
            }
        case GET_ANALYSIS_AGUAYMANTO_SUCCESS:
            return {
                ...state,
                aguaymanto: payload.results, count_aguaymanto: payload.count
            }
        case GET_ANALYSIS_AGUAYMANTO_FAIL:
            return {
                ...state,
                aguaymanto: null, count_aguaymanto: null
            }
        case GET_ANALYSIS_BLUEBERRY_SUCCESS:
            return {
                ...state,
                blueberry: payload.results, count_blueberry: payload.count
            }
        case GET_ANALYSIS_BLUEBERRY_FAIL:
            return {
                ...state,
                blueberry: null, count_blueberry: null
            }
        default:
            return state
    }
}