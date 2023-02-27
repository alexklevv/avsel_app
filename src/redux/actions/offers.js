import OffersService from "../services/OffersService";
import {
    CLEAR_GENERATIONS,
    CLEAR_MODELS,
    DELETE_FROM_GALLERY,
    FAIL_RETRIEVING_DATA,
    SET_COVER_IMAGE,
    SET_CURRENT_OFFER,
    SET_GALLERY,
    SET_GENERATIONS,
    SET_MAIN_IMAGE,
    SET_MARKS,
    SET_MODELS,
    SET_OFFERS,
    UPDATE_GALLERY
} from "./types";
import CommonService from "../services/CommonService";
import ImagesService from "../services/ImagesService";

export const getAllOffers = (searchParams) => (dispatch) => {
    return OffersService.getAllOffers(searchParams)
        .then(response => {
            dispatch({
                type: SET_OFFERS,
                payload: response.data.offers
            });
            return Promise.resolve();
        })
        .catch(() => {
            const errorText = 'error retrieving offers'
            dispatch({
                type: FAIL_RETRIEVING_DATA,
                payload: errorText
            });
            return Promise.reject(errorText);
        });
}

export const getOffer = (id) => (dispatch) => {
    return OffersService.getOffer(id).then(
        response => {
            dispatch({
                type: SET_CURRENT_OFFER,
                payload: response.data
            });
            return Promise.resolve();
        },
        error => {
            const errorText = 'error retrieving offer'
            dispatch({
                type: FAIL_RETRIEVING_DATA,
                payload: errorText
            });
            return Promise.reject(errorText);
        }
    )
}

export const getMarks = () => (dispatch) => {
    return CommonService.getMarks().then(
        response => {
            dispatch({
                type: SET_MARKS,
                payload: response.data.marks
            });
            return Promise.resolve();
        },
        error => {
            const errorText = 'error retrieving marks'
            dispatch({
                type: FAIL_RETRIEVING_DATA,
                payload: errorText
            });
            return Promise.reject(errorText);
        }
    )
}

export const getModels = (markId) => (dispatch) => {
    return CommonService.getModels(markId).then(
        response => {
            dispatch({
                type: SET_MODELS,
                payload: response.data.models
            });
            return Promise.resolve(response.data.models);
        },
        error => {
            const errorText = 'error retrieving models'
            dispatch({
                type: FAIL_RETRIEVING_DATA,
                payload: errorText
            });
            return Promise.reject(errorText);
        }
    );
}

export const getGenerations = (markId, modelId) => (dispatch) => {
    return CommonService.getGenerations(markId, modelId).then(
        response => {
            dispatch({
                type: SET_GENERATIONS,
                payload: response.data.generations
            });
            return Promise.resolve();
        },
        error => {
            const errorText = 'error retrieving generations'
            dispatch({
                type: FAIL_RETRIEVING_DATA,
                payload: errorText
            });
            return Promise.reject(errorText);
        }
    );
}

export const getMainImage = (offerId = null) => (dispatch) => {
    return ImagesService.getMainImage(offerId).then(
        response => {
            dispatch({
                type: SET_MAIN_IMAGE,
                payload: response.data.image ? `http://localhost:3000/uploads/${response.data.image.name}` : ''
            });
            return Promise.resolve(response.data.image ? `http://localhost:3000/uploads/${response.data.image.name}` : '');
        },
        error => {
            console.log(error);
            const errorText = 'error retrieving main image';
            dispatch({
                type: FAIL_RETRIEVING_DATA,
                payload: errorText
            });
            return Promise.reject(errorText);
        }
    );
}

export const getCoverImage = (offerId = null) => (dispatch) => {
    return ImagesService.getCoverImage(offerId).then(
        response => {
            dispatch({
                type: SET_COVER_IMAGE,
                payload: response.data.image ? `http://localhost:3000/uploads/${response.data.image.name}` : ''
            });
            return Promise.resolve(response.data.image ? `http://localhost:3000/uploads/${response.data.image.name}` : '');
        },
        error => {
            const errorText = 'error retrieving cover image'
            dispatch({
                type: FAIL_RETRIEVING_DATA,
                payload: errorText
            });
            return Promise.reject(errorText);
        }
    );
}

export const getGallery = (offerId = null) => (dispatch) => {
    return ImagesService.getGallery(offerId).then(
        response => {
            const images =
                response.data.images ?
                    response.data.images.map((item) => {
                        return {
                            uid: item['_id'],
                            name: item.name,
                            status: 'done',
                            url: `http://localhost:3000/uploads/${item.name}`
                        }
                    }) :
                    '';
            dispatch({
                type: SET_GALLERY,
                payload: images
            });
            return Promise.resolve();
        },
        error => {
            const errorText = 'error retrieving gallery'
            dispatch({
                type: FAIL_RETRIEVING_DATA,
                payload: errorText
            });
            return Promise.reject(errorText);
        }
    );
}

export const deleteFromGallery = (image, offerId = null) => (dispatch) => {
    return ImagesService.deleteImageFromGallery(image.uid, offerId).then(
        response => {
            dispatch({
                type: DELETE_FROM_GALLERY,
                payload: image
            });
            return Promise.resolve();
        },
        error => {
            const errorText = 'error deleting image'
            dispatch({
                type: FAIL_RETRIEVING_DATA,
                payload: errorText
            });
            return Promise.reject(errorText);
        }
    );
}

export const setGallery = (images) => (dispatch) => {
    dispatch({
        type: SET_GALLERY,
        payload: images
    });
}

export const updateGallery = (image) => (dispatch) => {
    dispatch({
        type: UPDATE_GALLERY,
        payload: image
    });
}

export const createOffer = (offerData) => (dispatch) => {
    return OffersService.createOffer(offerData)
        .then(() => {
            return Promise.resolve();
        })
        .catch((error) => {
            const errorText = error.response.data.message[0];
            return Promise.reject(errorText);
        });
}

export const editOffer = (offerData, offerId) => (dispatch) => {
    return OffersService.editOffer(offerData, offerId)
        .then(() => {
            return Promise.resolve();
        })
        .catch((error) => {
            const errorText = error.response.data.message[0];
            return Promise.reject(errorText);
        });
}

export const updateOfferStatus = (offerId, statusObjectId) => (dispatch) => {
    return OffersService.updateOfferStatus(offerId, statusObjectId)
        .then(() => {
            return Promise.resolve();
        })
        .catch((error) => {
            const errorText = error.response.data.message[0];
            return Promise.reject(errorText);
        });
}

export const deleteOffer = (offerId) => (dispatch) => {
    return OffersService.deleteOffer(offerId)
        .then(() => {
            return Promise.resolve();
        })
        .catch((error) => {
            const errorText = error.response.data.message;
            return Promise.reject(errorText);
        });
}

export const clearModels = () => (dispatch) => {
    dispatch({
        type: CLEAR_MODELS
    });
}

export const clearGenerations = () => (dispatch) => {
    dispatch({
        type: CLEAR_GENERATIONS
    });
}