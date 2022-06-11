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

const createClient = (req, res) => {
  try {
    const callBody = req.body 
    const newClient = {
      clientId: (clients.length) + 1,
      name: callBody.name ,
      lastName: callBody.lastName,
      nomeSocial: callBody.nomeSocial,
      sexo: callBody.sexo,
      orientation: callBody.orientation,
      idade: callBody.idade,
      endereco: callBody.endereco,
      telefone: callBody.telefone,
      cpf: callBody.cpf
    }

    clients.push(newClient)

    res.status(201).json({
      "Mensagem" : "Cliente Cadastrado com sucesso",
      clients
    })

  } catch (error) {
    res.status(500).json({
      "mensagem" : "Não foi possível não cadastrar o cliente."
    })
  }
}

//Atualizar o cadastro de um cliente (Put) - atualizar somente o que foi alterado.

const updateClient = (req, res) => {
  try {
    const idRequest = req.params.id
    const callBody = req.body

    // const updateClient = {
    //   clientId: idRequest,
    //   name: callBody.name || clients.name
    // }
    const findClient = clients.find(client => client.clientId == idRequest)

    const indice = clients.indexOf(findClient)

    callBody.clientId == idRequest

    clients.splice(indice, 1, callBody)
    
    if(findClient == undefined) {

      throw new Error ("Cliente não encontrado. Digite o Id correto")

    }

    res.status(200).json({
      "mensagem":"Dados do paciente atualizado com sucesso",
      callBody
       
    })
    
    console.log(callBody)
  } catch (error) {
    res.status(500).json({

       message:error.message
  })
}
}

//Deletar o cadastro do cliente (Delete)

const deleteClient = (req, res) => {
  try {
    const idRequest = req.params.id
    const findClient = clients.find(client => client.clientId == idRequest)

    const  indice = clients.indexOf(findClient)

    clients.splice(indice, 1)

    if(findClient == undefined) {
      throw new Error ("Id não encontrado.")
    }

    res.status(200).json ({
      "mensagem": "Paciente excluído com sucesso."
    })

  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}
//Exportar as variáveis do controller


module.exports = {
    allClients,
    clientById,
    clientByName,
    createClient,
    updateClient,
    deleteClient
}