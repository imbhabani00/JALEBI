import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import SearchPage from './components/SearchPage';
import CompanyPage from './components/CompanyPage';
import Navbar from './components/Navbar';
import './styles/index.css';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/company/:id" element={<CompanyPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
