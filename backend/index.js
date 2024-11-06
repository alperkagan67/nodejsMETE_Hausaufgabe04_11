import express from "express";
import cors from "cors";
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const PORT = 5050;

const todos = [
    { id: 1, name: "Milch holen", userId: 1 },
    { id: 2, name: "Wasser holen", userId: 2 },
    { id: 3, name: "Brötchen holen", userId: 1 },
];

app.get("/", function (req, res) {
    res.send("Hello my name is Tom");
});

app.get("/todos/all", (req, res) => {
    res.json(todos);
});

app.get("/todos/byid", (req, res) => {
    // Fehlerbehandlung für fehlendes todoId
    const todoId = req.query.todoId;
    if (!todoId) return res.send("No Todo Id provided");

    const todoIdNr = parseInt(todoId);
    const todo = todos.find((item) => item.id === todoIdNr);
    if (!todo) return res.send("Todo not found"); // Rückmeldung, falls kein Todo gefunden wird
    res.json(todo);
});

app.get("/todos/byuserid", (req, res) => {
    // Fehlerbehandlung für fehlendes userId
    const userId = req.query.userId;
    if (!userId) return res.send("No User Id provided");

    const userIdNr = parseInt(userId);
    const userTodos = todos.filter((item) => item.userId === userIdNr);
    if (userTodos.length === 0) return res.send("No todos found for this user"); // Rückmeldung, falls keine Todos für den userId gefunden werden
    res.json(userTodos);
});

// Route für Todos nach Name filtern
app.get("/todos/byname", (req, res) => {
    const name = req.query.name;
    if (!name) return res.send("No name provided");

    const filteredTodos = todos.filter((todo) =>
        todo.name.toLowerCase().includes(name.toLowerCase())
    );
    if (filteredTodos.length === 0) return res.send("No todos found with this name"); // Rückmeldung, falls keine Todos mit dem Namen gefunden werden
    res.json(filteredTodos);
});

/*
HAUSAUFGABE 06.11.24


Erstelle eine POST-Route, um neue Todos hinzuzufügen.
1. Implementiere in index.js einen neuen Endpunkt POST /todos .
2. Der Endpunkt soll neue Todos in das todos -Array einfügen.
3. Stelle sicher, dass name und userId im Body der Anfrage vorhanden sind.
Wenn einer dieser Werte fehlt, soll der Server mit "Name and UserId are
required" und einem Status 400 antworten.
1. Sende eine POST-Anfrage, um ein Todo ohne den erforderlichen name oder
userId zu erstellen:

URL: http://localhost:5050/todos
Body (JSON):
{
"name": "",
"userId": 0
}

Erwartete Antwort: Eine Fehlermeldung

2. Versuche, ein Todo zu erstellen, bei dem userId eine negative Zahl ist, und
dokumentiere, was die API antwortet.

BILDER IM DOCUMENTATION PATRICK*/
app.post("/todos", (req, res) => {
    const { name, userId } = req.body;
    // Fehlerbehandlung für fehlende name und userId
    if (!name ||!userId) {
        return res.status(400).send("Name and UserId are required");
    }
    // Fehlerbehandlung für negative userId
    if (userId < 0) {
        return res.status(400).send("UserId must be a positive number");
    }
    const newTodo = {
        id: todos.length + 1,
        name,   
        userId,
    };
    // Hinzufügen des neuen Todos zum Array
    todos.push(newTodo);
    res.status(201).json(newTodo);
    });

/*Aufgabe 4: Todo aktualisieren

1. Sende eine PUT-Anfrage, um den Namen eines bestehenden Todos zu ändern:

URL: http://localhost:5050/todos/update?todoId=2
Body (JSON):
{
"name": "Wasser holen aktualisiert"
}

Erwartete Antwort: Das aktualisierte Todo-Objekt

2. Probiere eine Anfrage mit einer ungültigen todoId (z.B. todoId=999 ) und schreibe
auf, was passiert.
!!! KOMMENTIERE ZEILE FÜR ZEILE !!!
*/
app.put("/todos/update", (req, res) => {
    const todoId = req.query.todoId;
    const name = req.body.name;
    if (!todoId || !name) {
        return res.status(400).send("TodoId and name are required");
    }
    const todoIdNr = parseInt(todoId);
    const todo = todos.find((item) => item.id === todoIdNr);
    if (!todo) {
        return res.status(404).send("Todo not found");
    }
    todo.name = name;
    res.json(todo);
});
/*Aufgabe 5: Todos in verschiedenen Szenarien löschen

1. Sende eine DELETE-Anfrage, um ein nicht existierendes Todo zu löschen:

URL: http://localhost:5050/todos?todoId=999
Erwartete Antwort: Eine Fehlermeldung, dass das Todo nicht gefunden wurde
2. Teste das Löschen mehrerer existierender Todos in einer einzigen Anfrage und
schreibe auf, welche Todos tatsächlich gelöscht wurden.


*/
app.delete("/todos", (req, res) => {
    const todoId = req.query.todoId;
    if (!todoId) {
        return res.status(400).send("No Todo Id provided");
    }
    const todoIdNr = parseInt(todoId);
    const todoIndex = todos.findIndex((item) => item.id === todoIdNr);
    if (todoIndex === -1) {
        return res.status(404).send("Todo not found");
    }
    todos.splice(todoIndex, 1);
    res.send("Todo deleted");
});




/*app.post("/todos", (req, res) => {
    const { name, userId } = req.body;

    if (!name ||!userId) {
        return res.status(400).send("Name and UserId are required");
    }

    const newTodo = {
        id: todos.length + 1,
        name,
        userId,
    };

    todos.push(newTodo);
    res.status(201).json(newTodo);
});*/ 

app.listen(PORT, () => {
    console.log(`Express App is running on http://localhost:${PORT}`);
});
