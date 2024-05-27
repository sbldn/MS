const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Servir archivos estáticos desde la raíz
app.use(express.static(__dirname));

// Endpoint para servir index.html desde la raíz
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint para servir data.json
app.get('/data/data.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'data', 'data.json'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});