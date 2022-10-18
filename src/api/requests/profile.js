import axios from "../config/axios-config.js";
import {convertObjToFormData} from "../../services/functions";

export const requestMyStatistic = () => {
    return axios.get('/my-statistic');
}

export const requestProfileUpdate = (data) => {
    return axios.post('/users/profile', convertObjToFormData(data, 'patch'));
}