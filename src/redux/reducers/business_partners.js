import {
    ADD_CARRIER_FAIL,
    ADD_CARRIER_SUCCESS,
    ADD_CONTACT_FAIL,
    ADD_CONTACT_SUCCESS,
    DELETE_CARRIER_FAIL,
    DELETE_CARRIER_SUCCESS,
    DELETE_CONTACT_FAIL,
    DELETE_CONTACT_SUCCESS,
    DETAIL_CLIENT_FAIL,
    DETAIL_CLIENT_SUCCESS,
    DETAIL_PROVIDER_FAIL,
    DETAIL_PROVIDER_SUCCESS,
    GET_CARRIER_FAIL,
    GET_CARRIER_SUCCESS,
    GET_CLIENTS_FAIL,
    GET_CLIENTS_SALES_FAIL,
    GET_CLIENTS_SALES_SUCCESS,
    GET_CLIENTS_SUCCESS,
    GET_CONTACTS_FAIL,
    GET_CONTACTS_SUCCESS,
    GET_PROVIDERS_FAIL,
    GET_PROVIDERS_SALES_FAIL,
    GET_PROVIDERS_SALES_SUCCESS,
    GET_PROVIDERS_SUCCESS,
    UPDATE_CARRIER_FAIL,
    UPDATE_CARRIER_SUCCESS,
    UPDATE_CONTACT_FAIL,
    UPDATE_CONTACT_SUCCESS
} from '../actions/types';

const initialState = {
    providers: null, contacts: null,
    carriers: null,
    clients: null,
    client: null,
    provider: null,
    provider_sales: null,
    client_sales: null,
    count_clients: null,
    count_providers: null,
    count_carriers: null,
    count_contacts: null,
}
export default function Business(state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case GET_PROVIDERS_SUCCESS:
            return {
                ...state, providers: payload.results, count_providers: payload.count
            }
        case GET_PROVIDERS_FAIL:
            return {
                ...state, providers: null, count_providers: null
            }
        case GET_CONTACTS_SUCCESS:
            return {
                ...state, contacts: payload.results, count_contacts: payload.count
            }
        case GET_CONTACTS_FAIL:
            return {
                ...state, contacts: null, count_contacts: null
            }
        case GET_CARRIER_SUCCESS:
            return {
                ...state, carriers: payload.results, count_carriers: payload.count
            }
        case GET_CARRIER_FAIL:
            return {
                ...state, carriers: null, count_carriers: null
            }
        case GET_CLIENTS_SUCCESS:
            return {
                ...state,
                clients: payload.results, count_clients: payload.count
            }
        case GET_CLIENTS_FAIL:
            return {
                ...state,
                clients: null, count_clients: null
            }
        case DETAIL_CLIENT_SUCCESS:
            return {
                ...state,
                client: payload.result
            }
        case DETAIL_CLIENT_FAIL:
            return {
                ...state,
                client: null
            }
        case DETAIL_PROVIDER_SUCCESS:
            return {
                ...state,
                provider: payload.result
            }
        case DETAIL_PROVIDER_FAIL:
            return {
                ...state,
                provider: null
            }
        case GET_PROVIDERS_SALES_SUCCESS:
            return {
                ...state,
                provider_sales: payload.result
            }
        case GET_PROVIDERS_SALES_FAIL:
            return {
                ...state,
                provider_sales: null
            }
        case GET_CLIENTS_SALES_SUCCESS:
            return {
                ...state,
                client_sales: payload.result
            }
        case GET_CLIENTS_SALES_FAIL:
            return {
                ...state,
                client_sales: null
            }
        case ADD_CONTACT_SUCCESS:
        case ADD_CONTACT_FAIL:
        case DELETE_CONTACT_SUCCESS:
        case DELETE_CONTACT_FAIL:
        case UPDATE_CONTACT_SUCCESS:
        case UPDATE_CONTACT_FAIL:
        case ADD_CARRIER_SUCCESS:
        case ADD_CARRIER_FAIL:
        case DELETE_CARRIER_SUCCESS:
        case DELETE_CARRIER_FAIL:
        case UPDATE_CARRIER_SUCCESS:
        case UPDATE_CARRIER_FAIL:
            return {
                ...state,
            }
        default:
            return state;
    }
}