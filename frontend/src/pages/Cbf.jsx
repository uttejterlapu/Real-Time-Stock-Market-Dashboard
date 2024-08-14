import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

// Register the components needed for Chart.js
ChartJS.register(LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const Cbf = () => {
    const { key } = useParams();
    const location = useLocation();
    const data = location.state || {};

    if (!data || typeof data !== 'object') {
        return <p>No data available</p>;
    }

    // Prepare data for the chart
    const periods = [];
    const values = [];

    Object.keys(data).forEach(key => {
        const items = data[key];
        Object.keys(items).forEach(subKey => {
            const period = items[subKey].period;
            const v = items[subKey].v;
            periods.push(period);
            values.push(v);
        });
    });

    // Chart.js data configuration
    const chartData = {
        labels: periods,
        datasets: [
            {
                label: 'Values',
                data: values,
                borderColor: '#00ADB5',
                backgroundColor: 'rgba(0, 173, 181, 0.2)',
                borderWidth: 2,
                fill: true
            }
        ]
    };

    // Chart.js options configuration
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Period'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Value'
                }
            }
        }
    };

    return (
        <div className='bg-white px-6 py-10 w-full'>
            <div className='mb-10  w-full h-96'>
                <h1 className="text-xl font-bold mb-4">Annual Data Details <strong>{key}</strong></h1>
                <div className='w-full h-full'>
                    <Line data={chartData} options={chartOptions} />
                </div>
            </div>
        </div>
    );
};

export default Cbf;
