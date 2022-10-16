export const getUserFromStorage= () => {
    return JSON.parse(localStorage.getItem('user')) || {};
}

export const pushUserToStorage = (user) => {
    localStorage.setItem('user', JSON.stringify(user));

    return true;
}

export const clearUserFromStorage= () => {
    localStorage.removeItem('user');

    return true;
}

export const getTokenFromStorage= () => {
    return JSON.parse(localStorage.getItem('user'))?.token ?? null; 
}