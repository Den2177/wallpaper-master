import {defineStore} from "pinia/dist/pinia";
import {ref} from "vue";
import {requestUserInfo, requestUserImages} from "../api/requests/user";

export const useUserStore = defineStore('user', () => {
    let user = ref({});

    async function setUserInfo(userId) {
        const response = await requestUserInfo(userId);
        const userData = response.data.data;
        Object.assign(user.value, userData);
    }

    return {
        user,
        setUserInfo,
    }
});
