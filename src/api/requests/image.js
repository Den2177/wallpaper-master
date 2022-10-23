import axios from "../config/axios-config.js";
import api from "../config/api.js";
import {convertObjToFormData, debounce, mountParametersToQueryString, throttle} from "../../services/functions";

const throttledRequestImagesByName = throttle((imageName, offset) => {
    return axios.get(mountParametersToQueryString(`/top`, {
        name: imageName,
        offset,
    }));
}, api.throttleMs);

const getDebouncedRecommendedImages = debounce((offset) => {
    return axios.get(mountParametersToQueryString('/recommended', {
        offset: offset,
    }));
}, api.throttleMs);

const getDebouncedMyImages = debounce((offset) => {
    return axios.get(mountParametersToQueryString('/images', {
        offset: offset,
    }));
}, api.throttleMs);

const getDebouncedLikedImages = debounce((offset) => {
    return axios.get(mountParametersToQueryString('/liked', {
        offset: offset,
    }));
}, api.throttleMs);


export function requestImagesByName(imageName, offset)  {
    return throttledRequestImagesByName(imageName, offset);
}

export function storeImage(data) {
    return axios.post('/images', convertObjToFormData(data));
}

export function requestMyImages(offset) {
    return getDebouncedMyImages(offset);
}

export function requestRecommendedImages(offset) {
    return getDebouncedRecommendedImages(offset);
}

export function requestLikedImages(offset) {
    return getDebouncedLikedImages(offset);
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
