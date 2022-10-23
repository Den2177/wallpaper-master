import {onMounted, onUnmounted} from "vue";
import {useLoaderStore} from "../state/loader";

export const useInfiniteScroll = (requestFunc) => {
    const loaderState = useLoaderStore();

    const checkLoadImages = async () => {
        let scrollHeight = Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight,
            document.body.clientHeight, document.documentElement.clientHeight
        );

        const userPoint = document.documentElement.scrollTop + window.innerHeight + 5;
        const bottomOfWindow = scrollHeight <= userPoint;
        if (bottomOfWindow) {
            loaderState.show();
            await requestFunc();
            loaderState.hidden();
        }
    };

    onMounted(() => window.addEventListener('scroll', checkLoadImages));
    onUnmounted(() => window.removeEventListener('scroll', checkLoadImages));

    return {};
}