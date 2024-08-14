// src/api/quote.js
import api from './api';

const quoteApi = {
    quote: async () => {
        try {
            const response = await api.get('/api/apininjas/quote');
            return response.data;
        } catch (error) {
            throw error.response;
        }
    },
    symbol: async (name) => {
        try {
            const response = await api.get(`/api/apininjas/logo?name=${name}`);
            return response.data;
        } catch (error) {
            throw error.response;
        }
    }
};

export default quoteApi;