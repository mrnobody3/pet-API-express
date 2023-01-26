const express = require("express")
const fs = require("fs/promises")
const moment = require("moment");
const cors = require("cors");

const app = express()


app.use(cors())
app.use(async (req, res, next)=>{
 const {method, url} = req;
 const date = moment().format("DD-MM-YYYY_hh:mm:ss")
	await fs.appendFile("./public/server.log", `\n${method} ${url} ${date}`)
	next()
})
app.get("/", async (req, res)=>{
	res.json(null)
})

app.use((req, res)=>{
	res.status(404).json("Not found")
})
app.listen(4000, ()=> console.log("Server running"))