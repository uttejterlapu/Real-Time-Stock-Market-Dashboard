import React, { useEffect, useState } from 'react';
import fetchApi from '../api/fetchApi';

const CompanyProfile2 = () => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchApi.companyprofile2();
                setProfile(data);
            } catch (error) {
                console.error('Error fetching company profile:', error);
            }
        };
        fetchData();
    }, []);

    if (!profile) {
        return <div className="p-6 text-center text-gray-700">Loading...</div>;
    }

    return (
        <div className="relative w-full min-h-screen bg-gray-800 text-white flex flex-col items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${profile.logo})` }}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative p-8 max-w-4xl mx-auto bg-gray-900 bg-opacity-80 rounded-lg shadow-lg text-center">
                <div className="mb-8">
                    <img src={profile.logo} alt={`${profile.name} logo`} className="h-24 mx-auto mb-4 rounded-full shadow-lg" />
                    <h1 className="text-6xl font-extrabold mb-4 text-gradient bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
                        {profile.name}
                    </h1>
                </div>
                <div className="space-y-4">
                    {[
                        { label: 'Ticker', value: profile.ticker },
                        { label: 'Country', value: profile.country },
                        { label: 'Currency', value: profile.currency },
                        { label: 'Exchange', value: profile.exchange },
                        { label: 'IPO Date', value: new Date(profile.ipo).toLocaleDateString() },
                        { label: 'Market Cap', value: `$${profile.marketCapitalization.toLocaleString()}` },
                        { label: 'Shares Outstanding', value: profile.shareOutstanding.toLocaleString() },
                        { label: 'Industry', value: profile.finnhubIndustry },
                        { label: 'Phone', value: <a href={`tel:${profile.phone}`} className="underline text-teal-300 hover:text-teal-400">{profile.phone}</a> },
                        { label: 'Website', value: <a href={profile.weburl} className="underline text-teal-300 hover:text-teal-400" target="_blank" rel="noopener noreferrer">{profile.weburl}</a> },
                    ].map(({ label, value }) => (
                        <div key={label} className="text-lg md:text-lg font-medium hover:text-teal-300 transition-colors duration-300">
                            <span className="font-semibold text-teal-200">{label}:</span> {value}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CompanyProfile2;
