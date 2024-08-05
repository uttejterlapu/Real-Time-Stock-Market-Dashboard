// src/api/authService.js

import api from './api';

const authService = {
    signup: async (name, email, password) => {
        try {
            const response = await api.post('api/auth/signup', { name, email, password });
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    login: async (email, password) => {
        try {
            const response = await api.post('api/auth/login', { email, password }, {withCredentials: true});
            console.log(response);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    logout: async (email, password) => {
        try {
            document.cookie = 'jwtToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
        } catch (error) {
            throw error.response.data;
        }
    },
};

export default authService;
