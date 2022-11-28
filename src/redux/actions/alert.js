import {REMOVE_ALERT, SET_ALERT,} from './types';


export const setAlert = (text,type, timeout = 500) => dispatch => {
    dispatch({type: REMOVE_ALERT})
    dispatch({
        type: SET_ALERT,
        payload: {text,type}
    });

    setTimeout(() => dispatch({type: REMOVE_ALERT}), timeout);
}