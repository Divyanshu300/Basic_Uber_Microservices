const http = require("http");
const app = require("./index");

const server = http.createServer(app);


server.listen(3001 , () => {
    console.log("User Service running on port: 3001");
});