const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());

function orderByName(lista) {
  return lista.sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) {
          return -1;
      }
      if (nameA > nameB) {
          return 1;
      }
      return 0;
  });
}

app.get('/', (req, res) => {
  res.json({
    lesions: '/lesions',
  });
});

app.get('/lesions', (req, res) => {
  // Lee el archivo JSON
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al leer los datos' });
    }
    // Convierte los datos JSON a objeto JavaScript
    const jsonData = JSON.parse(data);

    const lesions = orderByName(jsonData.lesions);
    
    // Devuelve los datos como respuesta
    res.json(lesions);
  });
});

app.get('/lesions/:id', (req, res) => {
  // Lee el archivo JSON
  fs.readFile('data.json', 'utf8', (err, data) => {
      if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Error al leer los datos' });
      }
      // Convierte los datos JSON a un array de JavaScript
      const jsonData = JSON.parse(data);
      // Obtiene el índice del elemento desde los parámetros de la URL
      const id = parseInt(req.params.id);
      // Ordena los elementos por nombre
      const lesions = orderByName(jsonData.lesions);
      // Verifica si el índice es válido
      if (id >= 0 && id < lesions.length) {
          // Devuelve el elemento correspondiente al índice
          res.json(lesions[id]);
      } else {
          res.status(404).json({ error: 'No se ha encontrado el elemento' });
      }
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en ${PORT}`);
});
