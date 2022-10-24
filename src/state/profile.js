import {requestMyStatistic, requestProfileUpdate} from "../api/requests/profile";
import {saveStatisticToStorage} from "../storage/statistic";
import {useAuthStore} from "./auth";
import {defineStore} from "pinia/dist/pinia";

export const useProfileStore = defineStore('profile', () => {
    const authStore = useAuthStore();

    async function updateStatistic() {
        const response = await requestMyStatistic();
        const statistic = authStore.user.statistic;
        Object.assign(statistic, response.data.data);
        saveStatisticToStorage(statistic);
    }

    async function updateProfile(data) {
        const userInfo = await requestProfileUpdate(data);
        await authStore.setAuthedUser();
    }

    return {
        updateProfile,
        updateStatistic
    }
});