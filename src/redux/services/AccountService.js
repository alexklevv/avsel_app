import axios from "axios";
import authHeader from "./AuthHeader";
const API_URL = 'http://localhost:3000/account';

const getOffers = (status) => {
    return axios.get(`${API_URL}/offers/${status}`, {headers: authHeader()});
}

const getFavouriteOffers = () => {
    return axios.get(`${API_URL}/favourites`, {headers: authHeader()});
}

const addOfferToFavourites = (offerObjectId) => {
    return axios.post(`${API_URL}/favourites`, {favourite: {offerObjectId}}, {headers: authHeader()});
}

const removeOfferFromFavourites = (offerObjectId) => {
    return axios.delete(`${API_URL}/favourites`, {headers: authHeader(), data: {favourite: {offerObjectId}}});
}

export default {
    getOffers,
    getFavouriteOffers,
    addOfferToFavourites,
    removeOfferFromFavourites
}