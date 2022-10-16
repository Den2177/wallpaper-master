export const getExtensionFromMimes = (mime) => {
    return mime.split('/')[1];
}