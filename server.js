// const express = require('express');
// const path = require('path');
// const app = express();
// const PORT = process.env.PORT || 8000;
// const https=require('https')
// const fs=require('fs')


// // Servir archivos estáticos desde la carpeta 'p5js'
// app.use(express.static(path.join(__dirname, 'p5js')));

// // Endpoint para servir index.html desde la raíz
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'p5js', 'index.html'));
// });

// // Endpoint para servir data.json
// app.get('/data/data.json', (req, res) => {
//   res.sendFile(path.join(__dirname, 'data', 'data.json'));
// });




// app.listen(PORT, '0.0.0.0', () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });


// const sslServer=https.createServer({
//   key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
//   cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
// },app)


const express = require('express')
const https = require('https')
const path = require('path')
const fs = require('fs')

const app = express()

app.use(express.static(path.join(__dirname, 'p5js')));
// Endpoint para servir index.html desde la raíz

// Endpoint para servir data.json
app.get('/data/data.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'data', 'data.json'));
});

const sslServer = https.createServer(
  {
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
  },
  app
)

sslServer.listen(3443, () => console.log('Secure server 🚀🔑 on port 3443'))