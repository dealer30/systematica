import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:3000',
})

export const authapi = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
    }
})
