import axios from 'axios';
import api from "./api.js";
import {getTokenFromStorage} from "../../storage/user.js";

const instance = axios.create({
    baseURL: api.url,
});

instance.updateToken = function() {
    this.defaults.headers.common['Authorization'] = "Bearer " + getTokenFromStorage();
}

instance.updateToken();

export default instance;