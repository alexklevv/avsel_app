import axios from "axios";

const API_URL = 'http://localhost:3000/common';

const getMarks = () => {
    return axios.get(`${API_URL}/marks`);
}

const getModels = (markId) => {
    return axios.get(`${API_URL}/marks/${markId}/models`);
}

const getGenerations = (markId, modelId) => {
    return axios.get(`${API_URL}/marks/${markId}/models/${modelId}/generations`);
}

export default {
    getMarks,
    getModels,
    getGenerations
}