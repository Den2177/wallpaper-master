import {defineStore} from "pinia";
import {computed, reactive, ref} from "vue";
import {clearTokenFromStorage, pushTokenToStorage} from "../storage/user.js";
import {login, register, requestAuthedUser} from "../api/requests/auth";
import axios from "../api/config/axios-config.js";
import {saveStatisticToStorage} from "../storage/statistic.js";

export const useAuthStore = defineStore('auth',  () => {
    console.log('store installed');
    let user = reactive({});
    let isAuthed = computed(() => !!user.email);
    let userInfo = computed(() => {
        return {
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            avatar: user.avatar,
        }
    });

    async function userLogin(data) {
        let response = await login(data);
        const token = response.data?.data.token;

        pushTokenToStorage(token);
        axios.updateToken();

        let userData = await requestAuthedUser();
        Object.assign(user, userData.data.data);
    }

    async function userRegister(data) {
        const response = await register(data)
        const token = response.data?.data.token;
        pushTokenToStorage(token);
        axios.updateToken();

        const userData = await setAuthedUser();
        saveStatisticToStorage(userData.statistic);
    }

    async function logout() {
        Object.assign(user, {});
        clearTokenFromStorage();
    }

    async function setAuthedUser() { //return authed user or null
        let response = await requestAuthedUser();
        let userData = response.data.data;

        Object.assign(user, userData);

        return userData;
    }

    return {
        user,
        isAuthed,
        userInfo,

        logout,
        userLogin,
        userRegister,
        setAuthedUser,
    }
});
