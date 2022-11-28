import {
    GET_PROVIDERS_CATEGORY_FAIL,
    GET_PROVIDERS_CATEGORY_SUCCESS,
    GET_REPORT_FAIL,
    GET_REPORT_SUCCESS,
    GET_SUMMARY_CATEGORY_FAIL,
    GET_SUMMARY_CATEGORY_SUCCESS,
} from "../actions/types";

const initialState = {
    category_data: null,
    report: null,
    providers: null,
    summary_provider: null,
    summary_avg_price: null,
    summary_kg_month: null,
    summary_month: null,
    summary_provider_kg: null,
    summary_provider_month: null,
    count: null,
    next: null,
    previous: null
}

export default function Report(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case GET_REPORT_SUCCESS:
            return {
                ...state,
                category_data: payload.results.result,
                report: payload.results.report,
                count: payload.count,
                next: payload.next,
                previous: payload.previous
            }
        case GET_REPORT_FAIL:
            return {
                ...state, category_data: null, report: null, count: null, next: null, previous: null
            }
        case GET_PROVIDERS_CATEGORY_SUCCESS:
            return {
                ...state, providers: payload.providers
            }
        case GET_PROVIDERS_CATEGORY_FAIL:
            return {
                ...state, providers: null
            }
        case GET_SUMMARY_CATEGORY_SUCCESS:
            return {
                ...state,
                summary_month: payload.orders_by_month,
                summary_provider: payload.orders_by_provider,
                summary_provider_month: payload.providers_by_month,
                summary_provider_kg: payload.providers_by_kg,
                summary_kg_month: payload.kg_by_month,
                summary_avg_price: payload.summary_avg_price
            }
        case GET_SUMMARY_CATEGORY_FAIL:
            return {
                ...state,
                summary_provider: null,
                summary_avg_price: null,
                summary_kg_month: null,
                summary_month: null,
                summary_provider_kg: null,
                summary_provider_month: null

            }

        default:
            return state
    }
}