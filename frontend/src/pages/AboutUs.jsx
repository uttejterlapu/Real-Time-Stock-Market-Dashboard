import React from 'react';
import mypic from '../assets/mypic.jpg'
const AboutUs = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">About Me</h1>

      {/* Profile Section */}
      <section className="flex flex-col items-center mb-10">
        <img
          src= {mypic}// Replace with the actual URL to your profile image
          alt="Uttej T"
          className="w-32 h-32 rounded-full mb-4 object-cover" 
        />
        <h2 className="text-2xl font-semibold text-gray-700">Uttej T</h2>
        <p className="text-gray-600 text-center leading-7 mt-4">
          I'm a dedicated and passionate developer specializing in web and mobile application development. With a strong focus on the MERN/MEAN stack, 
          I leverage the latest technologies to create impactful and user-friendly applications. 
          I am driven by a desire to continuously learn and improve, always striving to deliver the best solutions for my projects.
        </p>
      </section>

      {/* Mission Statement */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">My Mission</h2>
        <p className="text-gray-600 leading-7">
          My mission is to utilize cutting-edge technology and comprehensive data sources to provide accurate and up-to-date financial insights. 
          Whether you're an investor, a trader, or simply interested in financial markets, my goal is to empower you with the tools and information you need 
          to make informed decisions.
        </p>
      </section>

      {/* What I Offer */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">What I Offer</h2>
        <p className="text-gray-600 leading-7">
          I integrate multiple APIs, including the Finnhub API and API Ninjas, to provide a wide range of financial data and tools:
        </p>
        <ul className="list-disc list-inside text-gray-600 leading-7 mt-4">
          <li><strong>Real-time Stock Market Data:</strong> Get the latest stock prices, market trends, and financial news.</li>
          <li><strong>Financial Statements:</strong> Explore companies' financial health with detailed income statements, balance sheets, and cash flow reports.</li>
          <li><strong>Economic Indicators:</strong> Track key economic metrics that impact the financial markets.</li>
          <li><strong>Stock Screener:</strong> Use powerful screening tools to filter stocks based on specific criteria.</li>
          <li><strong>News Aggregation:</strong> Stay informed with curated financial news from top sources.</li>
        </ul>
      </section>

      {/* Technology Overview */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">My Technology Stack</h2>
        <p className="text-gray-600 leading-7">
          I believe in the transformative power of technology in the financial sector. Here's what powers my platform:
        </p>
        <ul className="list-disc list-inside text-gray-600 leading-7 mt-4">
          <li><strong>Finnhub API:</strong> Used for fetching real-time stock data, financial statements, and other critical financial information.</li>
          <li><strong>API Ninjas:</strong> Provides various utilities like financial metrics and news, which are integrated into my platform.</li>
          <li><strong>React and Tailwind CSS:</strong> The frontend is built with React and styled using Tailwind CSS, ensuring a fast, responsive, and visually appealing user interface.</li>
          <li><strong>Node.js Backend:</strong> The backend is powered by Node.js, efficiently handling data processing and API integration.</li>
        </ul>
      </section>

      {/* Contact Information */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Contact Me</h2>
        <p className="text-gray-600 leading-7">
          I'm always here to help! If you have any questions, feedback, or just want to connect, feel free to reach out to me.
        </p>
        <p className="text-gray-600 leading-7 mt-2">
          <strong>Email:</strong> <a href="mailto:uttejterlapu@gmail.com" className="text-teal-500">uttejterlapu@gmail.com</a>
        </p>
        <p className="text-gray-600 leading-7">
          <strong>Phone:</strong> +91 9490977446
        </p>
        <div className="flex space-x-4 mt-4">
          <a href="https://github.com/uttejterlapu" className="text-teal-500 hover:underline">GitHub</a>
          <a href="https://www.linkedin.com/in/uttejterlapu/" className="text-teal-500 hover:underline">LinkedIn</a>
          <a href="https://uttejterlapu.vercel.app/" className="text-teal-500 hover:underline">My Website</a>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
