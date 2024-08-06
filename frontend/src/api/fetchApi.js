// src/api/fetchApi.js

import api from './api';

const finnhub = {
    fetchCountry: async () => {
        try {
            const response = await api.get('/api/finnhub/country');
            return response.data;
        }
        catch (error) {
            throw error.response;
        }
    },
    news: async () => {
        try {
            const response = await api.get(`/api/finnhub/marketStatus`);
            console.log(response);
            return response.data;
        } catch (error) {
            throw error.response;
        }
    },
    symbolSearch: async (symbol) => {
        try {
            const response = await api.get(`/api/finnhub/symbolsearch?symbol=${symbol}`);
            console.log(response);
            return response.data.result;
        } catch (error) {
            throw error.response;
        }
    }
};

export default finnhub;
