import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [selectedFilter, setSelectedFilter] = useState([]);
  const [response, setResponse] = useState('');

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleFilterChange = (e) => {
    const options = e.target.options;
    const value = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setSelectedFilter(value);
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post('https://data_filter.vercel.app/api/bfhl', {
        jsonInput,
        filters: selectedFilter,
      });
      setResponse(JSON.stringify(res.data, null, 2));
    } catch (error) {
      console.error('Error:', error);
      setResponse('Error: Unable to process request.');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Data Filter</h1>
      <div style={{ marginBottom: '20px' }}>
        <textarea
          placeholder="Enter JSON here"
          value={jsonInput}
          onChange={handleInputChange}
          rows="10"
          cols="50"
          style={{ width: '100%', padding: '10px', fontSize: '16px' }}
        />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="filters" style={{ marginRight: '10px' }}>Multi Filter:</label>
        <select
          id="filters"
          multiple
          value={selectedFilter}
          onChange={handleFilterChange}
          style={{ width: '200px', height: '100px' }}
        >
          <option value="number">Numbers</option>
          <option value="string">Strings</option>
          <option value="boolean">Booleans</option>
          {/* Add more filter options as needed */}
        </select>
      </div>
      <button
        onClick={handleSubmit}
        style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
      >
        Submit
      </button>
      <div style={{ marginTop: '20px' }}>
        <h2>Filtered Response:</h2>
        <pre style={{ backgroundColor: '#f4f4f4', padding: '10px', borderRadius: '5px' }}>
          {response}
        </pre>
      </div>
    </div>
  );
};

export default App;
