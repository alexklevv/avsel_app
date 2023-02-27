import axios from "axios";
const API_URL = 'http://localhost:3000/auth';

const login = (loginData) => {
    return axios.post(`${API_URL}/signin`, {
        user: {
            email: loginData.email,
            password: loginData.password,
        }
    });
}

const registration = (regData) => {
    return axios.post(`${API_URL}/signup`, {
        firstName: regData.firstName,
        lastName: regData.lastName,
        phoneNumber: regData.phoneNumber,
        email: regData.email,
        password: regData.password,
    });
}

export default {
    login,
    registration
}