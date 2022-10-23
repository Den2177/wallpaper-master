import {defineStore} from "pinia/dist/pinia";
import {ref} from "vue";
import {requestUserInfo, requestUserImages} from "../api/requests/user";

export const useUserStore = defineStore('user', () => {
    let user = ref({});

    function setUserInfo(userId) {
        requestUserInfo(userId).then(response => {
            const userData = response.data.data;
            Object.assign(user.value, userData);
        });
    }

    return {
        user,
        setUserInfo,
    }
});
