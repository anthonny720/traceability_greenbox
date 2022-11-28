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
    UPDATE_I_LOT_SUCCESS
} from "./types";
import axios from "axios";
import {setAlert} from "./alert";

export const get_lots = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        },
        params: {
            ...params
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/raw-material/lot/`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_LOTS_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_LOTS_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_LOTS_FAIL
        });
    }
}

export const get_lots_page = (params, p) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        },
        params: {
            ...params,
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/raw-material/lot/?p=${p}`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_LOTS_SUCCESS, payload: res.data
            });
        } else {
            dispatch({type: GET_LOTS_FAIL});
        }
    } catch {
        dispatch({type: GET_LOTS_FAIL})
    }
}

export const add_lot = (form) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/raw-material/lot/`, form, config);
        if (res.status === 201) {
            dispatch({
                type: ADD_LOT_SUCCESS,
            });
            dispatch(get_lots())
            dispatch(setAlert(res.data.message, 'success'));
        } else {
            dispatch({
                type: ADD_LOT_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: ADD_LOT_FAIL
        });
        dispatch(setAlert(err.response.data['error'], 'error'));
    }
}
export const get_lot = (lot) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/raw-material/lot/${lot}`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_LOT_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_LOT_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_LOT_FAIL
        });
    }
}

export const delete_lot = (lot) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/raw-material/lot/${lot}`, config);
        if (res.status === 200) {
            dispatch({
                type: DELETE_LOT_SUCCESS,
            });
            dispatch(setAlert(res.data.message, 'success'));
        } else {
            dispatch({
                type: DELETE_LOT_FAIL
            });

        }
    } catch (err) {
        dispatch({
            type: DELETE_LOT_FAIL
        });
        dispatch(setAlert(err.response.data['error'], 'error'));

    }
}

export const get_data_lot = (lot) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/raw-material/lot/data/${lot}`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_I_LOT_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_I_LOT_FAIL
            });

        }
    } catch (err) {
        dispatch({
            type: GET_I_LOT_FAIL
        });
    }
}


export const add_info = (form, lot) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/raw-material/lot/data`, form, config);
        if (res.status === 201) {
            dispatch({
                type: ADD_I_LOT_SUCCESS,
            });
            dispatch(setAlert(res.data.message, 'success'));
            dispatch(get_lot(lot))
            dispatch(get_data_lot(lot))

        } else {
            dispatch({
                type: ADD_I_LOT_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: ADD_I_LOT_FAIL
        });
        dispatch(setAlert(err.response.data['error'], 'error'));

    }
}
export const update_info = (form, lot, id) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.patch(`${process.env.REACT_APP_API_URL}/api/raw-material/lot/data/detail/${id}`, form, config);
        if (res.status === 200) {
            dispatch({
                type: UPDATE_I_LOT_SUCCESS,
            });
            dispatch(setAlert(res.data.message, 'success'));
            dispatch(get_lot(lot))
            dispatch(get_data_lot(lot))

        } else {
            dispatch({
                type: UPDATE_I_LOT_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: UPDATE_I_LOT_FAIL
        });
        dispatch(setAlert(err.response.data['error'], 'error'));

    }
}
export const delete_info = (lot, id) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/raw-material/lot/data/detail/${id}`, config);
        if (res.status === 200) {
            dispatch({
                type: DELETE_I_LOT_SUCCESS,
            });
            dispatch(setAlert(res.data.message, 'success'));
            dispatch(get_lot(lot))
            dispatch(get_data_lot(lot))
        } else {
            dispatch({
                type: DELETE_I_LOT_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: DELETE_I_LOT_FAIL
        });
        dispatch(setAlert(err.response.data['error'], 'error'));

    }
}

export const get_lots_production = () => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/raw-material/lot-list`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_LOTS_PRODUCTION_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_LOTS_PRODUCTION_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_LOTS_PRODUCTION_FAIL
        });
    }
}
