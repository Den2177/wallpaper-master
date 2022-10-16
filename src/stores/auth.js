import {defineStore} from "pinia";
import {computed, reactive} from "vue";
import {clearUserFromStorage, getUserFromStorage, pushUserToStorage} from "../storage/user.js";
import {login, register} from "../api/requests/auth";
import axios from "../api/config/axios-config.js";
import {saveStatisticToStorage} from "../storage/statistic.js";

export const useAuthStore = defineStore('auth', () => {
    let user = reactive(getUserFromStorage());
    let isAuthed = computed(() => !!user?.token);

    function userLogin(data) {
        return new Promise((resolve, reject) => {
            login(data)
                .then(res => {
                    const userInfo = res.data?.data;
                    pushUserToStorage(userInfo);
                    Object.assign(user, userInfo);
                    axios.updateToken();
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                })
        })
    }

    function userRegister(data) {
        return new Promise((resolve, reject) => {
            register(data)
                .then(res => {
                    const userInfo = res.data?.data;
                    pushUserToStorage(userInfo);
                    Object.assign(user, userInfo);
                    saveStatisticToStorage(user.statistic);
                    axios.updateToken();

                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                })
        })
    }

    function logout() {
        Object.assign(user, {});
        clearUserFromStorage();
        return new Promise((resolve, reject) => {
            resolve(true);
        });
    }

    return {
        user,
        isAuthed,

        logout,
        userLogin,
        userRegister,
    }
});
