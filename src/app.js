// backend/src/app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const apiRoutes = require('./routes/api');

const app = express();

// Railway define a porta na variável de ambiente PORT
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Configurar caminho para arquivos estáticos (uploads)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Rotas API
app.use('/api', apiRoutes);

// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
