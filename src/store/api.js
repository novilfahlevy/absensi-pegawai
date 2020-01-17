import axios from 'axios';

export default () => {
    const token = localStorage.getItem('auth') && JSON.parse(atob(localStorage.getItem('auth'))).token;
    const newAxios = axios.create({
        baseURL: `http://127.0.0.1:8000/api/`,
        headers: { 'Authorization': `Bearer ${token || ''}` },
    });
    return newAxios;
}