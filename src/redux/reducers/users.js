import {
    SET_CURRENT_USER
} from "../actions/types";

const initialState = {
    error: null,
    current: null,
}

export default function (state = initialState, action) {
    const {type, payload} = action

    switch (type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                current: payload
            };
        default:
            return state;
    }
}
