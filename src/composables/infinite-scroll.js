import {onMounted, onUnmounted} from "vue";
import {useLoaderStore} from "../state/loader";
import {getLoadPoint, saveLoadPoint} from "../storage/load-point";
let loadPoint = 0;

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
        if (bottomOfWindow && userPoint) {
            loaderState.show();
            await requestFunc();
            loaderState.hidden();
        }
    };

    onMounted(() => window.addEventListener('scroll', checkLoadImages));
    onUnmounted(() => window.removeEventListener('scroll', checkLoadImages));

    return {};
}