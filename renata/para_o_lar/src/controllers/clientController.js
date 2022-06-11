//Aqui fica nossa lógica de código
//importar o json/banco de dados


const clients = require("../models/clientModel.json")

//precisamos listar os clientes - get
const allClients = (req, res) => {
  res.status(200).json({
    "Mensagem: ":"Esses são os clientes cadastrados em nossa Assistência Técnica.",
    clients
  })
}

//Precisamos listar por id(Get)
const clientById = (req, res) => {
  try {
    const idRequest = req.params.id
    const findId = clients.find(client => client.clientId == idRequest)
    if (!findId) {
      throw new Error("Id não encontrada")
     }
     res.status(200).json({
       findId
      })
      
    } catch (error) {
      res.status(500).json({
        message: error.message,
        "message:" : "Algo de errado aconteceu. Tente novamente."
      })
    }
  }
  //precisamos listar por nome, se tiver nomeSocial trazer o nome social (get)
  
  const clientByName = (req, res) => {
    try {
        const trazerNome = req.query.name.toLowerCase()
        const encontrarNome = clients.filter(client => {
            if(client.nomeSocial) {
                return client.nomeSocial.toLowerCase().includes(trazerNome)
            }

           return client.name.toLowerCase().includes(trazerNome)
        })

        if(encontrarNome.length == 0) {
            throw new Error("Nome não encontrado.")
        }

        res.status(200).json({
            "mensagem": "Paciente encontrado:",
            encontrarNome
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
        console.log(error)
    }
  }


//Cadastrar no sistema um cliente (Post)
//Atualizar o cadastro de um cliente (Put) - atualizar somente o que foi alterado.
//Deletar o cadastro do cliente (Delete)
//Exportar as variáveis do controller






module.exports = {
    allClients,
    clientById,
    clientByName
}