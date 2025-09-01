const http = require('http');
const fs = require('fs');
const path = require('path');
const { type } = require('os');

const server = http.createServer((req, res) => {
  // TODO: Implement your code here

  if (req.url === "/calculate") {


    const filepath = path.join(__dirname, "..", '/inputs.txt')

    fs.readFile(filepath, 'utf-8', (error, data) => {

      if (error) {
        res.writeHead(500, { "Content-type": "text/plain" })
        return res.end("Unable to write result")

      }

      const array = data.split("\n");

      if (isNaN(Number(array[0])) || isNaN(Number(array[1]))) {

        res.writeHead(400, { "Content-type": "text/plain" })
        return res.end("Invalid Number")

      }

      if (array[2] === "add") {

        fs.writeFileSync("result.txt", String(Number(array[0]) + Number(array[1])))
        return res.end(String(Number(array[0]) + Number(array[1])))
      }
      else if (array[2] === "subtract") {
        fs.writeFileSync("result.txt", String(Number(array[0]) - Number(array[1])))
        return res.end(String(Number(array[0]) - Number(array[1])))
      }

      else if (array[2] === "multiply") {
        fs.writeFileSync("result.txt", String(Number(array[0]) * Number(array[1])))
        return res.end(String(Number(array[0]) * Number(array[1])))
      }

      else if (array[2] === "divide") {

        if (Number(array[1]) === 0) {
          res.writeHead(400, { "Content-type": "text/plain" })
          return res.end("Division by zero")

        }
        fs.writeFileSync("result.txt", String(Number(array[0]) / Number(array[1])))
        return res.end(String(Number(array[0]) / Number(array[1])))
      }

      else {
        res.writeHead(400, { "Content-type": "text/plain" })
        return res.end("Invalid Operator")
      }

    })

  }

  else {
    res.writeHead(404, { "Content-type": "text/plain" })
    res.end("Not Found")

  }

});

// Do not modify this
server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});

// Export for testing
module.exports = server;
