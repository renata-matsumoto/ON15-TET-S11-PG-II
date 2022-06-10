//como Subir um Servidor
//chamar o express - framework, que possui um sistema de rotas, gerencia as requisições de HTTP/verbos(CRUD, Get, Put, Delete, Path), trata exceções.

const express = require("express")

const cors = require("cors")

const app = express()

app.use(express.json())

app.use(cors())

//Como Fazer as Rotas Funcionarem

const clientRoutes = require("./routes/clientRoutes")


app.use("/client", clientRoutes)


module.exports = app