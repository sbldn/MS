const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8000;

// Servir archivos estáticos desde la carpeta 'p5js'
app.use(express.static(path.join(__dirname, 'p5js')));

// Endpoint para servir index.html desde la raíz
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'p5js', 'index.html'));
});

// Endpoint para servir data.json
app.get('/data/data.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'data', 'data.json'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
