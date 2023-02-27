import {
    ADD_TO_FAVOURITE,
    CLEAR_GENERATIONS,
    CLEAR_MODELS,
    DELETE_FROM_GALLERY,
    FAIL_RETRIEVING_DATA, REMOVE_FROM_FAVOURITE,
    SET_COVER_IMAGE,
    SET_CURRENT_OFFER,
    SET_GALLERY,
    SET_GENERATIONS,
    SET_MAIN_IMAGE,
    SET_MARKS,
    SET_MODELS,
    SET_OFFERS,
    UPDATE_GALLERY
} from "../actions/types";

const initialState = {
    error: null,
    list: null,
    current: null,
    marks: null,
    models: null,
    generations: null,
    mainImage: null,
    coverImage: null,
    gallery: null
}

export default function (state = initialState, action) {
    const {type, payload} = action

    switch (type) {
        case FAIL_RETRIEVING_DATA:
            return {
                ...state,
                error: payload
            };
        case SET_OFFERS:
            return {
                ...state,
                list: payload
            };
        case SET_CURRENT_OFFER:
            return {
                ...state,
                current: payload
            };
        case SET_MARKS:
            return {
                ...state,
                marks: payload
            };
        case SET_MODELS:
            return {
                ...state,
                models: payload
            };
        case SET_GENERATIONS:
            return {
                ...state,
                generations: payload
            };
        case SET_MAIN_IMAGE:
            return {
                ...state,
                mainImage: payload
            };
        case SET_COVER_IMAGE:
            return {
                ...state,
                coverImage: payload
            };
        case SET_GALLERY:
            return {
                ...state,
                gallery: payload
            };
        case UPDATE_GALLERY:
            return {
                ...state,
                gallery: [...state.gallery, payload]
            };
        case DELETE_FROM_GALLERY:
            return {
                ...state,
                gallery: [...state.gallery.filter(image => image !== payload)]
            };
        case CLEAR_MODELS:
            return {
                ...state,
                models: null
            };
        case CLEAR_GENERATIONS:
            return {
                ...state,
                generations: null
            };
        case ADD_TO_FAVOURITE:
            return {
                ...state,
                current: {
                    ...state.current,
                    isFavourite: true
                }
            };
        case REMOVE_FROM_FAVOURITE:
            return {
                ...state,
                current: {
                    ...state.current,
                    isFavourite: false
                }
            };
        default:
            return state;
    }
}
