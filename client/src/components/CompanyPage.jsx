import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/CompanyPage.css';

const CompanyPage = () => {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await axios.get(`/api/companies/${id}`);
        setCompany(response.data);
      } catch (error) {
        console.error('Error fetching company:', error);
      }
    };

    fetchCompany();
  }, [id]);

  const handleInquiry = async () => {
    try {
      await axios.post(`/api/companies/${id}/inquiry`, { email, message });
      alert('Inquiry sent successfully');
    } catch (error) {
      console.error('Error sending inquiry:', error);
    }
  };

  if (!company) return <div>Loading...</div>;

  return (
    <div className="company-page">
      <h1>{company.name}</h1>
      <p>{company.description}</p>
      <div>
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <textarea
          placeholder="Your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleInquiry}>Send Inquiry</button>
      </div>
    </div>
  );
};

export default CompanyPage;
