import React from 'react'
import { Routes, Route } from 'react-router-dom';
import { Country } from '../pages/Country';
import { News } from '../pages/News';
import { SymbolSearch } from '../pages/SymbolSearch';

const Finnhub = () => {
  return (
    <Routes>
      <Route path="" element={<Country/>} />
      <Route path="/news" element={<News/>} />
      <Route path="/symbolsearch" element={<SymbolSearch/>} />
    </Routes>
  )
}

export default Finnhub