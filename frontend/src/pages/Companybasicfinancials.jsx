import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid } from 'gridjs';
import 'gridjs/dist/theme/mermaid.css';
import fetchApi from '../api/fetchApi';
import quoteApi from '../api/quoteApi';
import Spinner from '../components/Spinner';

// Helper function to render data lists
const DataList = ({ data, type }) => (
    <div className='mt-6'>
        <h2 className='text-xl font-semibold text-gray-800 mb-2'>{type} Data</h2>
        {Object.keys(data).length > 0 ? (
            <ul className='pl-5 flex items-center justify-center gap-2 flex-wrap'>
                {Object.keys(data).map(key => {
                    const item = data[key];
                    return (
                        <li key={key} className="mb-2">
                            <Link
                                to={`/companybasicfinancials/${key}`}
                                state={{ item, key }}
                                className="block p-3 bg-white rounded-lg shadow-sm hover:bg-teal-100 transition-colors duration-300"
                            >
                                <strong className="text-teal-600 text-lg font-semibold">{key}</strong>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        ) : (
            <p>No data available</p>
        )}
    </div>
);

const Companybasicfinancials = () => {
    const [metrics, setMetrics] = useState(null);
    const [symbol, setSymbol] = useState(null);
    const [logo, setLogo] = useState(null);
    const [name, setName] = useState(null);
    const [annual, setAnnual] = useState(null);
    const [quarterly, setQuarterly] = useState(null);
    const gridContainerRef = useRef(null);

    const fetchCompanyDetails = async (symbol) => {
        try {
            const data = await fetchApi.symbolSearch(symbol);
            const company = data.find(item => item.displaySymbol === symbol);
            if (company) {
                setName(company.description.split(' ')[0]);
                const logoData = await quoteApi.symbol(name);
                const logoItem = logoData.find(item => item.ticker === symbol);
                if (logoItem) {
                    setLogo(logoItem.image);
                }
            }
        } catch (error) {
            console.error('Error fetching company details:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchData = await fetchApi.companybasicfinancials();
                setMetrics(fetchData.data.metric);
                setAnnual(fetchData.data.series.annual);
                setQuarterly(fetchData.data.series.quarterly);
                setSymbol(fetchData.data.symbol);
                await fetchCompanyDetails(fetchData.data.symbol);
            } catch (error) {
                console.error('Error fetching financial data:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (metrics && gridContainerRef.current) {
            new Grid({
                columns: ['Metric', 'Value'],
                data: Object.entries(metrics).map(([key, value]) => [key, value]),
                search: true,
                sort: true,
                pagination: {
                    enabled: true,
                    limit: 10,
                },
                className: {
                    table: 'w-full bg-white',
                    thead: 'bg-teal-500 text-white',
                    th: 'p-4 text-left',
                    td: 'p-4 border-b border-gray-200',
                    footer: 'p-4 text-gray-700 bg-gray-100',
                },
            }).render(gridContainerRef.current);
        }
    }, [metrics]);

    if (!metrics) {
        return <Spinner height="300px" />;
    }

    return (
        <div className="p-6 bg-gray-100 shadow-lg">
            <div className='flex items-center gap-4 p-1'>
                <img src={logo} alt="" className='h-5 w-auto' />
                <h1 className='text-lg font-semibold text-gray-800'>
                    {name} <span className='text-gray-600'>({symbol})</span>
                </h1>
            </div>

            <div ref={gridContainerRef} />

            <DataList data={annual} type="Annual" />
            <DataList data={quarterly} type="Quarterly" />
        </div>
    );
};

export default Companybasicfinancials;
