//Aqui fica nossa lógica de código
//importar o json/banco de dados

const { response } = require("../app")
const clientModel = require("../models/clientModel.json")

//precisamos listar os clientes - get
const allClients = (req, res) => {
  res.status(200).json({
    "Mensagem: ":"Esses são os clientes cadastrados em nossa Assistência Técnica.",
    clientModel
  })
}

//precisamos listar por nome, nomeSocial e id (get)
//Cadastrar no sistema um cliente (Post)
//Atualizar o cadastro de um cliente (Put) - atualizar somente o que foi alterado.
//Deletar o cadastro do cliente (Delete)
//Exportar as variáveis do controller






module.exports = {
    allClients
}