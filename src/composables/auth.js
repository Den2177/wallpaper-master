import {ref} from "vue";

export const useAuthFields = () => {
    let userFields = ref({});

    function clearFields() {
        Object.assign(userFields.value, {
            email: "",
            password: "",
            password_repeat: "",
            name: "",
            lastname: "",
        });
    }

    return {
        userFields,
        clearFields,
    }
}