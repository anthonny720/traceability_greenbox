import {
    ADD_DATA_PACKING_LIST_FAIL,
    ADD_DATA_PACKING_LIST_SUCCESS,
    ADD_DATA_PROGRAM_FAIL,
    ADD_DATA_PROGRAM_SUCCESS,
    ADD_PROGRAM_FAIL,
    ADD_PROGRAM_SUCCESS, DELETE_DATA_PACKING_LIST_FAIL, DELETE_DATA_PACKING_LIST_SUCCESS,
    DELETE_DATA_PROGRAM_FAIL,
    DELETE_DATA_PROGRAM_SUCCESS, GET_DATA_PACKING_LIST_FAIL, GET_DATA_PACKING_LIST_SUCCESS,
    GET_DATA_PROGRAM_FAIL,
    GET_DATA_PROGRAM_SUCCESS,
    GET_LOTS_BY_SLUG_FAIL,
    GET_LOTS_BY_SLUG_SUCCESS,
    GET_PACKING_LIST_BY_SLUG_FAIL,
    GET_PACKING_LIST_BY_SLUG_SUCCESS,
    GET_PACKING_LIST_FAIL,
    GET_PACKING_LIST_SUCCESS,
    GET_PROGRAM_FAIL,
    GET_PROGRAM_SUCCESS,
    GET_PROGRAMS_FAIL,
    GET_PROGRAMS_SUCCESS,
    UPDATE_PACKING_LIST_FAIL,
    UPDATE_PACKING_LIST_SUCCESS
} from './types'
import axios from "axios";
import {setAlert} from "./alert";

export const get_programs = () => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/logistic/programs`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_PROGRAMS_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_PROGRAMS_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_PROGRAMS_FAIL
        });

    }
}
export const get_programs_page = (p) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/logistic/programs?p=${p}`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_PROGRAMS_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_PROGRAMS_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_PROGRAMS_FAIL
        });

    }
}
export const get_program = (slug) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/logistic/programs/${slug}`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_PROGRAM_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_PROGRAM_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_PROGRAM_FAIL
        });

    }
}


export const add_program = (form) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/logistic/programs`, form, config);
        if (res.status === 201) {
            dispatch({
                type: ADD_PROGRAM_SUCCESS,
            });
            dispatch(get_programs())
            dispatch(setAlert(res.data.message, 'success'));
        } else {
            dispatch({
                type: ADD_PROGRAM_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: ADD_PROGRAM_FAIL
        });
        dispatch(setAlert(err.response.data['error'], 'error'));

    }
}

export const get_data_program = (slug) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/logistic/programs/${slug}/data`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_DATA_PROGRAM_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_DATA_PROGRAM_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_DATA_PROGRAM_FAIL
        });

    }
}

export const add_data_program = (form, slug) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/logistic/programs/data`, form, config);
        if (res.status === 201) {
            dispatch({
                type: ADD_DATA_PROGRAM_SUCCESS,
            });
            dispatch(get_data_program(slug))
            dispatch(setAlert(res.data.message, 'success'));
        } else {
            dispatch({
                type: ADD_DATA_PROGRAM_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: ADD_DATA_PROGRAM_FAIL
        });
        dispatch(setAlert(err.response.data['error'], 'error'));

    }
}

export const delete_data_program = (pk, slug) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/logistic/programs/data/${pk}`, config);
        if (res.status === 200) {
            dispatch({
                type: DELETE_DATA_PROGRAM_SUCCESS,
            });
            dispatch(get_data_program(slug))
            dispatch(setAlert(res.data.message, 'success'));
        } else {
            dispatch({
                type: DELETE_DATA_PROGRAM_FAIL
            });

        }
    } catch (err) {
        dispatch({
            type: DELETE_DATA_PROGRAM_FAIL
        });
        dispatch(setAlert(err.response.data['error'], 'error'));

    }
}


export const get_packing_list = () => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/logistic/packing-list`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_PACKING_LIST_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_PACKING_LIST_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_PACKING_LIST_FAIL
        });

    }
}
export const get_packing_list_page = (p) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/logistic/packing-list?p=${p}`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_PACKING_LIST_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_PACKING_LIST_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_PACKING_LIST_FAIL
        });

    }
}

export const get_packing_list_by_slug = (slug) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/logistic/packing-list/${slug}`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_PACKING_LIST_BY_SLUG_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_PACKING_LIST_BY_SLUG_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_PACKING_LIST_BY_SLUG_FAIL
        });

    }
}

export const get_lots_by_slug = (slug) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/logistic/packing-list/${slug}/lots`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_LOTS_BY_SLUG_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_LOTS_BY_SLUG_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_LOTS_BY_SLUG_FAIL
        });

    }
}

export const update_packing = (form, slug) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.patch(`${process.env.REACT_APP_API_URL}/api/logistic/packing-list/${slug}`, form, config);
        if (res.status === 200) {
            dispatch({
                type: UPDATE_PACKING_LIST_SUCCESS,
            });
            dispatch(setAlert(res.data.message, 'success'));
            dispatch(get_packing_list_by_slug(slug))
        } else {
            dispatch({
                type: UPDATE_PACKING_LIST_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: UPDATE_PACKING_LIST_FAIL
        });
        dispatch(setAlert(err.response.data['error'], 'error'));

    }
}


export const add_data_packing = (form,slug) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/logistic/packing-list/data`, form, config);
        if (res.status === 201) {
            dispatch({
                type: ADD_DATA_PACKING_LIST_SUCCESS,
            });
            dispatch(get_packing_list_by_slug(slug))
            dispatch(get_lots_by_slug(slug))
            dispatch(get_data_packing_list(slug))
            dispatch(setAlert(res.data.message, 'success'));
        } else {
            dispatch({
                type: ADD_DATA_PACKING_LIST_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: ADD_DATA_PACKING_LIST_FAIL
        });
        dispatch(setAlert(err.response.data['error'], 'error'));

    }
}


export const get_data_packing_list = (slug) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/logistic/packing-list/${slug}/data`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_DATA_PACKING_LIST_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_DATA_PACKING_LIST_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_DATA_PACKING_LIST_FAIL
        });

    }
}

export const delete_data_packing = (id, slug) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/logistic/packing-list/data/${id}`, config);
        if (res.status === 200) {
            dispatch({
                type: DELETE_DATA_PACKING_LIST_SUCCESS,
            });
            dispatch(get_packing_list_by_slug(slug))
            dispatch(get_lots_by_slug(slug))
            dispatch(get_data_packing_list(slug))
            dispatch(setAlert(res.data.message, 'success'));
        } else {
            dispatch({
                type: DELETE_DATA_PACKING_LIST_FAIL
            });

        }
    } catch (err) {
        dispatch({
            type: DELETE_DATA_PACKING_LIST_FAIL
        });
        dispatch(setAlert(err.response.data['error'], 'error'));

    }
}
