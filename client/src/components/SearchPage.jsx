import React, { useState } from 'react';
import axios from 'axios';
import '../styles/SearchPage.css';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [companies, setCompanies] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/companies?search=${searchTerm}`);
      setCompanies(response.data);
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

  return (
    <div className="search-page">
      <h1>Search for Companies</h1>
      <input
        type="text"
        placeholder="Search by name or description"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {companies.map((company) => (
          <li key={company._id}>
            <a href={`/company/${company._id}`}>{company.name}</a>
          </li>
        ))}
      </ul>
      <a 
        href="https://sarafabazar.in/collections/diamond-rings" 
        target="_blank" 
        rel="noopener noreferrer"
        className="external-link"
      >
        Visit Sarafabazar Diamond Rings Collection
      </a>
    </div>
  );
};

export default SearchPage;
