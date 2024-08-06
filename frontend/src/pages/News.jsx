import React, { useState, useEffect } from 'react';
import fetchApi from '../api/fetchApi';

export const News = () => {
    const [newsdata, setNewsData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8); // Adjust number of items per page
    const [intervalId, setIntervalId] = useState(null);

    // Fetch news data
    const data = async () => {
        try {
            const response = await fetchApi.news('BO');
            // Sort news by latest time
            const sortedData = response.sort((a, b) => b.datetime - a.datetime);
            setNewsData(sortedData);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        data();

        // Set up the timer to refresh data every 1 minute
        const id = setInterval(() => {
            data();
        }, 60000); // 60,000 milliseconds = 1 minute

        setIntervalId(id);

        // Clean up interval on component unmount
        return () => clearInterval(id);
    }, []);

    // Function to format UNIX timestamp to local date and time
    const formatDateTime = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleString('en-US', {
            weekday: 'long',  // Optional: Adds the day of the week
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true  // Use 12-hour time format (AM/PM)
        });
    };

    // Pagination calculations
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = newsdata.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(newsdata.length / itemsPerPage);

    // Determine the page range to display
    const pageNumbers = [];
    const range = 1; // Number of pages to show before and after current page

    // Add 'Previous' button
    if (currentPage > 1) {
        pageNumbers.push('Prev');
    }

    // Add pages before and after the current page
    const startPage = Math.max(currentPage - range, 1);
    const endPage = Math.min(currentPage + range, totalPages);

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    // Add 'Next' button
    if (currentPage < totalPages) {
        pageNumbers.push('Next');
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Latest News</h1>
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {currentItems.map((item) => (
                    <div key={item.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <a href={item.url} target="_blank" rel="noopener noreferrer">
                            <img src={item.image} alt={item.headline} className="w-full h-48 object-cover" />
                            <div className="p-4 pb-6">
                                <h2 className="text-xl font-semibold text-gray-800 mb-2">{item.headline}</h2>
                                <p className="text-gray-600 mb-2">{item.summary}</p>
                                <p className="text-sm text-gray-500">Source: {item.source}</p>
                                <p className="text-sm text-gray-500">Date: {formatDateTime(item.datetime)}</p>
                                {/* <p className="text-sm text-gray-500">Category: {item.category}</p> */}
                            </div>
                        </a>
                    </div>
                ))}
            </div>
            <div className="mt-4 flex justify-center">
                {pageNumbers.map((page, index) => (
                    page === 'Prev' ? (
                        <button
                            key={index}
                            onClick={() => handlePageChange(currentPage - 1)}
                            className={`mx-1 px-3 py-1 border rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={currentPage === 1}
                        >
                            Prev
                        </button>
                    ) : page === 'Next' ? (
                        <button
                            key={index}
                            onClick={() => handlePageChange(currentPage + 1)}
                            className={`mx-1 px-3 py-1 border rounded ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    ) : (
                        <button
                            key={index}
                            onClick={() => handlePageChange(page)}
                            className={`mx-1 px-3 py-1 border rounded ${currentPage === page ? 'bg-gray-300' : ''}`}
                        >
                            {page}
                        </button>
                    )
                ))}
            </div>
        </div>
    );
};
