import {defineStore} from "pinia";
import {reactive, ref, watch} from "vue";
import {
    requestDeleteImage,
    requestDownloadImage,
    requestImagesByName, requestLikedImages,
    requestMyImages,
    requestOneImage,
    requestRecommendedImages,
    requestToggleLike,
    requestStoreImage
} from "../api/requests/image";
import router from "../router";
import {downloadImageByData} from "../services/functions";
import {useProfileStore} from "./profile.js";
import {useLoaderStore} from "./loader";
import {requestUserImages} from "../api/requests/user";

export const useImageStore = defineStore('image', () => {
    const profileStore = useProfileStore();
    const loaderState = useLoaderStore();

    const images = ref([]);
    const image = reactive({});
    const searchValue = ref('');

    watch(searchValue, setTopImages);

    async function setMyImages() {
        await setImages(requestMyImages);
    }

    async function setUserImages(userId) {
        await setImages(requestUserImages.bind(null, userId, 0));
    }

    async function setTopImages() {
        await setImages(requestImagesByName.bind(null, 0, searchValue.value));
    }

    function setTopImagesByTag(tagName) {
        searchValue.value = tagName;
    }

    async function setRecommendedImages() {
        await setImages(requestRecommendedImages);
    }

    async function setLikedImages() {
        await setImages(requestLikedImages);
    }

    async function setOneImage(imageId) {
        const response = await requestOneImage(imageId);
        Object.assign(image, response.data.data);
    }

    async function loadMoreMyImages() {
        await loadAdditionalImages(requestMyImages);
    }

    async function loadMoreTopImages() {
        await loadAdditionalImages(requestImagesByName, searchValue.value);
    }

    async function loadMoreRecommendedImages() {
        await loadAdditionalImages(requestRecommendedImages);
    }

    async function loadMoreLikedImages() {
        await loadAdditionalImages(requestLikedImages);
    }

    async function saveImage(data) {
        const response = await requestStoreImage(data);
        images.value.unshift(response.data.data);

        profileStore.updateStatistic();
    }

    async function deleteImage(imageId) {
        const response = await requestDeleteImage(imageId);

        if (response.data.success) {
            images.value = images.value.filter(imageObj => imageObj.id !== imageId);

            router.push('/profile');
        }
    }

    async function downloadImage(image) {
        const response = await requestDownloadImage(image.id);
        downloadImageByData(response.data, image);

        profileStore.updateStatistic();
    }

    async function toggleLike(image) {
        const response = await requestToggleLike(image.id);
        const likeInfo = response.data;
        image.isLiked = likeInfo.isLiked;
        image.likes = likeInfo.likes;

        profileStore.updateStatistic();
    }

    async function loadAdditionalImages(requestFunc, imageName) {
        const offset = images.value.length;
        const response = await requestFunc(offset, imageName);

        if (response === null) return;

        addNewUniqueImages(response.data.data);
    }

    async function setImages(requestFunc) {
        loaderState.show();

        images.value = [];
        const response = await requestFunc();
        images.value = response.data.data;

        loaderState.hidden();
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
        searchValue,

        saveImage,
        toggleLike,
        setMyImages,
        setOneImage,
        deleteImage,
        setTopImages,
        setUserImages,
        downloadImage,
        setLikedImages,
        loadMoreMyImages,
        setTopImagesByTag,
        loadMoreTopImages,
        loadMoreLikedImages,
        setRecommendedImages,
        loadMoreRecommendedImages,
    }
});
