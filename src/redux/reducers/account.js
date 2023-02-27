import {
    ADD_TO_FAVOURITE,
    FAIL_RETRIEVING_DATA_IN_PROFILE,
    REMOVE_FROM_FAVOURITE, SET_FAVOURITES_IN_PROFILE,
    SET_OFFERS_IN_PROFILE
} from "../actions/types";

const initialState = {
    error: null,
    offers: null,
    favourites: null
}

export default function (state = initialState, action) {
    const {type, payload} = action

    switch (type) {
        case FAIL_RETRIEVING_DATA_IN_PROFILE:
            return {
                ...state,
                error: payload
            };
        case SET_OFFERS_IN_PROFILE:
            return {
                ...state,
                offers: payload
            };
        case SET_FAVOURITES_IN_PROFILE:
            return {
                ...state,
                favourites: payload
            };
        default:
            return state;
    }
}
