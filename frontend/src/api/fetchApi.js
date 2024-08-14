// src/api/fetchApi.js

import api from './api';

const finnhub = {
    fetchCountry: async () => {
        console.log(api,'jsadjasvj')
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
            const response = await api.get(`/api/finnhub/marketnews`);
            console.log(response);
            
            return response.data;
        } catch (error) {
            throw error.response;
        }
    },
    symbolSearch: async (symbol) => {
        try {
            const response = await api.get(`/api/finnhub/symbolsearch?symbol=${symbol}`);
            return response.data.result;
        } catch (error) {
            throw error.response;
        }
    },
    companybasicfinancials: async()=>{
        try{
            const response = await api.get(`/api/finnhub/companybasicfinancials`);
            return response;
        } catch (error) {
            throw error.response;
        }
    },
    companyprofile2: async()=>{
        try{
            const response = await api.get(`/api/finnhub/companyprofile2`);
            return response.data;
        } catch (error) {
            throw error.response;
        }
    }
};

export default finnhub;
