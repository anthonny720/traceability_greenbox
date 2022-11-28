import {REMOVE_ALERT, SET_ALERT,} from '../actions/types';

const initialState = {
    text: null,
    type:null
};

export default function Alert(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case SET_ALERT:
            return {
                ...state,
                text: payload.text,
                type: payload.type
            };
        case REMOVE_ALERT:
            return {
                ...state,
                text: null,
                type: null

            }
        default:
            return state
    }

}