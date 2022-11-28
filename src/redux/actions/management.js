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
} from './types';
import axios from 'axios'
import {setAlert} from "./alert";
import {get_providers} from "./business_partners";


export const get_kardex = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }, params: {
            ...params
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/management/get-kardex`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_KARDEX_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_KARDEX_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_KARDEX_FAIL
        });

    }
}
export const add_kardex = (form, id) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        },
    };
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/management/create-kardex`, form, config);
        if (res.status === 201) {
            dispatch({
                type: ADD_KARDEX_SUCCESS, payload: res.data
            });
            dispatch(get_kardex(id))
            dispatch(setAlert(res.data.message, 'success'));
        } else {
            dispatch({
                type: ADD_KARDEX_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: ADD_KARDEX_FAIL
        });
        dispatch(setAlert(err.response.data['error'], 'error'));
    }
}
export const get_motions = () => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/management/get-motions`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_MOTIONS_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_MOTIONS_FAIL
            });
            dispatch(setAlert(res.data.error, 'danger'));
        }
    } catch (err) {
        dispatch({
            type: GET_MOTIONS_FAIL
        });

    }
}
export const get_motions_page = (p) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/management/get-motions?p=${p}`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_MOTIONS_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_MOTIONS_FAIL
            });
            dispatch(setAlert(res.data.error, 'danger'));
        }
    } catch (err) {
        dispatch({
            type: GET_MOTIONS_FAIL
        });

    }
}
export const delete_motion = (id) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/management/delete-motion/${id}`, config);
        if (res.status === 200) {
            dispatch({
                type: DELETE_MOTION_SUCCESS, payload: res.data
            });
            dispatch(get_motions());
            dispatch(get_providers())
            dispatch(setAlert(res.data.message, 'success'));
        } else {
            dispatch({
                type: DELETE_MOTION_FAIL, payload: res.data
            });
            dispatch(setAlert(res.data.error, 'error'));
        }
    } catch (err) {
        dispatch({
            type: DELETE_MOTION_FAIL
        });
        dispatch(setAlert(err.response.data['error'], 'error'));
    }
}
export const add_motion = (form) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/management/add-motions`, form, config);
        if (res.status === 201) {
            dispatch({
                type: ADD_MOTION_SUCCESS, payload: res.data
            });
            dispatch(get_motions());
            dispatch(get_providers())
            dispatch(setAlert(res.data.message, 'success'));
        } else {
            dispatch({
                type: ADD_MOTION_FAIL,
            });

        }
    } catch (err) {
        dispatch({
            type: ADD_MOTION_FAIL
        });
        dispatch(setAlert(err.response.data['error'], 'error'));
    }
}

export const get_payments = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        },
        params: {
            ...params
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/management/payments`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_PAYMENTS_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_PAYMENTS_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_PAYMENTS_FAIL
        });
    }
}
export const get_payments_page = (params,p) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        },
        params: {
            ...params
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/management/payments?p=${p}`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_PAYMENTS_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_PAYMENTS_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_PAYMENTS_FAIL
        });
    }
}

export const add_payment = (form) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/management/payments`, form, config);
        if (res.status === 201) {
            dispatch({
                type: ADD_PAYMENTS_SUCCESS,
            });
            dispatch(get_payments());
            dispatch(setAlert(res.data.message, 'success'));

        } else {
            dispatch({
                type: ADD_PAYMENTS_FAIL
            });

        }
    } catch (err) {
        dispatch({
            type: ADD_PAYMENTS_FAIL
        });
        dispatch(setAlert(err.response.data['error'], 'error'));


    }
}

export const update_payment = (form, id) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.patch(`${process.env.REACT_APP_API_URL}/api/management/payments/${id}`, form, config);
        if (res.status === 200) {
            dispatch({
                type: UPDATE_PAYMENTS_SUCCESS,
            });
            dispatch(get_payments());
            dispatch(setAlert(res.data.message, 'success'));

        } else {
            dispatch({
                type: UPDATE_PAYMENTS_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: UPDATE_PAYMENTS_FAIL
        });
        dispatch(setAlert(err.response.data['error'], 'error'));

    }
}

export const delete_payment = (id) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/management/payments/${id}`, config);
        if (res.status === 200) {
            dispatch({
                type: DELETE_PAYMENTS_SUCCESS,
            });
            dispatch(get_payments());
            dispatch(setAlert(res.data.message, 'success'));

        } else {
            dispatch({
                type: DELETE_PAYMENTS_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: DELETE_PAYMENTS_FAIL
        });
        dispatch(setAlert(err.response.data['error'], 'error'));

    }
}


export const get_locations = () => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/management/get-locations`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_LOCATIONS_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_LOCATIONS_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_LOCATIONS_FAIL
        });

    }
}


export const get_data_location = (id) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/management/get-locations/${id}`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_DATA_LOCATION_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_DATA_LOCATION_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_DATA_LOCATION_FAIL
        });

    }
}

