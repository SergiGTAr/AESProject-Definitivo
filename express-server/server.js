// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');

// Get our API routes
const api = require('./routes/api');
const user_routers = require('./routes/user')

const app = express();
app.use(cors());

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set our api routes
app.use('/', api);
app.use('/api', user_routers);

// Get port from environment and store in Express.
const port = process.env.PORT || '3200';
app.set('port', port);

// Create HTTP server.
const server = http.createServer(app);

// Listen on provided port, on all network interfaces.
server.listen(port, () => console.log(`API en:${port}`));