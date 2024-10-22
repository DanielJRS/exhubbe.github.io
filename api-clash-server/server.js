const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.static('public')); // Para servir seus arquivos estáticos

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjU3ZDhiNjJjLTQ4MmQtNDZkYy1hNjAwLTIyNGEyY2I0MmJmZCIsImlhdCI6MTcyMDU3NDY5Miwic3ViIjoiZGV2ZWxvcGVyL2UwNGRhY2U2LTI0NmYtODY5YS0yMDlhLTIxNDFkYTJkYThjMiIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjE3OS4xMjQuMjA1LjE4OSJdLCJ0eXBlIjoiY2xpZW50In1dfQ.tdcpLb8ETCg0oEyAsz_wIzDBZFMW1oW3tE-xrLDTtKogcWuNq-JbqtHkKKQf8jRcMWD5s770oW_efWjBayixyg';

// Rota específica para buscar clã por tag
app.get('/api/clan/:tag', async (req, res) => {
  const clanTag = encodeURIComponent(req.params.tag);
  const url = `https://api.clashofclans.com/v1/clans/${clanTag}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Erro:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});