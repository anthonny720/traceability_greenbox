import {
    ADD_PROCESS_CONDITIONING_FAIL,
    ADD_PROCESS_CONDITIONING_SUCCESS,
    ADD_PROCESS_RELEASED_FAIL,
    ADD_PROCESS_RELEASED_SUCCESS,
    ADD_PROCESS_TERMINATED_FAIL,
    ADD_PROCESS_TERMINATED_SUCCESS,
    DELETE_PROCESS_CONDITIONING_FAIL,
    DELETE_PROCESS_CONDITIONING_SUCCESS,
    DELETE_PROCESS_RELEASED_FAIL,
    DELETE_PROCESS_RELEASED_SUCCESS,
    DELETE_PROCESS_TERMINATED_FAIL,
    DELETE_PROCESS_TERMINATED_SUCCESS,
    GET_CUTS_FAIL,
    GET_CUTS_SUCCESS,
    GET_PROCESS_CONDITIONING_FAIL,
    GET_PROCESS_CONDITIONING_SUCCESS,
    GET_PROCESS_GENERAL_CONDITIONING_FAIL,
    GET_PROCESS_GENERAL_CONDITIONING_SUCCESS,
    GET_PROCESS_GENERAL_RELEASED_FAIL,
    GET_PROCESS_GENERAL_RELEASED_SUCCESS,
    GET_PROCESS_GENERAL_TERMINATED_FAIL,
    GET_PROCESS_GENERAL_TERMINATED_SUCCESS,
    GET_PROCESS_RELEASED_FAIL,
    GET_PROCESS_RELEASED_SUCCESS,
    GET_PROCESS_TERMINATED_FAIL,
    GET_PROCESS_TERMINATED_SUCCESS,
    GET_RECEPTION_RELEASED_FAIL,
    GET_RECEPTION_RELEASED_SUCCESS,
    UPDATE_PROCESS_CONDITIONING_FAIL,
    UPDATE_PROCESS_CONDITIONING_SUCCESS,
    UPDATE_PROCESS_RELEASED_FAIL,
    UPDATE_PROCESS_RELEASED_SUCCESS,
    UPDATE_PROCESS_TERMINATED_FAIL,
    UPDATE_PROCESS_TERMINATED_SUCCESS
} from '../actions/types';

const initialState = {
    conditioning: null,
    terminated: null,
    released: null,
    general_conditioning: null,
    general_terminated: null,
    general_released: null,
    cuts: null,
    reception: null,
    count_conditioning: null,
    count_terminated: null,
    count_released: null,
};

export default function Process(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case GET_PROCESS_CONDITIONING_SUCCESS:
            return {
                ...state, conditioning: payload.result
            }
        case GET_PROCESS_CONDITIONING_FAIL:
            return {
                ...state, conditioning: null
            }
        case GET_CUTS_SUCCESS:
            return {
                ...state, cuts: payload.result
            }
        case GET_CUTS_FAIL:
            return {
                ...state, cuts: null
            }
        case GET_PROCESS_TERMINATED_SUCCESS:
            return {
                ...state, terminated: payload.result
            }
        case GET_PROCESS_TERMINATED_FAIL:
            return {
                ...state, terminated: null
            }
        case GET_PROCESS_RELEASED_SUCCESS:
            return {
                ...state, released: payload.result
            }
        case GET_PROCESS_RELEASED_FAIL:
            return {
                ...state, released: null
            }
        case GET_PROCESS_GENERAL_CONDITIONING_SUCCESS:
            return {
                ...state, general_conditioning: payload.results, count_conditioning: payload.count
            }
        case GET_PROCESS_GENERAL_CONDITIONING_FAIL:
            return {
                ...state, general_conditioning: null, count_conditioning: null
            }
        case GET_PROCESS_GENERAL_TERMINATED_SUCCESS:
            return {
                ...state, general_terminated: payload.results, count_terminated: payload.count
            }
        case GET_PROCESS_GENERAL_TERMINATED_FAIL:
            return {
                ...state, general_terminated: null, count_terminated: null
            }
        case GET_PROCESS_GENERAL_RELEASED_SUCCESS:
            return {
                ...state, general_released: payload.results, count_released: payload.count
            }
        case GET_PROCESS_GENERAL_RELEASED_FAIL:
            return {
                ...state, general_released: null, count_released: null
            }
        case  GET_RECEPTION_RELEASED_SUCCESS:
            return {
                ...state, reception: payload.result
            }
        case GET_RECEPTION_RELEASED_FAIL:
            return {
                ...state, reception: null
            }
        case ADD_PROCESS_CONDITIONING_FAIL:
        case ADD_PROCESS_CONDITIONING_SUCCESS:
        case ADD_PROCESS_RELEASED_FAIL:
        case ADD_PROCESS_RELEASED_SUCCESS:
        case ADD_PROCESS_TERMINATED_FAIL:
        case ADD_PROCESS_TERMINATED_SUCCESS:
        case DELETE_PROCESS_CONDITIONING_FAIL:
        case DELETE_PROCESS_CONDITIONING_SUCCESS:
        case DELETE_PROCESS_RELEASED_FAIL:
        case DELETE_PROCESS_RELEASED_SUCCESS:
        case DELETE_PROCESS_TERMINATED_FAIL:
        case DELETE_PROCESS_TERMINATED_SUCCESS:
        case UPDATE_PROCESS_CONDITIONING_FAIL:
        case UPDATE_PROCESS_CONDITIONING_SUCCESS:
        case UPDATE_PROCESS_RELEASED_FAIL:
        case UPDATE_PROCESS_RELEASED_SUCCESS:
        case UPDATE_PROCESS_TERMINATED_FAIL:
        case UPDATE_PROCESS_TERMINATED_SUCCESS:
            return {
                ...state
            }

        default:
            return state
    }
}