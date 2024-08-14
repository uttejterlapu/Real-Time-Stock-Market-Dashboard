import React, { useState, useEffect } from 'react';
import quoteApi from '../api/quoteApi';

const Quote = () => {
    const [quoteData, setQuoteData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await quoteApi.quote();
                if (data && data.length > 0) {
                    setQuoteData(data[0]); // Use only the first quote if there are multiple
                } else {
                    console.error('No quote data found');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures this effect runs only once

    return (
        <div className="relative flex justify-center items-center my-8 px-4">
            <div className="bg-gray-800 p-6 rounded-md shadow-md max-w-lg w-full md:mx-auto">
                {quoteData ? (
                    <div>
                        <q className="text-lg font-semibold text-white mb-4 block">{quoteData.quote}</q>
                        <i className="text-sm text-gray-400">- {quoteData.author}</i>
                    </div>
                ) : (
                    <p className="text-white text-center">Loading...</p>
                )}
            </div>
        </div>
    );
};

export default Quote;
