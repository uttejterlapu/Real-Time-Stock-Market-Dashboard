import React, { useState, useEffect } from 'react';
import fetchApi from '../api/fetchApi';

export const Home = () => {
    const [countryData, setCountryData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [tooltip, setTooltip] = useState({});

    const data = async () => {
        try {
            const response = await fetchApi.fetchCountry();
            setCountryData(response); // Update the state with the fetched data
            setFilteredData(response); // Initialize filtered data with the fetched data
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        data();
    }, []); // The empty array ensures this runs only once when the component mounts

    useEffect(() => {
        // Filter data based on the search query
        const lowerCaseQuery = searchQuery.toLowerCase();
        const result = countryData.filter((country) =>
            Object.values(country).some(
                (value) =>
                    value && value.toString().toLowerCase().includes(lowerCaseQuery)
            )
        );
        setFilteredData(result);
    }, [searchQuery, countryData]);

    const handleMouseEnter = (index) => {
        setTooltip((prevTooltip) => ({ ...prevTooltip, [index]: true }));
    };

    const handleMouseLeave = (index) => {
        setTooltip((prevTooltip) => ({ ...prevTooltip, [index]: false }));
    };

    const tooltipStyle = {
        position: 'relative',
        display: 'inline-block',
        cursor: 'pointer'
    };

    const tooltipTextStyle = {
        visibility: 'hidden',
        width: '120px',
        backgroundColor: 'black',
        color: '#fff',
        textAlign: 'center',
        borderRadius: '6px',
        padding: '5px 0',
        position: 'absolute',
        zIndex: 1,
        bottom: '125%', /* Position the tooltip above the text */
        left: '50%',
        marginLeft: '-60px',
        opacity: 0,
        transition: 'opacity 0.3s'
    };

    const showTooltipStyle = {
        visibility: 'visible',
        opacity: 1
    };

    return (
        <div style={{padding:'20px'}}>
            <h1>Countries</h1>
            <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ marginBottom: '20px', padding: '10px', width: '90%' }}
            />
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid #ccc', padding: '8px' }}>Country</th>
                        <th style={{ border: '1px solid #ccc', padding: '8px' }}>Code</th>
                        {/* <th style={{ border: '1px solid #ccc', padding: '8px' }}>Code3</th> */}
                        <th style={{ border: '1px solid #ccc', padding: '8px' }}>Currency</th>
                        <th style={{ border: '1px solid #ccc', padding: '8px' }}>Region</th>
                        <th style={{ border: '1px solid #ccc', padding: '8px' }}>Sub Region</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((country, index) => (
                        <tr key={index}>
                            <td style={{ border: '1px solid #ccc', padding: '8px', width:'200px' }}>{country.country}</td>
                            <td style={{ border: '1px solid #ccc', padding: '8px' }}>{country.code2}</td>
                            {/* <td style={{ border: '1px solid #ccc', padding: '8px' }}>{country.code3}</td> */}
                            <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                                <div
                                    style={tooltipStyle}
                                    onMouseEnter={() => handleMouseEnter(index)}
                                    onMouseLeave={() => handleMouseLeave(index)}
                                >
                                    {country.currencyCode}
                                    <div style={{ ...tooltipTextStyle, ...(tooltip[index] ? showTooltipStyle : {}) }}>
                                        {country.currency}
                                    </div>
                                </div>
                            </td>
                            <td style={{ border: '1px solid #ccc', padding: '8px' }}>{country.region}</td>
                            <td style={{ border: '1px solid #ccc', padding: '8px' }}>{country.subRegion}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
