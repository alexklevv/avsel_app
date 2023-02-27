export default function authHeader() {
    const accessToken = localStorage.getItem('ACCESS_TOKEN');
    if (accessToken) {
        return { 'Authorization': `Bearer ${accessToken}` };
    } else {
        return {};
    }
}