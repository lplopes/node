/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


const fs = require('fs');
const express = require("express");
const app = express();
const port = process.env.port || 3000;

app.use(express.json());

const courses = [
    {id:1, name:"course1"},
    {id:2, name:"course2"},
    {id:3, name:"course3"}
];

app.get("/", (req, res) => {
    res.send("<span>Secuencia de Collatz para n =&nbsp;</span><span><input type = \"number\" id = \"n\" name = \"n\" title = \"Numero\" onfocus = \"inputFocus(this)\" onblur = \"inputBlur(this)\" /></span>");
});

app.listen(port, () => {
    console.log(`Listening to the port ${port}...`);
});

fs.readFile('./arreglo.json', 'utf8', (err, jsonString) => {
    if(err) {
        console.log("File read failed:", err);
        return null;
    }
    try {
        const myObj = JSON.parse(jsonString);
        var result = "";
        for(var i = 0; i < myObj.n.length; i++)
            result += myObj.n[i] + " ";
        console.log(result);
    } catch(err) {
        console.log('Error parsing JSON string:', err);
    }
})

app.get("/api/courses", (req, res) => {
    res.send(courses);
});

/*app.get("/api/courses/:id", (req, res) => {
    res.send(req.params.id);
});

app.get("/api/posts/:year/:month", (req, res) => {
    res.send(req.params);
});

app.get("/api/posts/:year/:month", (req, res) => {
    res.send(req.query);
});*/

app.post("/api/courses", (req, res) => {
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.get("/api/courses/:id", (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course)
        res.status(404).send("The given course ID was not found.\n");
    res.send(course);
});