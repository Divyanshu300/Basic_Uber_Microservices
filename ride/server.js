const http = require("http");
const app = require("./index");


const server = http.createServer(app);

server.listen(3003 , () => {
    console.log("Ride Service started on PORT: 3003")
});