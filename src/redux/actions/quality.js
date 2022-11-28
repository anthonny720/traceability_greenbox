import axios from "axios";
import {setAlert} from "./alert";
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
    UPDATE_ANALYSIS_AGUAYMANTO_FAIL,
    UPDATE_ANALYSIS_AGUAYMANTO_SUCCESS,
    UPDATE_ANALYSIS_BANANO_FAIL,
    UPDATE_ANALYSIS_BANANO_SUCCESS,
    UPDATE_ANALYSIS_BLUEBERRY_FAIL,
    UPDATE_ANALYSIS_BLUEBERRY_SUCCESS,
    UPDATE_ANALYSIS_MANGO_FAIL,
    UPDATE_ANALYSIS_MANGO_SUCCESS,
    UPDATE_ANALYSIS_PINEAPPLE_FAIL,
    UPDATE_ANALYSIS_PINEAPPLE_SUCCESS,
    UPDATE_CUT_TEST_FAIL,
    UPDATE_CUT_TEST_SUCCESS,
} from "./types";


export const get_cut_test = () => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/quality/cut-test`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_CUT_TEST_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_CUT_TEST_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_CUT_TEST_FAIL
        });
    }
}
export const get_cut_test_page = (p) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/quality/cut-test?p=${p}`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_CUT_TEST_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_CUT_TEST_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_CUT_TEST_FAIL
        });
    }
}

export const update_cut_test = (id, form) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.patch(`${process.env.REACT_APP_API_URL}/api/quality/cut-test/${id}`, form, config);
        if (res.status === 200) {
            dispatch({
                type: UPDATE_CUT_TEST_SUCCESS,
                payload: res.data
            });
            dispatch(setAlert(res.data.message, 'success'));
            dispatch(get_cut_test());
        } else {
            dispatch({
                type: UPDATE_CUT_TEST_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: UPDATE_CUT_TEST_FAIL
        });
        dispatch(setAlert(err.response.data['error'], 'error'));
    }
}


export const get_analysis_pineapple = () => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/quality/analysis-pineapple`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_ANALYSIS_PINEAPPLE_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_ANALYSIS_PINEAPPLE_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_ANALYSIS_PINEAPPLE_FAIL
        });
    }
}
export const get_analysis_pineapple_page = (p) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/quality/analysis-pineapple?p=${p}`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_ANALYSIS_PINEAPPLE_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_ANALYSIS_PINEAPPLE_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_ANALYSIS_PINEAPPLE_FAIL
        });
    }
}
export const get_analysis_mango = () => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/quality/analysis-mango`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_ANALYSIS_MANGO_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_ANALYSIS_MANGO_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_ANALYSIS_MANGO_FAIL
        });
    }
}
export const get_analysis_mango_page = (p) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/quality/analysis-mango?p=${p}`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_ANALYSIS_MANGO_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_ANALYSIS_MANGO_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_ANALYSIS_MANGO_FAIL
        });
    }
}
export const get_analysis_banano = () => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/quality/analysis-banano`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_ANALYSIS_BANANO_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_ANALYSIS_BANANO_FAIL,
            });
        }
    } catch (err) {
        dispatch({
            type: GET_ANALYSIS_BANANO_FAIL,
        });
    }
}
export const get_analysis_banano_page = (p) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/quality/analysis-banano?p=${p}`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_ANALYSIS_BANANO_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_ANALYSIS_BANANO_FAIL,
            });
        }
    } catch (err) {
        dispatch({
            type: GET_ANALYSIS_BANANO_FAIL,
        });
    }
}
export const get_analysis_aguaymanto = () => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/quality/analysis-aguaymanto`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_ANALYSIS_AGUAYMANTO_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_ANALYSIS_AGUAYMANTO_FAIL,
            });
        }
    } catch (err) {
        dispatch({
            type: GET_ANALYSIS_AGUAYMANTO_FAIL,
        });
    }
}
export const get_analysis_aguaymanto_page = (p) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/quality/analysis-aguaymanto?p=${p}`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_ANALYSIS_AGUAYMANTO_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_ANALYSIS_AGUAYMANTO_FAIL,
            });
        }
    } catch (err) {
        dispatch({
            type: GET_ANALYSIS_AGUAYMANTO_FAIL,
        });
    }
}
export const get_analysis_blueberry = () => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/quality/analysis-blueberry`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_ANALYSIS_BLUEBERRY_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_ANALYSIS_BLUEBERRY_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_ANALYSIS_BLUEBERRY_FAIL
        });
    }
}
export const get_analysis_blueberry_page = (p) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/quality/analysis-blueberry?p=${p}`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_ANALYSIS_BLUEBERRY_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_ANALYSIS_BLUEBERRY_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_ANALYSIS_BLUEBERRY_FAIL
        });
    }
}

