// src/api/fetchApi.js

import api from './api';

const finnhub = {
    fetchCountry : async()=>{
        try {
            const response = await api.get('/api/finnhub/country');
            return response.data;
        }
        catch(error){
            throw error.response;
        }
    }
};

export default finnhub;
