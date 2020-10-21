const express = require('express');
const api = require('../api/render.js');
const app = express();
const port = 3000;

app.use('/api', api);

app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});

app.on('error', (err) => {
  console.error('ERR_APP:', err);
});

process.on('uncaughtException', (err) => {
  console.error(`UncaughtException: ${err}`);
  process.exit(1);
});
