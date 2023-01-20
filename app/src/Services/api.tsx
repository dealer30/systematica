import axios from 'axios';

// Para realizar chamadas para a API, estamos utilizando a biblioteca axios.
// Essa biblioteca é uma alternativa para o fetch API, que é nativo do JavaScript.
// Ela é mais simples de utilizar e possui algumas funcionalidades extras.

export const api = axios.create({
    baseURL: "http://localhost:3001",
})

export const authapi = axios.create({
    baseURL: "http://localhost:3001",
    headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
    }
})
