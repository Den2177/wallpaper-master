export const pushTokenToStorage = (token) => {
    localStorage.setItem('token', token);

    return true;
}

export const clearUserFromStorage= () => {
    localStorage.removeItem('token');

    return true;
}

export const getTokenFromStorage = () => {
    return localStorage.getItem('token');
}