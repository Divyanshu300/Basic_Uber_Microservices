const http = require("http");
const app = require("./index");

const server = http.createServer(app);


server.listen(3002 , () => {
    console.log("Captain Service running on port: 3002");
});