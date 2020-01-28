import axios from 'axios';
import user from 'user.js';

export default () => {
    const newAxios = axios.create({
        baseURL: `${process.env.REACT_APP_BASE_URL}backend/api/`,
        headers: { 'Authorization': `Bearer ${user('token') || ''}` },
    });
    return newAxios;
}