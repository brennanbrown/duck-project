const express = require('express');
const path = require('path');

const app = express();

const port = 3000;

// Before routing handlers are defined, there needs to be
// 'app.use' and the middleware called 'express.static'
app.use(express.static(path.join(__dirname, '/src')));

// callback request, callback response
app.get('/', (request, response) => {
  // Tests the server:
  // response.send('Hello Express :)');

  // Allows Express to serve a static HTML page.
  response.sendFile(path.join(__dirname, '/src/index.html'));
});

app.get('/about', (request, response) => {
  response.sendFile(path.join(__dirname, '/src/about.html'));
});

app.listen(port, () => {
  console.log(`Express Sever is Listening on port ${port}!`);
});
