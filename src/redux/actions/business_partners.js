import {
    ADD_CARRIER_FAIL,
    ADD_CARRIER_SUCCESS,
    ADD_CONTACT_FAIL,
    ADD_CONTACT_SUCCESS, DELETE_CARRIER_FAIL, DELETE_CARRIER_SUCCESS,
    DELETE_CONTACT_FAIL,
    DELETE_CONTACT_SUCCESS,
    DETAIL_CLIENT_FAIL,
    DETAIL_CLIENT_SUCCESS,
    DETAIL_PROVIDER_FAIL,
    DETAIL_PROVIDER_SUCCESS, GET_CARRIER_FAIL, GET_CARRIER_SUCCESS,
    GET_CLIENTS_FAIL, GET_CLIENTS_SALES_FAIL, GET_CLIENTS_SALES_SUCCESS,
    GET_CLIENTS_SUCCESS,
    GET_CONTACTS_FAIL,
    GET_CONTACTS_SUCCESS,
    GET_PROVIDERS_FAIL,
    GET_PROVIDERS_SALES_FAIL,
    GET_PROVIDERS_SALES_SUCCESS,
    GET_PROVIDERS_SUCCESS, UPDATE_CARRIER_FAIL, UPDATE_CARRIER_SUCCESS,
    UPDATE_CONTACT_FAIL,
    UPDATE_CONTACT_SUCCESS
} from './types'

import axios from "axios";
import {setAlert} from "./alert";
export const get_full_providers = () => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/business-partners/full-providers`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_PROVIDERS_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_PROVIDERS_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_PROVIDERS_FAIL
        });

    }
}

export const get_providers = () => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/business-partners/providers`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_PROVIDERS_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_PROVIDERS_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_PROVIDERS_FAIL
        });

    }
}
export const get_providers_page = (p) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/business-partners/providers?p=${p}`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_PROVIDERS_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_PROVIDERS_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_PROVIDERS_FAIL
        });

    }
}
export const get_contacts = () => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/business-partners/get-contacts`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_CONTACTS_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_CONTACTS_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_CONTACTS_FAIL
        });
    }
}
export const get_contacts_page = (p) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/business-partners/get-contacts?p=${p}`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_CONTACTS_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_CONTACTS_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_CONTACTS_FAIL
        });
    }
}
export const add_contact = (form) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/business-partners/add-contact`, form, config);
        if (res.status === 201) {
            dispatch({
                type: ADD_CONTACT_SUCCESS,
            });
            dispatch(get_contacts())

            dispatch(setAlert(res.data.message, 'success'));

        } else {
            dispatch({
                type: ADD_CONTACT_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: ADD_CONTACT_FAIL
        });
        dispatch(setAlert(err.response.data['error'], 'error'));

    }
}
export const delete_contact = (id) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/business-partners/delete-contact/${id}`, config);
        if (res.status === 200) {
            dispatch({
                type: DELETE_CONTACT_SUCCESS,
            });
            dispatch(get_contacts())

            dispatch(setAlert(res.data.message, 'success'));

        } else {
            dispatch({
                type: DELETE_CONTACT_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: DELETE_CONTACT_FAIL
        });
        dispatch(setAlert(err.response.data['error'], 'error'));

    }
}
export const update_contact = (form, id) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.patch(`${process.env.REACT_APP_API_URL}/api/business-partners/update-contact/${id}`, form, config);
        if (res.status === 200) {
            dispatch({
                type: UPDATE_CONTACT_SUCCESS,
            });
            dispatch(get_contacts())

            dispatch(setAlert(res.data.message, 'success'));

        } else {
            dispatch({
                type: UPDATE_CONTACT_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: UPDATE_CONTACT_FAIL
        });
        dispatch(setAlert(err.response.data['error'], 'error'));

    }
}

export const get_clients = () => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/business-partners/clients`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_CLIENTS_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_CLIENTS_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_CLIENTS_FAIL
        });
    }
}
export const get_clients_page = (p) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/business-partners/clients?p=${p}`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_CLIENTS_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_CLIENTS_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_CLIENTS_FAIL
        });
    }
}

export const get_client = (slug) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/business-partners/clients/${slug}`, config);
        if (res.status === 200) {
            dispatch({
                type: DETAIL_CLIENT_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: DETAIL_CLIENT_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: DETAIL_CLIENT_FAIL
        });
    }
}
export const get_provider = (slug) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/business-partners/providers/${slug}`, config);
        if (res.status === 200) {
            dispatch({
                type: DETAIL_PROVIDER_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: DETAIL_PROVIDER_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: DETAIL_PROVIDER_FAIL
        });
    }
}

export const get_sales_provider = (slug) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/business-partners/providers/sales/${slug}`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_PROVIDERS_SALES_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_PROVIDERS_SALES_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_PROVIDERS_SALES_FAIL
        });
    }
}
export const get_sales_client = (slug) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/business-partners/clients/sales/${slug}`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_CLIENTS_SALES_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_CLIENTS_SALES_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_CLIENTS_SALES_FAIL
        });
    }
}


export const get_carriers = () => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/business-partners/get-carriers`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_CARRIER_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_CARRIER_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_CARRIER_FAIL
        });
    }
}
export const get_carriers_page = (p) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/business-partners/get-carriers?p=${p}`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_CARRIER_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_CARRIER_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_CARRIER_FAIL
        });
    }
}
export const add_carrier = (form) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/business-partners/add-carrier`, form, config);
        if (res.status === 201) {
            dispatch({
                type: ADD_CARRIER_SUCCESS,
            });
            dispatch(get_carriers())

            dispatch(setAlert(res.data.message, 'success'));

        } else {
            dispatch({
                type: ADD_CARRIER_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: ADD_CARRIER_FAIL
        });
        dispatch(setAlert(err.response.data['error'], 'error'));

    }
}
export const delete_carrier = (id) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/business-partners/delete-carrier/${id}`, config);
        if (res.status === 200) {
            dispatch({
                type: DELETE_CARRIER_SUCCESS,
            });
            dispatch(get_carriers())

            dispatch(setAlert(res.data.message, 'success'));

        } else {
            dispatch({
                type: DELETE_CARRIER_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: DELETE_CARRIER_FAIL
        });
        dispatch(setAlert(err.response.data['error'], 'error'));

    }
}
export const update_carrier = (form, id) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.patch(`${process.env.REACT_APP_API_URL}/api/business-partners/update-carrier/${id}`, form, config);
        if (res.status === 200) {
            dispatch({
                type: UPDATE_CARRIER_SUCCESS,
            });
            dispatch(get_carriers())

            dispatch(setAlert(res.data.message, 'success'));

        } else {
            dispatch({
                type: UPDATE_CARRIER_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: UPDATE_CARRIER_FAIL
        });
        dispatch(setAlert(err.response.data['error'], 'error'));

    }
}