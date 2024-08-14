import React from 'react';
import { useLocation } from 'react-router-dom';

const NewsDetail = () => {
    const location = useLocation();
    const { item } = location.state || {}; // Retrieve the item from state

    if (!item) {
        return <p>No news data available.</p>;
    }

    return (
        <div className="relative pb-9 bg-gray-900 text-white">
            <div className="relative">
                <img
                    src={item.image}
                    alt={item.headline}
                    className="w-full h-72 object-cover"
                />
                <div className="absolute bottom-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="text-center px-4 py-6">
                        <h1 className="text-4xl font-bold mb-2">{item.headline}</h1>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto p-6 mt-8">
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                    <p className="text-lg mb-4">{item.summary}</p>
                    <p className="text-sm text-gray-400 mb-2">Source: <a href={item.url} className='underline text-blue-600' target="_blank" rel="noopener noreferrer">{item.source}</a></p>
                    <p className="text-sm text-gray-400">Date: {new Date(item.datetime * 1000).toLocaleString()}</p>
                </div>
            </div>
        </div>
    );
};

export default NewsDetail;
