import {
    ADD_LOT_COMMERCIAL_FAIL,
    ADD_LOT_COMMERCIAL_SUCCESS,
    GET_BUSINESS_MAQUILA_FAIL,
    GET_BUSINESS_MAQUILA_SUCCESS,
    GET_CLIENT_COMMERCIAL_FAIL,
    GET_CLIENT_COMMERCIAL_SUCCESS,
    GET_CONDITION_COMMERCIAL_FAIL,
    GET_CONDITION_COMMERCIAL_SUCCESS,
    GET_CUT_COMMERCIAL_FAIL,
    GET_CUT_COMMERCIAL_SUCCESS,
    GET_FAMILY_COMMERCIAL_FAIL,
    GET_FAMILY_COMMERCIAL_SUCCESS,
    GET_GROUP_COMMERCIAL_FAIL,
    GET_GROUP_COMMERCIAL_SUCCESS,
    GET_LOTS_COMMERCIAL_FAIL,
    GET_LOTS_COMMERCIAL_SUCCESS,
    GET_PACKAGING_COMMERCIAL_FAIL,
    GET_PACKAGING_COMMERCIAL_SUCCESS,
    GET_PACKING_COMMERCIAL_FAIL,
    GET_PACKING_COMMERCIAL_SUCCESS,
    GET_PRESENTATION_COMMERCIAL_FAIL,
    GET_PRESENTATION_COMMERCIAL_SUCCESS,
    GET_PRODUCTS_COMMERCIAL_FAIL,
    GET_PRODUCTS_COMMERCIAL_SUCCESS,
    GET_PROVIDER_COMMERCIAL_FAIL,
    GET_PROVIDER_COMMERCIAL_SUCCESS,
    GET_TYPE_COMMERCIAL_FAIL,
    GET_TYPE_COMMERCIAL_SUCCESS,
    GET_VARIETY_COMMERCIAL_FAIL,
    GET_VARIETY_COMMERCIAL_SUCCESS
} from './types'

import axios from "axios";
import {setAlert} from "./alert";

export const get_products = () => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/commercial/products`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_PRODUCTS_COMMERCIAL_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_PRODUCTS_COMMERCIAL_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_PRODUCTS_COMMERCIAL_FAIL
        });

    }
}
export const get_family = () => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/commercial/family`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_FAMILY_COMMERCIAL_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_FAMILY_COMMERCIAL_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_FAMILY_COMMERCIAL_FAIL
        });

    }
}
export const get_group = () => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/commercial/group`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_GROUP_COMMERCIAL_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_GROUP_COMMERCIAL_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_GROUP_COMMERCIAL_FAIL
        });

    }
}
export const get_type = () => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/commercial/type`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_TYPE_COMMERCIAL_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_TYPE_COMMERCIAL_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_TYPE_COMMERCIAL_FAIL
        });

    }
}
export const get_cut = () => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/commercial/cut`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_CUT_COMMERCIAL_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_CUT_COMMERCIAL_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_CUT_COMMERCIAL_FAIL
        });

    }
}
export const get_variety = () => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/commercial/variety`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_VARIETY_COMMERCIAL_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_VARIETY_COMMERCIAL_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_VARIETY_COMMERCIAL_FAIL
        });

    }
}
export const get_client = () => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/commercial/client`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_CLIENT_COMMERCIAL_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_CLIENT_COMMERCIAL_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_CLIENT_COMMERCIAL_FAIL
        });

    }
}
export const get_presentation = () => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/commercial/presentation`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_PRESENTATION_COMMERCIAL_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_PRESENTATION_COMMERCIAL_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_PRESENTATION_COMMERCIAL_FAIL
        });

    }
}
export const get_packaging = () => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/commercial/packaging`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_PACKAGING_COMMERCIAL_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_PACKAGING_COMMERCIAL_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_PACKAGING_COMMERCIAL_FAIL
        });

    }
}
export const get_packing = () => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/commercial/packing`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_PACKING_COMMERCIAL_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_PACKING_COMMERCIAL_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_PACKING_COMMERCIAL_FAIL
        });

    }
}
export const get_provider = () => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/commercial/provider`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_PROVIDER_COMMERCIAL_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_PROVIDER_COMMERCIAL_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_PROVIDER_COMMERCIAL_FAIL
        });

    }
}
export const get_business_maquila = () => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/commercial/business-maquila`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_BUSINESS_MAQUILA_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_BUSINESS_MAQUILA_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_BUSINESS_MAQUILA_FAIL
        });

    }
}

export const get_condition = () => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/commercial/condition`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_CONDITION_COMMERCIAL_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_CONDITION_COMMERCIAL_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_CONDITION_COMMERCIAL_FAIL
        });

    }
}

export const add_lots = (form) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/commercial/lot`, form, config);
        if (res.status === 201) {
            dispatch({
                type: ADD_LOT_COMMERCIAL_SUCCESS, payload: res.data
            });
            dispatch(get_lots())

            dispatch(setAlert(res.data.message, 'success'));
        } else {
            dispatch({
                type: ADD_LOT_COMMERCIAL_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: ADD_LOT_COMMERCIAL_FAIL
        });
        dispatch(setAlert(err.response.data['error'], 'error'));

    }
}
export const get_lots = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        },
        params: {...params}
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/commercial/lot`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_LOTS_COMMERCIAL_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_LOTS_COMMERCIAL_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_LOTS_COMMERCIAL_FAIL
        });

    }
}
export const get_lots_page = (params, p) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        },
        params: {...params}
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/commercial/lot?p=${p}`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_LOTS_COMMERCIAL_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_LOTS_COMMERCIAL_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_LOTS_COMMERCIAL_FAIL
        });

    }
}