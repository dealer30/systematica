import axios from 'axios';

export const api = axios.create({
    baseURL: "http://localhost:3001",
})

export const authapi = axios.create({
    baseURL: "http://localhost:3001",
    headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
    }
})
