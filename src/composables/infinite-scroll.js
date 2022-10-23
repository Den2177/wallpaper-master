import {onMounted, onUnmounted} from "vue";

export const useInfiniteScroll = (requestFunc) => {
    const checkLoadImages = async () => {
        let scrollHeight = Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight,
            document.body.clientHeight, document.documentElement.clientHeight
        );

        const userPoint = document.documentElement.scrollTop + window.innerHeight + 2;
        const bottomOfWindow = scrollHeight <= userPoint;

        if (bottomOfWindow) {
            await requestFunc();
        }
    };

    onMounted(() => window.addEventListener('scroll', checkLoadImages));
    onUnmounted(() => window.removeEventListener('scroll', checkLoadImages));

    return {};
}