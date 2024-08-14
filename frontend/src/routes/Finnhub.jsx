import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Country } from '../pages/Country';
import { News } from '../pages/News';
import { SymbolSearch } from '../pages/SymbolSearch';
import Home from '../pages/Home';
import NewsDetail from '../pages/NewsDetail';
import TradeChart from '../pages/TradeChart';
import Layout from '../components/Layout';
import Companybasicfinancials from '../pages/Companybasicfinancials';
import Cbf from '../pages/Cbf';
import CompanyProfile2 from '../pages/CompanyProfile2';

const Finnhub = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout><Home/></Layout>} />
      <Route path="/country" element={<Layout><Country/></Layout>} />
      <Route path="/news" element={<Layout><News/></Layout>} />
      <Route path="/symbolsearch" element={<Layout><SymbolSearch/></Layout>} />
      <Route path="/news/:id" element={<Layout><NewsDetail/></Layout>} />
      <Route path="/trade" element={<Layout><TradeChart/></Layout>} />
      <Route path="/companybasicfinancials" element={<Layout><Companybasicfinancials/></Layout>} />
      <Route path="/companybasicfinancials/:key" element={<Layout><Cbf/></Layout>} />
      <Route path="/companyprofile" element={<Layout><CompanyProfile2/></Layout>} />
    </Routes>
  );
}

export default Finnhub;
