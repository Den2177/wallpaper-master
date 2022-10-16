export function formatErrorMessage(message) {

    if (!message) return 'error';

    let finalMessage = '';

    for (let field in message) {
        finalMessage += message[field].join('<br>');
        finalMessage += '<br>';
    }

    return finalMessage;
}

export function convertObjToFormData(data) {
    const formdata = new FormData();

    const isArray = (value) => Array.isArray(value);
    const isObject = (value) => typeof value === 'object';
    const isFile = (value) => value instanceof File;

    const isIterable = (value) => isArray(value) || (isObject(value) && !isFile(value));
    for (let field in data) {
        console.log(field);
        console.log(data[field]);
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

    function wrapper() {

        if (isThrottled) {
            savedArgs = arguments;
            savedThis = this;
            return null;
        }

        isThrottled = true;

        setTimeout(function () {
            isThrottled = false;

            if (savedArgs) {
                wrapper.apply(savedThis, savedArgs);
                savedArgs = savedThis = null;
            }
        }, ms);

        console.log('wrapper active');

        return func.apply(this, arguments);
    }

    return wrapper;
}

