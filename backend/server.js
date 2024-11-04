import express from 'express';
import cors from 'cors';



const server = express();
const PORT = 4000;

server.use(cors());

let todos = [];

// Hier könnten wir die Todos aus einer JSON-Datei laden

server.get("/loadTodos", (req, res) => {
    console.log("Ich bekomme ein Get");
    const todosFromFile = require('./todos.json');
    todos = todosFromFile;
    res.json(todos);
    res.send("Todos geladen");
});
    

/*server.get("/", (req, res) => {
    console.log("Ich bekomme ein Get");
    res.send("Hello From Node");
});*/
server.get("/todos", (req, res) => {
    console.log("Ich bekomme ein Get");
    res.json(todos);
    res.send("hallo welt");
});


console.log("Server Online");
server.listen(PORT);

/*Der Code von heute morgen sollte funktionieren. Macht euch bitte nochmal bewusst was Frontend und Backend ist.

Im nächsten Schritt soll die App weiterentwickelt werden.
Die Todos sollen nicht mehr hart gecodet sein, besser sie sind in einer separaten JSON-Datei
Recherchiert und Probiert. (Tipp: das fs Modul hilft weiter ;))
*/  