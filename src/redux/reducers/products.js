import {
    GET_BAGS_FAIL,
    GET_BAGS_SUCCESS,
    GET_BOXES_FAIL,
    GET_BOXES_SUCCESS,
    GET_FRUITS_FAIL,
    GET_FRUITS_SUCCESS,
    GET_PALLETS_FAIL,
    GET_PALLETS_SUCCESS
} from "../actions/types";

const initialState = {
    categories: null, day: null, pallets: null,
    boxes: null,
    bags: null,
};

export default function Products(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case GET_FRUITS_SUCCESS:
            return {
                ...state, categories: payload.categories, day: payload.day
            }
        case GET_FRUITS_FAIL:
            return {
                ...state, categories: null, day: null
            }
        case GET_PALLETS_SUCCESS:
            return {
                ...state, pallets: payload.pallets
            }
        case GET_PALLETS_FAIL:
            return {
                ...state, pallets: null
            }
        case GET_BOXES_SUCCESS:
            return {
                ...state, boxes: payload.result
            }
        case GET_BOXES_FAIL:
            return {
                ...state, boxes: null
            }
        case GET_BAGS_SUCCESS:
            return {
                ...state, bags: payload.result
            }
        case GET_BAGS_FAIL:
            return {
                ...state, bags: null
            }
        default:
            return state
    }
}