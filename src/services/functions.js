export function formatErrorMessage(message) {

    if (!message) return 'error';

    let finalMessage = '';

    for (let field in message) {
        finalMessage += message[field].join('<br>');
        finalMessage += '<br>';
    }

    return finalMessage;
}

export function convertObjToFormData(data, method = 'post') {
    const formdata = new FormData();

    if (method !== 'post') {
        formdata.append('_method', method);
    }

    const isArray = (value) => Array.isArray(value);
    const isObject = (value) => typeof value === 'object';
    const isFile = (value) => value instanceof File;

    const isIterable = (value) => isArray(value) || (isObject(value) && !isFile(value));

    for (let field in data) {
        if (isIterable(data[field])) {
            const iterable = data[field];

            for (const iterableField in iterable) {
                formdata.append(`${field}[]`, iterable[iterableField].name);
            }

            continue;
        }

        formdata.append(field, data[field]);
    }

    return formdata;
}

export function mountParametersToQueryString(query, paramsObj) {
    return query + Object.entries(paramsObj)
        .reduce((finalString, [key, value], index) => {
            return finalString += (!index ? '?' : '&') + key + '=' + value;
        }, '');
}

export function throttle(func, ms) {
    let isThrottled = false,
        savedArgs,
        savedThis;

    const dataController = {};

    async function wrapper() {

        if (isThrottled) {
            savedArgs = arguments;
            savedThis = this;

            return new Promise((res, rej) => {
                dataController.resolve = res;
                dataController.reject = rej;
            });
        }

        isThrottled = true;

        setTimeout(function () {
            isThrottled = false;

            if (savedArgs) {
                dataController.resolve(wrapper.apply(savedThis, savedArgs));
                savedArgs = savedThis = null;
            }
        }, ms);

        return func.apply(this, arguments);
    }

    return wrapper;
}

export const debounce = (func, ms) => {
    let isDebounced = false;

    return function() {
        if (isDebounced) {
            return null;
        }

        isDebounced = true;

        setTimeout(() => {
            isDebounced = false;
        }, ms)

        return func.apply(this, arguments);
    }
}

export const loadPage = (pageName) => {
    return () => import(`../views/pages/${pageName}.vue`);
}

export const getExtensionFromMimes = (mime) => {
    return mime.split('/')[1];
}

export const downloadImageByData = (data, image) => {
    const blob = URL.createObjectURL(data);
    const anchor = document.createElement('a');
    anchor.style.display = 'none';
    anchor.href = blob;
    anchor.download = `${Date.now()}.${getExtensionFromMimes(image.mime)}`;
    document.body.appendChild(anchor);
    anchor.click();
    window.URL.revokeObjectURL(blob);
}
