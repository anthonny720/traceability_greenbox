import axios from "axios";
import {
    ADD_CROWN_PINEAPPLE_FAIL,
    ADD_CROWN_PINEAPPLE_SUCCESS,
    ADD_PEEL_PINEAPPLE_FAIL,
    ADD_PEEL_PINEAPPLE_SUCCESS,
    ADD_PRODUCTION_PINEAPPLE_FAIL,
    ADD_PRODUCTION_PINEAPPLE_SUCCESS,
    DELETE_CROWN_PINEAPPLE_FAIL,
    DELETE_CROWN_PINEAPPLE_SUCCESS,
    DELETE_PEEL_PINEAPPLE_FAIL,
    DELETE_PEEL_PINEAPPLE_SUCCESS,
    DELETE_PRODUCTION_PINEAPPLE_FAIL,
    DELETE_PRODUCTION_PINEAPPLE_SUCCESS,
    DETAIL_PRODUCTION_PINEAPPLE_FAIL,
    DETAIL_PRODUCTION_PINEAPPLE_SUCCESS,
    GET_PRODUCTION_PINEAPPLE_FAIL,
    GET_PRODUCTION_PINEAPPLE_SUCCESS,
    GET_REPORT_PRODUCTION_FAIL,
    GET_REPORT_PRODUCTION_SUCCESS,
    UPDATE_PRODUCTION_PINEAPPLE_FAIL,
    UPDATE_PRODUCTION_PINEAPPLE_SUCCESS
} from "./types";
import {setAlert} from "./alert";

export const get_report_process = (form) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/production/report`,form, config);
        if (res.status === 200) {
            dispatch({
                type: GET_REPORT_PRODUCTION_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_REPORT_PRODUCTION_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_REPORT_PRODUCTION_FAIL
        });
    }
}

export const get_process_pineapple = () => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/production/pineapple`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_PRODUCTION_PINEAPPLE_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_PRODUCTION_PINEAPPLE_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_PRODUCTION_PINEAPPLE_FAIL
        });
    }
}
export const get_process_pineapple_page = (p) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/production/pineapple?p=${p}`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_PRODUCTION_PINEAPPLE_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_PRODUCTION_PINEAPPLE_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_PRODUCTION_PINEAPPLE_FAIL
        });
    }
}

export const get_process_detail_pineapple = (slug) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/production/pineapple/${slug}`, config);
        if (res.status === 200) {
            dispatch({
                type: DETAIL_PRODUCTION_PINEAPPLE_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: DETAIL_PRODUCTION_PINEAPPLE_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: DETAIL_PRODUCTION_PINEAPPLE_FAIL
        });
    }
}
export const add_process_pineapple = (form) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/production/pineapple`, form, config);
        if (res.status === 201) {
            dispatch({
                type: ADD_PRODUCTION_PINEAPPLE_SUCCESS,
            });
            dispatch(get_process_pineapple());
            dispatch(setAlert(res.data.message, 'success'));

        } else {
            dispatch({
                type: ADD_PRODUCTION_PINEAPPLE_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: ADD_PRODUCTION_PINEAPPLE_FAIL
        });
        dispatch(setAlert(err.response.data['error'], 'error'));

    }
}
export const update_process_pineapple = (form, slug) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.patch(`${process.env.REACT_APP_API_URL}/api/production/pineapple/${slug}`, form, config);
        if (res.status === 200) {
            dispatch({
                type: UPDATE_PRODUCTION_PINEAPPLE_SUCCESS,
            });
            dispatch(get_process_detail_pineapple(slug));
            dispatch(setAlert(res.data.message, 'success'));

        } else {
            dispatch({
                type: UPDATE_PRODUCTION_PINEAPPLE_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: UPDATE_PRODUCTION_PINEAPPLE_FAIL
        });
        dispatch(setAlert(err.response.data['error'], 'error'));

    }
}
export const delete_process_pineapple = (slug) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/production/pineapple/${slug}`, config);
        if (res.status === 200) {
            dispatch({
                type: DELETE_PRODUCTION_PINEAPPLE_SUCCESS,
            });

            dispatch(get_process_pineapple());
            dispatch(setAlert(res.data.message, 'success'));

        } else {
            dispatch({
                type: DELETE_PRODUCTION_PINEAPPLE_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: DELETE_PRODUCTION_PINEAPPLE_FAIL
        });
        dispatch(setAlert(err.response.data['error'], 'error'));

    }
}

export const add_crown_pineapple = (form, slug) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/production/pineapple/crown`, form, config);
        if (res.status === 201) {
            dispatch({
                type: ADD_CROWN_PINEAPPLE_SUCCESS,
            });
            dispatch(get_process_detail_pineapple(slug));
            dispatch(setAlert(res.data.message, 'success'));

        } else {
            dispatch({
                type: ADD_CROWN_PINEAPPLE_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: ADD_CROWN_PINEAPPLE_FAIL
        });
        dispatch(setAlert(err.response.data['error'], 'error'));

    }
}
export const delete_crown_pineapple = (id, slug) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/production/pineapple/crown/${id}`, config);
        if (res.status === 200) {
            dispatch({
                type: DELETE_CROWN_PINEAPPLE_SUCCESS,
            });
            dispatch(get_process_detail_pineapple(slug));
            dispatch(setAlert(res.data.message, 'success'));

        } else {
            dispatch({
                type: DELETE_CROWN_PINEAPPLE_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: DELETE_CROWN_PINEAPPLE_FAIL
        });
        dispatch(setAlert(err.response.data['error'], 'error'));

    }
}

export const add_peel_pineapple = (form, slug) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/production/pineapple/peel`, form, config);
        if (res.status === 201) {
            dispatch({
                type: ADD_PEEL_PINEAPPLE_SUCCESS,
            });
            dispatch(get_process_detail_pineapple(slug));
            dispatch(setAlert(res.data.message, 'success'));

        } else {
            dispatch({
                type: ADD_PEEL_PINEAPPLE_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: ADD_PEEL_PINEAPPLE_FAIL
        });
        dispatch(setAlert(err.response.data['error'], 'error'));

    }
}
export const delete_peel_pineapple = (id, slug) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/production/pineapple/peel/${id}`, config);
        if (res.status === 200) {
            dispatch({
                type: DELETE_PEEL_PINEAPPLE_SUCCESS,
            });
            dispatch(get_process_detail_pineapple(slug));
            dispatch(setAlert(res.data.message, 'success'));

        } else {
            dispatch({
                type: DELETE_PEEL_PINEAPPLE_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: DELETE_PEEL_PINEAPPLE_FAIL
        });
        dispatch(setAlert(err.response.data['error'], 'error'));

    }
}