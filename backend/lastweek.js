    import http from 'http';
   
    console.log("Server ist Online");
    const server = http.createServer((req, res) => {
   
      console.log(req.url);
        console.log(req.method);
      res.end("Hallo vom node.js");
    });
-
-
    server.listen(4000);