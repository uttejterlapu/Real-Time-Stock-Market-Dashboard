import React from 'react';
import Quote from "../components/Quote";

const Home = () => {
    return (
        <div className="p-6 min-h-screen bg-gray-900 text-white relative flex flex-col justify-center items-center">
            <Quote />
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-blue-500 opacity-50 z-0"></div>

            <div className="relative z-10 max-w-4xl mx-auto text-center">
                <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
                    Welcome to Our Testing Page
                </h1>

                <p className="text-lg md:text-xl mb-8">
                    This page is currently under testing. Please note that the feature currently uses <strong className="text-teal-400">AAPL</strong> as the default.
                </p>

                <p className="text-lg md:text-xl mb-8">
                    Our motive is to provide you with an insightful and seamless experience in tracking and analyzing market data. We aim to deliver innovative features that help you make informed decisions.
                </p>

                <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8 z-2">
                    <h2 className="text-3xl font-bold mb-4 text-teal-400">
                        What We Offer
                    </h2>
                    <ul className="list-disc list-inside text-lg">
                        <li className="mb-2">
                            <strong className="text-teal-300">Real-Time Market Data:</strong> Stay updated with the latest stock market trends and insights.
                        </li>
                        <li className="mb-2">
                            <strong className="text-teal-300">Comprehensive Analytics:</strong> Dive deep into market analytics to make data-driven decisions.
                        </li>
                        <li className="mb-2">
                            <strong className="text-teal-300">Personalized Dashboard:</strong> Customize your dashboard to track the metrics that matter most to you.
                        </li>
                        <li className="mb-2">
                            <strong className="text-teal-300">Seamless Integration:</strong> Integrate with various market data sources for a holistic view.
                        </li>
                    </ul>
                </div>



                <div className="mt-8">
                    <p className="text-gray-400">
                        Stay tuned for updates and new features! If you have any questions, feel free to <a href="mailto:support@example.com" className="underline text-teal-300 hover:text-teal-400">contact us</a>.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Home;
