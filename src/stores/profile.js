import {requestMyStatistic} from "../api/requests/profile";
import {saveStatisticToStorage} from "../storage/statistic";
import {useAuthStore} from "./auth";
import {defineStore} from "pinia/dist/pinia";

export const useProfileStore = defineStore('profile', () => {
    const authStore = useAuthStore();

    function updateStatistic() {
        requestMyStatistic().then(response => {
            const statistic = authStore.user.statistic;
            Object.assign(statistic, response.data.data);
            saveStatisticToStorage(statistic);
        });
    }

    return {
        updateStatistic
    }
});