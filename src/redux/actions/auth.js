import AuthService from "../services/AuthService";
import {LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT} from "./types";

export const login = (loginData) => (dispatch) => {
    return AuthService.login(loginData)
        .then(response => {
            console.log('response in login dispatcher', response);
            localStorage.setItem("ACCESS_TOKEN", response.data?.accessToken);
            localStorage.setItem("REFRESH_TOKEN", response.data?.refreshToken);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: response.data
            });
            return Promise.resolve();
        })
        .catch((error) => {
            const errorText = error.response.status === 403 ? 'email or password is invalid' : error.response.data.message[0];
            dispatch({
                type: LOGIN_FAIL,
                payload: errorText
            });
            return Promise.reject(errorText);
        });
}

export const registration = (regData) => (dispatch) => {
    return AuthService.registration(regData).then(
        response => {
            return Promise.resolve(response.data);
        },
        error => {
            return Promise.reject(error);
        }
    )
}

export const logout = () => (dispatch) => {
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("REFRESH_TOKEN");
    dispatch({
        type: LOGOUT
    });
}