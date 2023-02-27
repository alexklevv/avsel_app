import axios from "axios";
import authHeader from "./AuthHeader";
const API_URL = 'http://localhost:3000/users';

const getCurrentUser = () => {
    return axios.get(`${API_URL}/current`, { headers: authHeader() });
}

export default {
    getCurrentUser
}