export const update_analysis_pineapple = (id, form) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.patch(`${process.env.REACT_APP_API_URL}/api/quality/analysis-pineapple/${id}`, form, config);
        if (res.status === 200) {
            dispatch({
                type: UPDATE_ANALYSIS_PINEAPPLE_SUCCESS,
            });
            dispatch(setAlert(res.data.message, 'success'));
            dispatch(get_analysis_pineapple());
        } else {
            dispatch({
                type: UPDATE_ANALYSIS_PINEAPPLE_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: UPDATE_ANALYSIS_PINEAPPLE_FAIL
        });
        dispatch(setAlert(err.response.data['error'], 'error'));
    }
}
export const update_analysis_mango = (id, form) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.patch(`${process.env.REACT_APP_API_URL}/api/quality/analysis-mango/${id}`, form, config);
        if (res.status === 200) {
            dispatch({
                type: UPDATE_ANALYSIS_MANGO_SUCCESS,
            });
            dispatch(setAlert(res.data.message, 'success'));
            dispatch(get_analysis_mango());
        } else {
            dispatch({
                type: UPDATE_ANALYSIS_MANGO_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: UPDATE_ANALYSIS_MANGO_FAIL
        });
        dispatch(setAlert(err.response.data['error'], 'error'));
    }
}
export const update_analysis_banano = (id, form) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.patch(`${process.env.REACT_APP_API_URL}/api/quality/analysis-banano/${id}`, form, config);
        if (res.status === 200) {
            dispatch({
                type: UPDATE_ANALYSIS_BANANO_SUCCESS,
            });
            dispatch(setAlert(res.data.message, 'success'));
            dispatch(get_analysis_banano());
        } else {
            dispatch({
                type: UPDATE_ANALYSIS_BANANO_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: UPDATE_ANALYSIS_BANANO_FAIL
        });
        dispatch(setAlert(err.response.data['error'], 'error'));
    }
}
export const update_analysis_aguaymanto = (id, form) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.patch(`${process.env.REACT_APP_API_URL}/api/quality/analysis-aguaymanto/${id}`, form, config);
        if (res.status === 200) {
            dispatch({
                type: UPDATE_ANALYSIS_AGUAYMANTO_SUCCESS,
            });
            dispatch(setAlert(res.data.message, 'success'));
            dispatch(get_analysis_aguaymanto());
        } else {
            dispatch({
                type: UPDATE_ANALYSIS_AGUAYMANTO_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: UPDATE_ANALYSIS_AGUAYMANTO_FAIL
        });
        dispatch(setAlert(err.response.data['error'], 'error'));
    }
}
export const update_analysis_blueberry = (id, form) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.patch(`${process.env.REACT_APP_API_URL}/api/quality/analysis-blueberry/${id}`, form, config);
        if (res.status === 200) {
            dispatch({
                type: UPDATE_ANALYSIS_BLUEBERRY_SUCCESS,
            });
            dispatch(setAlert(res.data.message, 'success'));
            dispatch(get_analysis_blueberry());
        } else {
            dispatch({
                type: UPDATE_ANALYSIS_BLUEBERRY_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: UPDATE_ANALYSIS_BLUEBERRY_FAIL
        });
        dispatch(setAlert(err.response.data['error'], 'error'));
    }
}

