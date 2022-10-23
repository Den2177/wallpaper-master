import axios from "../config/axios-config";
import {mountParametersToQueryString} from "../../services/functions";

export const requestUserInfo = (userId) => {
    return axios.get(`/users/${userId}`);
}

export const requestUserImages = (userId, offset) => {
    return axios.get(mountParametersToQueryString(`/users/${userId}/images`, {
        offset
    }));
}