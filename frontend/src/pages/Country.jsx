import React, { useState, useEffect } from 'react';
import fetchApi from '../api/fetchApi';

export const Country = () => {
    const [countryData, setCountryData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [tooltip, setTooltip] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [sortOrder, setSortOrder] = useState('asc');

    const data = async () => {
        try {
            const response = await fetchApi.fetchCountry();
            setCountryData(response);
            setFilteredData(response);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        data();
    }, []);

    useEffect(() => {
        const lowerCaseQuery = searchQuery.toLowerCase();
        const filtered = countryData.filter((country) =>
            Object.values(country).some(
                (value) => value && value.toString().toLowerCase().includes(lowerCaseQuery)
            )
        );

        const sorted = filtered.sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.country.localeCompare(b.country);
            } else {
                return b.country.localeCompare(a.country);
            }
        });

        setFilteredData(sorted);
    }, [searchQuery, countryData, sortOrder]);

    const handleMouseEnter = (index) => {
        setTooltip((prevTooltip) => ({ ...prevTooltip, [index]: true }));
    };

    const handleMouseLeave = (index) => {
        setTooltip((prevTooltip) => ({ ...prevTooltip, [index]: false }));
    };

    const handleSort = () => {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    // Calculate page range
    const pageNumbers = [];
    const range = 1;
    const startPage = Math.max(currentPage - range, 1);
    const endPage = Math.min(currentPage + range, totalPages);

    if (totalPages > 1) {
        if (currentPage > 1) {
            pageNumbers.push('Prev');
        }
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }
        if (currentPage < totalPages) {
            pageNumbers.push('Next');
        }
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Countries</h1>
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
                    <thead>
                        <tr className="bg-teal-500 text-white">
                            <th
                                className="border-b px-4 py-2 cursor-pointer hover:bg-teal-600"
                                onClick={handleSort}
                            >
                                Country {sortOrder === 'asc' ? '▲' : '▼'}
                            </th>
                            <th className="border-b px-4 py-2">Code</th>
                            <th className="border-b px-4 py-2">Currency</th>
                            <th className="border-b px-4 py-2">Region</th>
                            <th className="border-b px-4 py-2">Sub Region</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((country, index) => (
                            <tr key={index} className="hover:bg-gray-100">
                                <td className="border-b px-4 py-2">{country.country}</td>
                                <td className="border-b px-4 py-2 text-center">{country.code2}</td>
                                <td className="border-b px-4 py-2 text-center">
                                    <div
                                        className="relative inline-block cursor-pointer"
                                        onMouseEnter={() => handleMouseEnter(index)}
                                        onMouseLeave={() => handleMouseLeave(index)}
                                    >
                                        {country.currencyCode}
                                        {tooltip[index] && (
                                            <div className="absolute z-10 w-48 p-2 mt-2 text-center text-white bg-black rounded-lg shadow-lg">
                                                {country.currency}
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td className="border-b px-4 py-2">{country.region}</td>
                                <td className="border-b px-4 py-2">{country.subRegion}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-6 flex justify-center">
                {pageNumbers.map((page, index) =>
                    page === 'Prev' ? (
                        <button
                            key={index}
                            onClick={() => handlePageChange(currentPage - 1)}
                            className={`px-4 py-2 border rounded-lg text-teal-500 border-teal-500 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={currentPage === 1}
                        >
                            <svg className="w-4 h-4 inline-block mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M15 18l-6-6 6-6"></path>
                            </svg>
                            Previous
                        </button>
                    ) : page === 'Next' ? (
                        <button
                            key={index}
                            onClick={() => handlePageChange(currentPage + 1)}
                            className={`px-4 py-2 border rounded-lg text-teal-500 border-teal-500 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={currentPage === totalPages}
                        >
                            Next
                            <svg className="w-4 h-4 inline-block ml-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 18l6-6-6-6"></path>
                            </svg>
                        </button>
                    ) : (
                        <button
                            key={index}
                            onClick={() => handlePageChange(page)}
                            className={`px-4 py-2 border rounded-lg ${currentPage === page ? 'bg-teal-500 text-white' : 'text-teal-500 border-teal-500'}`}
                        >
                            {page}
                        </button>
                    )
                )}
            </div>
        </div>
    );
};
