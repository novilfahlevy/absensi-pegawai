import axios from 'axios';
import user from 'user.js';

export default () => {
    const newAxios = axios.create({
        baseURL: `http://127.0.0.1:8000/api/`,
        headers: { 'Authorization': `Bearer ${user('token') || ''}` },
    });
    return newAxios;
}