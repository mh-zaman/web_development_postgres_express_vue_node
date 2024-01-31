require("dotenv").config({ path: __dirname + "/.env" });

const http = require('http');
const app = require('./app');

const server = http.createServer(app);

const PORT = process.env.PORT || 9000;
const IP = process.env.IP || '0.0.0.0';

server.listen(PORT, IP, () =>
    console.log(`Server is running on IP: ${IP} and PORT: ${PORT}`)
);