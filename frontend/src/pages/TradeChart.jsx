import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto'; // Import Chart.js
import 'chartjs-adapter-date-fns'; // Import the date adapter
import Spinner from '../components/Spinner'; // Import the Spinner component
import { BACKENDURL } from '../constant';

const TradeChart = () => {
    const [trades, setTrades] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const chartRef = useRef(null);

    useEffect(() => {
        const eventSource = new EventSource(`${BACKENDURL}/api/finnhub/trades`); // Update with correct URL

        eventSource.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                if (data.type === 'trade') {
                    const tradeData = data.data.map(trade => ({
                        price: trade.p,
                        volume: trade.v,
                        timestamp: new Date(trade.t),
                        conditions: trade.c.join(', '), // Joining conditions into a string
                        symbol: trade.s
                    }));
                    setTrades(prevTrades => [...prevTrades, ...tradeData]);
                    setLoading(false); // Hide loader once data is received
                }
            } catch (error) {
                console.error('Error parsing message:', error);
            }
        };

        eventSource.onerror = (event) => {
            console.error('EventSource error:', event);
            setError('EventSource error');
            // setLoading(false); // Hide loader if there's an error
        };

        return () => {
            eventSource.close();
        };
    }, []);

    useEffect(() => {
        if (chartRef.current && chartRef.current.chartInstance) {
            chartRef.current.chartInstance.destroy();
        }
    }, [trades]);

    const chartData = {
        labels: trades.map(trade => trade.timestamp),
        datasets: [
            {
                label: 'Price',
                data: trades.map(trade => trade.price),
                borderColor: '#00ADB5',
                backgroundColor: 'rgba(0, 173, 181, 0.2)',
                borderWidth: 2,
                fill: true,
                tension: 0.1, // Smooth curve
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false, // Allow the chart to be responsive
        plugins: {
            title: {
                display: true,
                text: trades.length > 0 ? `Symbol : ${trades[0].symbol}` : 'Trade Chart', // Use the symbol `s` as title
                color: '#EEEEEE',
                font: {
                    size: 20
                }
            },
            legend: {
                display: true,
                position: 'top',
                labels: {
                    color: '#CCCCCC',
                }
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        return `Price: $${tooltipItem.raw}`;
                    }
                }
            }
        },
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'minute'
                },
                ticks: {
                    color: '#CCCCCC',
                },
                grid: {
                    color: '#555555'
                }
            },
            y: {
                ticks: {
                    color: '#CCCCCC',
                },
                grid: {
                    color: '#555555'
                }
            }
        }
    };

    if (error) return <div className="text-red-500 text-center py-4">Error: {error}</div>;
    if (loading) return <Spinner height="300px" />;

    return (
        <div className="px-6 bg-gray-900 shadow-md rounded-lg py-20">
            <h1 className="text-xl font-semibold mb-4 text-white">Trade Chart</h1>
            <div className="relative w-full h-80">
                <Line ref={chartRef} data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};

export default TradeChart;
