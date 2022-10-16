import axios from "../config/axios-config.js";
import api from "../config/api.js";
import {convertObjToFormData, mountParametersToQueryString, throttle} from "../../services/api_service";

const throttledRequestImagesByName = throttle((imageName) => {
    return axios.get(mountParametersToQueryString('/top', {
        name: imageName,
    }));
}, api.throttleMs);

export function requestImagesByName(imageName)  {
    return throttledRequestImagesByName(imageName);
}

export function storeImage(data) {
    return axios.post('/images', convertObjToFormData(data));
}

export function requestMyImages() {
    return axios.get('/images');
}

export function requestRecommendedImages() {
    return axios.get('/recommended');
}

export function requestOneImage(imageId) {
    return axios.get(`/images/${imageId}`);
}

export function requestDownloadImage(imageId) {
    return axios.get(`/images/${imageId}/download`, {
        responseType: "blob",
    });
}

export function requestToggleLike(imageId) {
    return axios.get(`/images/${imageId}/like`);
}

export function requestLikedImages() {
    return axios.get(`/liked`);
}