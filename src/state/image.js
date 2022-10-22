import {defineStore} from "pinia";
import {reactive, ref} from "vue";
import {
    requestDownloadImage,
    requestImagesByName, requestLikedImages,
    requestMyImages,
    requestOneImage,
    requestRecommendedImages,
    requestToggleLike,
    storeImage
} from "../api/requests/image";

import {getExtensionFromMimes} from "../services/functions";
import {useProfileStore} from "./profile.js";
import {useLoaderStore} from "./loader";

export const useImageStore = defineStore('image', () => {
    let images = ref([]);
    let image = reactive({});
    const profileStore = useProfileStore();
    const loaderState = useLoaderStore();

    async function setMyImages() {
        const offset = images.value.length;
        const response = await requestMyImages(offset);
        if (!response) return;

        if (offset !== 0) {
            addNewUniqueImages(response.data.data);

            return;
        }

        images.value = [];
        images.value = response.data.data;
    }

    async function saveImage(data) {
        const response = await storeImage(data);
        images.value.unshift(response.data.data);

        profileStore.updateStatistic();
    }

    async function setSearchedImages(imageName = '') {
        loaderState.show();

        const offset = images.value.length;
        const response = await requestImagesByName(imageName, offset);
        if (!response) return;

        if (offset !== 0) {
            addNewUniqueImages(response.data.data);
            loaderState.hidden();

            return;
        }

        images.value = [];
        images.value = response.data.data;
        loaderState.hidden();
    }

    async function setRecommendedImages() {
        const offset = images.value.length;
        const response = await requestRecommendedImages(offset);

        if (!response) return;

        if (offset !== 0) {
            addNewUniqueImages(response.data.data);
            return;
        }

        images.value = [];
        images.value = response.data.data;
    }

    async function setOneImage(imageId) {
        const response = await requestOneImage(imageId);
        Object.assign(image, response.data.data);
    }

    async function setLikedImages() {
        const offset = images.value.length;
        const response = await requestLikedImages(offset);
        if (!response) return;

        if (offset) {
            addNewUniqueImages(response.data.data);
            return null;
        }

        images.value = [];
        images.value = response.data.data;
    }

    async function downloadImage(image) {
        const response = await requestDownloadImage(image.id);
        const blob = URL.createObjectURL(response.data);
        const anchor = document.createElement('a');
        anchor.style.display = 'none';
        anchor.href = blob;
        anchor.download = `${Date.now()}.${getExtensionFromMimes(image.mime)}`;
        document.body.appendChild(anchor);
        anchor.click();
        window.URL.revokeObjectURL(blob);

        profileStore.updateStatistic();
    }

    async function toggleLike(image) {
        const response = await requestToggleLike(image.id);
        const likeInfo = response.data;
        image.isLiked = likeInfo.isLiked;
        image.likes = likeInfo.likes;

        profileStore.updateStatistic();
    }

    function addNewUniqueImages(newImages) {
        newImages.forEach(imageItem => {
            const containsInStore = images.value.map(img => img.id).includes(imageItem.id);
            if (containsInStore) return null;

            images.value.push(imageItem);
        });
    }

    return {
        image,
        images,

        saveImage,
        toggleLike,
        setMyImages,
        setOneImage,
        downloadImage,
        setLikedImages,
        setSearchedImages,
        setRecommendedImages,
    }
});
