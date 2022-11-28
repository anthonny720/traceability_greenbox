import axios from "axios";
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
} from "./types";
import {setAlert} from "./alert";

export const get_cuts = () => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/process-line/list-cuts`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_CUTS_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_CUTS_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_CUTS_FAIL
        });
    }
}

export const get_process_conditioning = (lot) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/process-line/list-conditioning/${lot}`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_PROCESS_CONDITIONING_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_PROCESS_CONDITIONING_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_PROCESS_CONDITIONING_FAIL
        });
    }
}
export const get_process_terminated = (lot) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/process-line/list-terminated/${lot}`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_PROCESS_TERMINATED_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_PROCESS_TERMINATED_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_PROCESS_TERMINATED_FAIL
        });
    }
}
export const get_process_released = (lot) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/process-line/list-released/${lot}`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_PROCESS_RELEASED_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_PROCESS_RELEASED_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_PROCESS_RELEASED_FAIL
        });
    }
}
export const get_process_general_conditioning = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }, params: {
            ...params

        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/process-line/list-conditioning`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_PROCESS_GENERAL_CONDITIONING_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_PROCESS_GENERAL_CONDITIONING_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_PROCESS_GENERAL_CONDITIONING_FAIL
        });
    }
}
export const get_process_general_conditioning_page = (params, p) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }, params: {
            ...params

        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/process-line/list-conditioning?p=${p}`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_PROCESS_GENERAL_CONDITIONING_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_PROCESS_GENERAL_CONDITIONING_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_PROCESS_GENERAL_CONDITIONING_FAIL
        });
    }
}
export const get_process_general_terminated = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }, params: {
            ...params

        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/process-line/list-terminated`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_PROCESS_GENERAL_TERMINATED_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_PROCESS_GENERAL_TERMINATED_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_PROCESS_GENERAL_TERMINATED_FAIL
        });
    }
}
export const get_process_general_terminated_page = (params, p) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }, params: {
            ...params

        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/process-line/list-terminated?p=${p}`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_PROCESS_GENERAL_TERMINATED_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_PROCESS_GENERAL_TERMINATED_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_PROCESS_GENERAL_TERMINATED_FAIL
        });
    }
}
export const get_process_general_released = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }, params: {
            ...params

        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/process-line/list-released`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_PROCESS_GENERAL_RELEASED_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_PROCESS_GENERAL_RELEASED_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_PROCESS_GENERAL_RELEASED_FAIL
        });
    }
}
export const get_process_general_released_page = (params, p) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }, params: {
            ...params

        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/process-line/list-released?p=${p}`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_PROCESS_GENERAL_RELEASED_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_PROCESS_GENERAL_RELEASED_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_PROCESS_GENERAL_RELEASED_FAIL
        });
    }
}

//CREATE-UPDATE-DELETE
export const add_process_conditioning = (form, lot) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/process-line/add-conditioning`, form, config);
        if (res.status === 201) {
            dispatch({
                type: ADD_PROCESS_CONDITIONING_SUCCESS,
            });
            dispatch(get_process_conditioning(lot))
            dispatch(setAlert(res.data.message, 'success'));

        } else {
            dispatch({
                type: ADD_PROCESS_CONDITIONING_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: ADD_PROCESS_CONDITIONING_FAIL
        });
        dispatch(setAlert(err.response.data['error'], 'error'));

    }
}
export const delete_process_conditioning = (id, lot) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/process-line/detail-conditioning/${id}`, config);
        if (res.status === 200) {
            dispatch({
                type: DELETE_PROCESS_CONDITIONING_SUCCESS,
            });
            dispatch(get_process_conditioning(lot))
            dispatch(get_process_terminated(lot))
            dispatch(get_process_released(lot))
            dispatch(setAlert(res.data.message, 'success'));

        } else {
            dispatch({
                type: DELETE_PROCESS_CONDITIONING_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: DELETE_PROCESS_CONDITIONING_FAIL
        });
        dispatch(setAlert(err.response.data['error'], 'error'));

    }
}
export const update_process_conditioning = (form, id, lot) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.patch(`${process.env.REACT_APP_API_URL}/api/process-line/detail-conditioning/${id}`, form, config);
        if (res.status === 200) {
            dispatch({
                type: UPDATE_PROCESS_CONDITIONING_SUCCESS,
            });
            dispatch(get_process_conditioning(lot))
            dispatch(get_process_terminated(lot))
            dispatch(get_process_released(lot))
            dispatch(setAlert(res.data.message, 'success'));

        } else {
            dispatch({
                type: UPDATE_PROCESS_CONDITIONING_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: UPDATE_PROCESS_CONDITIONING_FAIL
        });
        dispatch(setAlert(err.response.data['error'], 'error'));

    }
}

