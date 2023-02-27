import axios from "axios";
import authHeader from "./AuthHeader";
const API_URL = 'http://localhost:3000/images';

const getMainImage = (offerId = null) => {
    console.log(offerId);
    return axios.get(`${API_URL}/cars${offerId ? `/${offerId}` : ''}/main`, { headers: authHeader() });
}

const getCoverImage = (offerId = null) => {
    return axios.get(`${API_URL}/cars${offerId ? `/${offerId}` : ''}/cover`, { headers: authHeader() });
}

const getGallery = (offerId = null) => {
    return axios.get(`${API_URL}/cars${offerId ? `/${offerId}` : ''}`, { headers: authHeader() });
}

const deleteImageFromGallery = (imageObjectId, offerId = null) => {
    return axios.delete(`${API_URL}/cars${offerId ? `/${offerId}` : ''}/${imageObjectId}`, { headers: authHeader() })
}

export default {
    getMainImage,
    getCoverImage,
    getGallery,
    deleteImageFromGallery
}