import React, { useState, useEffect, useRef } from 'react';
import { Grid } from 'gridjs';
import 'gridjs/dist/theme/mermaid.css'; // Use the Grid.js theme
import fetchApi from '../api/fetchApi';
import Spinner from '../components/Spinner'; // Import Spinner component

export const Country = () => {
    const [countryData, setCountryData] = useState([]);
    const [loading, setLoading] = useState(true); // State to manage loading
    const gridContainerRef = useRef(null);

    useEffect(() => {
        const data = async () => {
            try {
                const response = await fetchApi.fetchCountry();
                setCountryData(response);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false); // Set loading to false once data is fetched
            }
        };
        data();
    }, []);

    useEffect(() => {
        if (countryData.length > 0 && gridContainerRef.current) {
            new Grid({
                columns: [
                    { id: 'country', name: 'Country' },
                    { id: 'code', name: 'Code' },
                    { id: 'currency', name: 'Currency' },
                    { id: 'region', name: 'Region' },
                    { id: 'subRegion', name: 'Sub Region' },
                ],
                data: countryData.map((country) => [
                    country.country,
                    country.code2,
                    country.currencyCode,
                    country.region,
                    country.subRegion
                ]),
                search: true,
                sort: true,
                pagination: {
                    enabled: true,
                    limit: 10,
                },
                className: {
                    table: 'w-full bg-grey-900',
                    thead: 'bg-teal-500 text-white',
                    th: 'p-4 text-left',
                    td: 'p-4 border-b border-gray-200',
                    footer: 'p-4 text-gray-700 bg-gray-100',
                },
            }).render(gridContainerRef.current);
        }
    }, [countryData]);

    return (
        <div className="p-6 bg-gray-100">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Countries</h1>
            {loading ? (
                <Spinner height="300px" /> // Show Spinner component while loading
            ) : (
                <div ref={gridContainerRef} />
            )}
        </div>
    );
};
