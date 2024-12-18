
const cors = require("cors");
const express = require("express");

const { updateTable } = require('../database/pg');

var email = 0;

function server() {

    const app = express();
    app.use(cors());
    app.use(express.json())
    app.listen(3000);

    app.post("/register", async (req, res) => {
        const op = await updateTable(`INSERT INTO userdata(email, password) VALUES ($1, $2)`, [req.body.email, req.body.password]);
        res.status(op);
        if (op == 400) { res.json({ message: "Registro não concluído, algo deu errado!" }); }
        else { res.json({ message: "Registro concluído!" }); }
        res.end();
    })

    app.post("/login", async (req, res) => {
        const op = await updateTable(`SELECT email, password FROM userdata WHERE email = $1 AND password = $2`, [req.body.email, req.body.password]);
        res.status(op);

        switch (op) {
            case 200:
                res.json({ message: "Login concluído!" });
                email = req.body.email;
                break;
            case 400:
                res.json({ message: "Senha ou login incorretos!" });
                break;
            default:
                break;
        }

        res.end();
    })

    app.post("/saveLibrary", async (req, res) => {
        console.log(req.body)
        const op = await updateTable(`INSERT INTO library(title, author, pages, useremail) VALUES ($1, $2, $3, $4)`, [req.body.title, req.body.author, req.body.pages, req.body.user_mail]);
        res.status(op);
        if (op == 400) { res.json({ message: "Registro não concluído, algo deu errado!" }); }
        else { res.json({ message: "Registro concluído!" }); }
        res.end();
    })

    app.post("/getEmail", async (req, res) => {
        if (email != 0)  {
            res.json({ useremail: email });
            res.status(200);
        }
        res.end()
    })




}

module.exports = { server };