import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <h1>Welcome to Company Directory</h1>
      <Link to="/search">Search for Companies</Link>
    </div>
  );
};

export default LandingPage;
