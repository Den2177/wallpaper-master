import {ref} from "vue";
let notifications = ref([]);
const LIFETIME = 4000;

export const useNotification = () => {

    function showNotification({message, isError = false }) {
        const notificationId = Date.now();

        notifications.value.push({
            id: notificationId,
            title: isError ? 'Error!' : 'Success',
            message: message,
            isError: isError,
        });

        setTimeout(() => {
            notifications.value = notifications.value.filter(notification => notification.id !== notificationId);
        }, LIFETIME)
    }

    return {
        showNotification,
        notifications
    }
}