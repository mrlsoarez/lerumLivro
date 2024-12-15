
const cors = require("cors");
const express = require("express");

const { updateTable } = require('../database/pg');

function server() {

    const app = express();
    app.use(cors());
    app.use(express.json())
    app.listen(3000);

    app.post("/register", async (req,res) => {
        const op = await updateTable(`INSERT INTO userdata(email, password) VALUES ($1, $2)`, [req.body.email, req.body.password]);
        res.status(op);   
        if (op == 400) { res.json({message: "Registro não concluído, algo deu errado!"}); }
        else           { res.json({message: "Registro concluído!"}); }
        res.end();
    })

    app.post("/login", async (req, res) => {
        const op = await updateTable(`SELECT email, password FROM userdata WHERE email = $1 AND password = $2`, [req.body.email, req.body.password]); 
        res.status(op)        
        if (op == 400) { res.json({message: "Senha ou login incorretos!"}); }
        else           { res.json({message: "Login concluído!"})}
        res.end();
    })

    app.post("/saveLibrary", async (req, res) => {
        console.log(req.body)
        const op = await updateTable(`INSERT INTO library(title, author, pages) VALUES ($1, $2, $3)`, [req.body.title, req.body.author, req.body.pages]);
        res.status(op);   
        if (op == 400) { res.json({message: "Registro não concluído, algo deu errado!"}); }
        else           { res.json({message: "Registro concluído!"}); }
        res.end();
    })

}

module.exports = {server};