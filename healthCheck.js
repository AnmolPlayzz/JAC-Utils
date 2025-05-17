const express = require('express');
const server = express();

server.all('/', (req, res)=>{
    res.send('Health Check online.')
})
function keepAlive(){
    server.listen(8080, ()=>{console.log("Health Check Online.")});
}
module.exports = keepAlive;