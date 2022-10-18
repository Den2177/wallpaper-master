import {defineStore} from "pinia/dist/pinia";
import {ref} from "vue";
import {requestUserInfo, requestUserImages} from "../api/requests/user";

export const useUserStore = defineStore('user', () => {
    let user = ref({});
    let images = ref([]);

    function setUserInfo(userId) {
        requestUserInfo(userId).then(response => {
            const userData = response.data.data;
            Object.assign(user.value, userData);

            requestUserImages(userId).then(response => {
                const userImages = response.data.data;
                Object.assign(images.value, userImages);
            });
        });
    }

    return {
        user,
        images,

        setUserInfo,
    }
});
