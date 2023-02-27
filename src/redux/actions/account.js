import {
    ADD_TO_FAVOURITE,
    FAIL_RETRIEVING_DATA_IN_PROFILE,
    REMOVE_FROM_FAVOURITE,
    SET_FAVOURITES_IN_PROFILE,
    SET_OFFERS_IN_PROFILE
} from "./types";
import AccountService from "../services/AccountService";

export const getOffers = (status) => (dispatch) => {
    return AccountService.getOffers(status)
        .then(response => {
            dispatch({
                type: SET_OFFERS_IN_PROFILE,
                payload: response.data.offers
            });
            return Promise.resolve();
        })
        .catch(() => {
            const errorText = `error retrieving ${status} offers`;
            dispatch({
                type: FAIL_RETRIEVING_DATA_IN_PROFILE,
                payload: errorText
            });
            return Promise.reject(errorText);
        });
}

export const getFavouriteOffers = () => (dispatch) => {
    return AccountService.getFavouriteOffers()
        .then(response => {
            dispatch({
                type: SET_FAVOURITES_IN_PROFILE,
                payload: response.data
            });
            return Promise.resolve();
        })
        .catch(() => {
            const errorText = `error retrieving favourite offers`;
            dispatch({
                type: FAIL_RETRIEVING_DATA_IN_PROFILE,
                payload: errorText
            });
            return Promise.reject(errorText);
        });
}

export const addOfferToFavourites = (offerObjectId) => (dispatch) => {
    return AccountService.addOfferToFavourites(offerObjectId)
        .then(response => {
            dispatch({
                type: ADD_TO_FAVOURITE
            });
            return Promise.resolve();
        })
        .catch(() => {
            const errorText = `could not add offer to favourites`;
            return Promise.reject(errorText);
        });
}
export const removeOfferFromFavourites = (offerObjectId) => (dispatch) => {
    return AccountService.removeOfferFromFavourites(offerObjectId)
        .then(response => {
            dispatch({
                type: REMOVE_FROM_FAVOURITE
            });
            return Promise.resolve();
        })
        .catch(() => {
            const errorText = `could not add offer to favourites`;
            return Promise.reject(errorText);
        });
}