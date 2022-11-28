import {
    ADD_DATA_PROGRAM_FAIL,
    ADD_DATA_PROGRAM_SUCCESS,
    DELETE_DATA_PROGRAM_FAIL,
    DELETE_DATA_PROGRAM_SUCCESS,
    GET_DATA_PACKING_LIST_FAIL,
    GET_DATA_PACKING_LIST_SUCCESS,
    GET_DATA_PROGRAM_FAIL,
    GET_DATA_PROGRAM_SUCCESS,
    GET_LOTS_BY_SLUG_FAIL,
    GET_LOTS_BY_SLUG_SUCCESS,
    GET_PACKING_LIST_BY_SLUG_FAIL,
    GET_PACKING_LIST_BY_SLUG_SUCCESS,
    GET_PACKING_LIST_FAIL,
    GET_PACKING_LIST_SUCCESS,
    GET_PROGRAM_FAIL,
    GET_PROGRAM_SUCCESS,
    GET_PROGRAMS_FAIL,
    GET_PROGRAMS_SUCCESS,
    UPDATE_PACKING_LIST_FAIL,
    UPDATE_PACKING_LIST_SUCCESS,
} from '../actions/types';

const initialState = {
    programs: null,
    packing_list: null,
    data_program: null,
    program: null,
    pack: null,
    lots: null,
    data_packing_list: null,
    count_programs: null,
    count_packing_list: null,
}
export default function Logistic(state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case GET_PROGRAMS_SUCCESS:
            return {
                ...state, programs: payload.results, count_programs: payload.count
            }
        case GET_PROGRAMS_FAIL:
            return {
                ...state, programs: null
            }
        case GET_PACKING_LIST_SUCCESS:
            return {
                ...state, packing_list: payload.results, count_packing_list: payload.count
            }
        case GET_PACKING_LIST_FAIL:
            return {
                ...state, packing_list: null
            }
        case GET_DATA_PROGRAM_SUCCESS:
            return {
                ...state, data_program: payload.result
            }
        case GET_DATA_PROGRAM_FAIL:
            return {
                ...state, data_program: null
            }
        case GET_PROGRAM_SUCCESS:
            return {
                ...state, program: payload.result
            }
        case GET_PROGRAM_FAIL:
            return {
                ...state, program: null
            }
        case GET_PACKING_LIST_BY_SLUG_SUCCESS:
            return {
                ...state, pack: payload.result
            }
        case GET_PACKING_LIST_BY_SLUG_FAIL:
            return {
                ...state, pack: null
            }
        case GET_LOTS_BY_SLUG_SUCCESS:
            return {
                ...state, lots: payload.result
            }
        case GET_LOTS_BY_SLUG_FAIL:
            return {
                ...state, lots: null
            }
        case GET_DATA_PACKING_LIST_SUCCESS:
            return {
                ...state, data_packing_list: payload.result
            }
        case GET_DATA_PACKING_LIST_FAIL:
            return {
                ...state, data_packing_list: null
            }
        case UPDATE_PACKING_LIST_SUCCESS:
        case UPDATE_PACKING_LIST_FAIL:
        case DELETE_DATA_PROGRAM_SUCCESS:
        case DELETE_DATA_PROGRAM_FAIL:
        case ADD_DATA_PROGRAM_SUCCESS:
        case ADD_DATA_PROGRAM_FAIL:
            return {
                ...state
            }
        default:
            return state;
    }

}