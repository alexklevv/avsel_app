import axios from "axios";
import authHeader from "./AuthHeader";
const API_URL = 'http://localhost:3000/cars';

const getAllOffers = (searchParams) => {
    let queryParams = '';
    if(searchParams.markId || searchParams.modelId || searchParams.generationId){
        queryParams += '?';
        queryParams += searchParams.markId ? ('markId=' + searchParams.markId) : '';
        queryParams += searchParams.modelId ? ('&modelId=' + searchParams.modelId) : '';
        queryParams += searchParams.generationId ? ('&generationId=' + searchParams.generationId) : '';
    }
    console.log(queryParams, searchParams);
    return axios.get(`${API_URL}${queryParams}`, { headers: authHeader() });
}

const getOffer = (id) => {
    return axios.get(`${API_URL}/${id}`, { headers: authHeader() });
}

const createOffer = (offerData) => {
    return axios.post(`${API_URL}`, { offer: {...offerData}}, { headers: authHeader() });
}

const editOffer = (offerData, offerId) => {
    return axios.patch(`${API_URL}/${offerId}`, { offer: {...offerData}}, { headers: authHeader() });
}

const updateOfferStatus = (offerId, statusObjectId) => {
    return axios.patch(`${API_URL}/${offerId}`, { offer: {statusObjectId: statusObjectId}}, { headers: authHeader() });
}

const deleteOffer = (offerId) => {
    return axios.delete(`${API_URL}/${offerId}`, { headers: authHeader() });
}

export default {
    getAllOffers,
    getOffer,
    createOffer,
    editOffer,
    updateOfferStatus,
    deleteOffer
}