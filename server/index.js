const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

app.post('/api/endpoint', (req, res) => {
  const { jsonInput, filters } = req.body;

  let data;
  try {
    data = JSON.parse(jsonInput);
  } catch (e) {
    return res.status(400).send('Invalid JSON input');
  }

  try {
    const filteredData = filterData(data, filters);
    res.json(filteredData);
  } catch (e) {
    res.status(500).send('Server error: ' + e.message);
  }
});

const filterData = (data, filters) => {
  if (!data || !Array.isArray(data.data)) {
    throw new Error('Invalid data format');
  }

  return data.data.filter(item => {
    return filters.every(filter => {
      if (filter === 'number') return !isNaN(Number(item));
      if (filter === 'string') return typeof item === 'string';
      if (filter === 'boolean') return item === 'true' || item === 'false';
      return false;
    });
  });
};

app.listen(3001, () => console.log('Server running on port 3001'));
