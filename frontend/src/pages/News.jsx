import React, { useState, useEffect } from 'react';
import fetchApi from '../api/fetchApi';
import { Link } from 'react-router-dom';

export const News = () => {
    const [newsdata, setNewsData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);
    const [loading, setLoading] = useState(true); // Add loading state

    const data = async () => {
        setLoading(true); // Start loading
        try {
            const response = await fetchApi.news('BO');
            const sortedData = response.sort((a, b) => b.datetime - a.datetime);
            setNewsData(sortedData);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    useEffect(() => {
        data();
        const id = setInterval(() => data(), 60000);
        return () => clearInterval(id);
    }, []);

    const formatDateTime = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });
    };

    const truncateDescription = (text, maxWords) => {
        const words = text.split(' ');
        if (words.length <= maxWords) return `${words.slice(0, maxWords).join(' ')}...`;
        return `${words.slice(0, maxWords).join(' ')}...`;
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = newsdata.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(newsdata.length / itemsPerPage);

    const pageNumbers = [];
    const range = 1;

    if (currentPage > 1) {
        pageNumbers.push('Prev');
    }

    const startPage = Math.max(currentPage - range, 1);
    const endPage = Math.min(currentPage + range, totalPages);

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    if (currentPage < totalPages) {
        pageNumbers.push('Next');
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="p-6 bg-gray-100" style={{ backgroundColor: '#0c0c0c' }}>
            <h1 className="text-3xl font-bold mb-6 text-white">Latest News</h1>
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
                </div>
            ) : (
                <>
                    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
                        {currentItems.map((item) => (
                            <div key={item.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                                {/* <a href={item.url} target="_blank" rel="noopener noreferrer"> */}
                                    <img src={item.image} alt={item.headline} className="w-full h-48 object-cover" />
                                    <div className="p-4 pb-6">
                                        {/* <h2 className="text-xl font-semibold text-gray-800 mb-2">{item.headline}</h2> */}
                                        <h4 className="text-xl font-semibold text-gray-800 mb-2">{truncateDescription(item.headline, 10)}
                                            {item.headline.split(' ').length > 5 && (
                                                <Link
                                                    to={`/news/${item.id}`}
                                                    state={{ item }} // Pass the item state
                                                    className="text-blue-500 underline ml-1"
                                                >
                                                    more
                                                </Link>
                                            )}</h4>
                                        {/* <p className="text-gray-600 mb-2">
                                            {truncateDescription(item.summary, 10)}
                                            {item.summary.split(' ').length > 10 && (
                                                <Link
                                                    to={`/news/${item.id}`}
                                                    state={{ item }} // Pass the item state
                                                    className="text-blue-500 underline ml-1"
                                                >
                                                    More
                                                </Link>
                                            )}
                                        </p> */}
                                        <p className="text-sm text-gray-500">Source: {item.source}</p>
                                        <p className="text-sm text-gray-500">Date: {formatDateTime(item.datetime)}</p>
                                    </div>
                                {/* </a> */}
                            </div>
                        ))}
                    </div>
                    <div className="my-8 flex items-center gap-4 mx-auto justify-center">
                        {pageNumbers.map((page, index) => (
                            page === 'Prev' ? (
                                <button
                                    type="button"
                                    key={index}
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    className={`mx-1 px-3 py-1 border rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''} flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-white uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
                                    disabled={currentPage === 1}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"
                                        aria-hidden="true" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"></path>
                                    </svg>
                                    Previous
                                </button>
                            ) : page === 'Next' ? (
                                <button
                                    key={index}
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    className={`mx-1 px-3 py-1 border rounded ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''} flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-white uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
                                    disabled={currentPage === totalPages}
                                    type="button"
                                >
                                    Next
                                </button>
                            ) : (
                                <button
                                    key={index}
                                    onClick={() => handlePageChange(page)}
                                    className={`mx-1 px-3 py-1 border rounded ${currentPage === page ? 'bg-gray-300' : ''} relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-white transition-all hover:bg-gray-900/10  active:text-black active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
                                    type="button"
                                >
                                    <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                        {page}
                                    </span>
                                </button>
                            )
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};