export const add_process_terminated = (form, lot) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/process-line/add-terminated`, form, config);
        if (res.status === 201) {
            dispatch({
                type: ADD_PROCESS_TERMINATED_SUCCESS,
            });
            dispatch(get_process_terminated(lot))
            dispatch(setAlert(res.data.message, 'success'));

        } else {
            dispatch({
                type: ADD_PROCESS_TERMINATED_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: ADD_PROCESS_TERMINATED_FAIL
        });
        dispatch(setAlert(err.response.data['error'], 'error'));

    }
}
export const delete_process_terminated = (id, lot) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/process-line/detail-terminated/${id}`, config);
        if (res.status === 200) {
            dispatch({
                type: DELETE_PROCESS_TERMINATED_SUCCESS,
            });
            dispatch(get_process_terminated(lot))
            dispatch(get_process_released(lot))
            dispatch(setAlert(res.data.message, 'success'));

        } else {
            dispatch({
                type: DELETE_PROCESS_TERMINATED_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: DELETE_PROCESS_TERMINATED_FAIL
        });
        dispatch(setAlert(err.response.data['error'], 'error'));

    }
}
export const update_process_terminated = (form, id, lot) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.patch(`${process.env.REACT_APP_API_URL}/api/process-line/detail-terminated/${id}`, form, config);
        if (res.status === 200) {
            dispatch({
                type: UPDATE_PROCESS_TERMINATED_SUCCESS,
            });
            dispatch(get_process_terminated(lot))
            dispatch(get_process_released(lot))
            dispatch(setAlert(res.data.message, 'success'));

        } else {
            dispatch({
                type: UPDATE_PROCESS_TERMINATED_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: UPDATE_PROCESS_TERMINATED_FAIL
        });
        dispatch(setAlert(err.response.data['error'], 'error'));

    }
}

export const add_process_released = (form, lot) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/process-line/add-released`, form, config);
        if (res.status === 201) {
            dispatch({
                type: ADD_PROCESS_RELEASED_SUCCESS,
            });
            dispatch(get_process_released(lot))
            dispatch(setAlert(res.data.message, 'success'));

        } else {
            dispatch({
                type: ADD_PROCESS_RELEASED_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: ADD_PROCESS_RELEASED_FAIL
        });
        dispatch(setAlert(err.response.data['error'], 'error'));

    }
}
export const delete_process_released = (id, lot) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/process-line/detail-released/${id}`, config);
        if (res.status === 200) {
            dispatch({
                type: DELETE_PROCESS_RELEASED_SUCCESS,
            });
            dispatch(get_process_released(lot))
            dispatch(setAlert(res.data.message, 'success'));

        } else {
            dispatch({
                type: DELETE_PROCESS_RELEASED_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: DELETE_PROCESS_RELEASED_FAIL
        });
        dispatch(setAlert(err.response.data['error'], 'error'));

    }
}
export const update_process_released = (form, id, lot) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.patch(`${process.env.REACT_APP_API_URL}/api/process-line/detail-released/${id}`, form, config);
        if (res.status === 200) {
            dispatch({
                type: UPDATE_PROCESS_RELEASED_SUCCESS,
            });
            dispatch(get_process_released(lot))
            dispatch(setAlert(res.data.message, 'success'));

        } else {
            dispatch({
                type: UPDATE_PROCESS_RELEASED_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: UPDATE_PROCESS_RELEASED_FAIL
        });
        dispatch(setAlert(err.response.data['error'], 'error'));

    }
}


export const get_reception_released = () => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/process-line/list-released-reception`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_RECEPTION_RELEASED_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_RECEPTION_RELEASED_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_RECEPTION_RELEASED_FAIL
        });
    }
}
