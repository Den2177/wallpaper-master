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
        images.value = [];

        const response = await requestMyImages();
        images.value = response.data.data;
    }

    function saveImage(data) {
        storeImage(data).then(response => {
            images.value.unshift(response.data.data);

            profileStore.updateStatistic();
        });
    }

    async function setSearchedImages(imageName = '') {
        images.value = [];

        loaderState.show();
        const response = await requestImagesByName(imageName);
        images.value = response.data.data;
        loaderState.hidden();
    }

    function setRecommendedImages() {
        images.value = [];
        return requestRecommendedImages()
            .then(response => images.value = response.data.data);
    }

    function setOneImage(imageId) {
        return requestOneImage(imageId).then(response => {
            Object.assign(image, response.data.data);
        });
    }

    function setLikedImages() {
        images.value = [];

        return requestLikedImages().then(response => images.value = response.data.data);
    }

    function downloadImage(image) {
        requestDownloadImage(image.id).then(response => {
            const blob = URL.createObjectURL(response.data);
            const anchor = document.createElement('a');
            anchor.style.display = 'none';
            anchor.href = blob;
            anchor.download = `${Date.now()}.${getExtensionFromMimes(image.mime)}`;
            document.body.appendChild(anchor);
            anchor.click();
            window.URL.revokeObjectURL(blob);

            profileStore.updateStatistic();
        });
    }

    function toggleLike(image) {
        requestToggleLike(image.id).then(response => {
            const likeInfo = response.data;
            image.isLiked = likeInfo.isLiked;
            image.likes = likeInfo.likes;

            profileStore.updateStatistic();
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
