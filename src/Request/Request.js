// library axios
import axios from 'axios';

const request = axios.create({
    baseURL: 'https://tiktok.fullstack.edu.vn/api/',
});

const api = axios.create({
    baseURL: 'https://fakestoreapi.com/',
});

export { request, api };
