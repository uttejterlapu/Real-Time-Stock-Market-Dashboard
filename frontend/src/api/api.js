// src/api/api.js

import axios from 'axios';
import BACKENDURL from '../constant'
const api = axios.create({
    baseURL: BACKENDURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
