const http = require("http");
const app = require("./app");
require("dotenv").config();
const server = http.createServer(app);

server.listen(process.env.PORT || 5000, () => {
  console.log(`server is running on port ${process.env.PORT} `);
});
