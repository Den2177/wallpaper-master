export const saveLoadPoint = (cord) => {
    localStorage.setItem('cord', cord);

    return true;
}

export const getLoadPoint = () => {
    return +localStorage.getItem('cord');
}