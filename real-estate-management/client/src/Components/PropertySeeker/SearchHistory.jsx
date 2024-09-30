import React, { useState, useEffect } from 'react';
import propertyService from '../../Services/propertyService';

const SearchHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const result = await propertyService.getSearchHistory();
      setHistory(result);
    };
    fetchHistory();
  }, []);

  return (
    <div>
      <h1>Search History</h1>
      <ul>
        {history.map((search, index) => (
          <li key={index}>{search}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchHistory;
