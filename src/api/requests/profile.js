import axios from "../config/axios-config.js";

export const requestMyStatistic = () => {
    return axios.get('/my-statistic');
}

