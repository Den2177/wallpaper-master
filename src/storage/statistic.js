export const saveStatisticToStorage = (statistic) => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
        return false;
    }

    user.statistic = statistic;

    localStorage.setItem('user', JSON.stringify(user));

    return true;
}

/*
export const getStatisticFromStorage = () => {
    return JSON.parse(localStorage.getItem('user'))?.statistic;
}*/
