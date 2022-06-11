//para acessar o método Router(rotas)
const express = require("express")


const controller = require("../controllers/clientController")

const routes = express.Router()

routes.get("/all", controller.allClients)

routes.get("/:id", controller.clientById)

routes.get ("/find/byName", controller.clientByName)

routes.post("/create", controller.createClient)

routes.put("/update/:id", controller.updateClient )

routes.delete("/delete/:id", controller.deleteClient)

module.exports = routes