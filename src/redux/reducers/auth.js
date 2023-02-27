import {LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, REGISTER_FAIL} from "../actions/types";

const accessToken = localStorage.getItem("ACCESS_TOKEN");
const refreshToken = localStorage.getItem("REFRESH_TOKEN");

const initialState = {
    error: null,
    isAuthenticated: !!accessToken,
    accessToken: accessToken || '',
    refreshToken: refreshToken || ''
}

export default function (state = initialState, action) {
    const { type, payload } = action

    switch (type) {
        case LOGIN_FAIL:
            return {
                ...state,
                error: payload
            };
        case REGISTER_FAIL:
            return {
                ...state,
                error: payload
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                accessToken: payload.accessToken,
                refreshToken: payload.refreshToken
            };
        case LOGOUT:
            return {
                error: null,
                isAuthenticated: false,
                accessToken: '',
                refreshToken: ''
            }
        default:
            return state;
    }
}
