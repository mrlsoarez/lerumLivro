
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
        res.status = op;        
        res.end();
    })

    app.post("/login", async (req, res) => {
        const op = await updateTable(`SELECT email, password FROM userdata WHERE email = $1 AND password = $2`, [req.body.email, req.body.password]); 
        if (op.rows == 0) {op.status = 400};
        console.log(op.status)
        res.status(op.status).send("Not working"); 
        res.end();
    })

}

module.exports = {server};