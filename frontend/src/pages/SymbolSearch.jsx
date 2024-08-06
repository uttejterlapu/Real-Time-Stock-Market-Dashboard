import React, { useState, useEffect } from 'react';
import fetchApi from '../api/fetchApi';

export const SymbolSearch = () => {
    const [symbol, setSymbol] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (symbol.trim() === '') {
            setResults([]);
            return;
        }

        const fetchData = async () => {
            setLoading(true);
            setError('');
            try {
                const data = await fetchApi.symbolSearch(symbol);
                setResults(data); // Update with the response data
            } catch (error) {
                setError('Error fetching data. Please try again.');
            }
            setLoading(false);
        };

        fetchData();
    }, [symbol]);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Symbol Search</h1>
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Enter symbol"
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value)}
                    className="p-2 border border-gray-300 rounded"
                />
            </div>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            <div className="mt-4">
                {results.length > 0 ? (
                    <ul>
                        {results.map((item, index) => (
                            <li key={index} className="border-b border-gray-300 p-2">
                                <p className="font-semibold">{item.symbol}</p>
                                <p>{item.description}</p>
                                <p className="font-semibold">{item.type}</p>
                                {/* Add more fields based on the response structure */}
                            </li>
                        ))}
                    </ul>
                ) : (
                    !loading && <p>No results found.</p>
                )}
            </div>
        </div>
    );
};
