import {defineStore} from "pinia/dist/pinia";
import {ref} from "vue";

export const useLoaderStore = defineStore('loader', () => {
    const isActive = ref(false);

    function show() {
        isActive.value = true;
    }

    function hidden() {
        isActive.value = false;
    }

    return {
        isActive,

        show,
        hidden,
    }
})