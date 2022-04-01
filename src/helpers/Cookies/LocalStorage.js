export function setCookies(key, value) {
    console.log(key,value)
    localStorage.setItem(key, value)
}
export function getCurrentUser() {
    try {
        const jwt = localStorage.getItem('token');
        return jwt;
    } catch (ex) {
        return null;
    }
}

export default {
    getCurrentUser,
    setCookies
}