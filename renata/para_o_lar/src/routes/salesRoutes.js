//para acessar o método Router(rotas)
const express = require("express")


const controller = require("../controllers/salesController")

const routes = express.Router()

routes.get("/all/:id", controller.allSales)

routes.get("/:id", controller.salesById)

routes.get("/find/reason", controller.salesByReason)

routes.post("/create", controller.createSale)

routes.put("/update/:id", controller.updateSale)

routes.delete("/delete/:id", controller.deleteSale)

module.exports = routes