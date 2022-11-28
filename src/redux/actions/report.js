import {
    GET_PROVIDERS_CATEGORY_FAIL,
    GET_PROVIDERS_CATEGORY_SUCCESS,
    GET_REPORT_FAIL,
    GET_REPORT_SUCCESS,
    GET_SUMMARY_CATEGORY_FAIL,
    GET_SUMMARY_CATEGORY_SUCCESS,
    UPDATE_REPORT_FAIL,
    UPDATE_REPORT_SUCCESS,
} from "./types";
import axios from "axios";
import {setAlert} from "./alert";

export const getReport = (category, params) => async dispatch => {
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
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/report/${category}`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_REPORT_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_REPORT_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_REPORT_FAIL
        });
    }
}
export const getReport_page = (category, params, p) => async dispatch => {
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
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/report/${category}?p=${p}`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_REPORT_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_REPORT_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_REPORT_FAIL
        });
    }
}

export const getProvidersCategory = (category) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/report/providers/${category}`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_PROVIDERS_CATEGORY_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_PROVIDERS_CATEGORY_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_PROVIDERS_CATEGORY_FAIL
        });
    }
}
export const getSummaryCategory = (category) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/report/summary/${category}`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_SUMMARY_CATEGORY_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_SUMMARY_CATEGORY_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_SUMMARY_CATEGORY_FAIL
        });
    }
}

export const update_packing = (form, id, category) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.patch(`${process.env.REACT_APP_API_URL}/api/report/${id}`, form, config);
        if (res.status === 200) {
            dispatch({
                type: UPDATE_REPORT_SUCCESS,
            });
            dispatch(getSummaryCategory(category));
            dispatch(getReport(category));
            dispatch(setAlert(res.data.message, 'success'));

        } else {
            dispatch({
                type: UPDATE_REPORT_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: UPDATE_REPORT_FAIL
        });
        dispatch(setAlert(err.response.data['error'], 'error'));

    }
}
