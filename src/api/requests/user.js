import axios from "../config/axios-config";

export const requestUserInfo = (userId) => {
    return axios.get(`/users/${userId}`);
}

export const requestUserImages = (userId) => {
    return axios.get(`/users/${userId}/images`);
}