import {
    GET_BAGS_FAIL,
    GET_BAGS_SUCCESS,
    GET_BOXES_FAIL,
    GET_BOXES_SUCCESS,
    GET_FRUITS_FAIL,
    GET_FRUITS_SUCCESS,
    GET_PALLETS_FAIL,
    GET_PALLETS_SUCCESS
} from "./types";
import axios from "axios";


export const get_fruits = () => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/products/get-summary`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_FRUITS_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_FRUITS_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_FRUITS_FAIL
        });
    }
}

export const get_pallets = () => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/products/get-pallets`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_PALLETS_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_PALLETS_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_PALLETS_FAIL
        });

    }
}

export const get_boxes = () => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/products/boxes`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_BOXES_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_BOXES_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_BOXES_FAIL
        });

    }
}
export const get_bags = () => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/products/bags`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_BAGS_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_BAGS_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_BAGS_FAIL
        });

    }
}