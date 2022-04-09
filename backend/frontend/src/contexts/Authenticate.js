export function authenticate(cookiez) {
    if (cookiez == 'true') {
        return true;
    }
    return false;
}

export const convertDate = (date) => {
    const formattedDate = new Date(date);
    return formattedDate.toLocaleString('pl-PL');
}

