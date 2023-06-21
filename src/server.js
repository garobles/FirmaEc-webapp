const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const REST_SERVICE_URL = 'https://ws.firmadigital.gob.ec/servicio/appverificardocumento';

async function verificarDocumento(documento, base64) {
    const response = await fetch(REST_SERVICE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        documento: documento,
        base64: base64
      })
    });
  
    if (response.ok) {
      return await response.text();
    } else {
      throw new Error('Failed to verify document');
    }
  }

const app = express();
const upload = multer();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Ruta GET para servir index.html
app.get('/', (req, res) => {
  const indexPath = path.join(__dirname, 'front-end/index.html');
  res.sendFile(indexPath);
});

app.post('/upload', upload.single('pdf'), (req, res) => {
  if (!req.file) {
    res.status(400).send('No se ha enviado ningún archivo PDF.');
    return;
  }
  try {
    const base64 = req.file.buffer.toString('base64');

    verificarDocumento(base64, "0").then(val => res.send(val));
  } catch (error) {
    console.log(error);
    res.status(500).send('Ocurrió un error al procesar el archivo PDF.');
  }
});

app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000.');
});

