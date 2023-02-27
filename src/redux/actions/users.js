import UsersService from "../services/UsersService";
import {SET_CURRENT_USER} from "./types";

export const getCurrentUser = () => (dispatch) => {
    return UsersService.getCurrentUser().then(
        response => {
            dispatch({
                type: SET_CURRENT_USER,
                payload: response.data.user
            });
            return Promise.resolve();
        },
        error => {
            const errorText = 'error retrieving current user'
            return Promise.reject(errorText);
        }
    )
}