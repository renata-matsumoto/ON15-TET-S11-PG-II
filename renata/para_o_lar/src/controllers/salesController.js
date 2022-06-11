//Aqui fica nossa lógica de código
//importar o json/banco de dados


const clients = require("../models/clientModel.json")
const sales = require("../models/salesModel.json")





const allSales = (req, res) => {
  res.status(200).json({

    sales,
  
  })

}


const salesById = (req, res) =>{
  try {
    const idRequest = req.params.id
    const cliente = req.query.client
    const findId = clients.find(client => client.clientId == idRequest)
    const findClient = sales.filter(sale => sale.client == cliente)
    if (!findId && !findClient) {
      throw new Error("Id não encontrada")
    }
   console.log(idRequest)
   console.log(cliente)
   console.log(findId)
   console.log(findClient)
    return res.status(200).json({
       clients,
       sales
      })
      
    } catch (error) {
    res.status(500).json({
        message: error.message,
        "message:" : "Algo de errado aconteceu. Tente novamente."
      })
    }
  
}



const salesByReason = (req, res) => {
  try {
    const reasonTrip = req.query.reasonTrip.toLowerCase()
    const findReason = sales.filter(sale => sale.reasonTrip.toLowerCase().includes(reasonTrip))
    if (!findReason) {
      throw new Error("Razão da viagem não encontrada. Procure novamente")
    }
    res.status(200).json({
      findReason
    })

  } catch (error) {
    res.status(500).json({
      message: error.message,
      "message:": "Algo de errado aconteceu. Tente novamente."
    })
  }
}


const createSale = (req, res) => {

  try {

    const callBody = req.body
    const newSale = {
      saleId: (sales.length) + 1,
      client: callBody.client,
      saleDate: callBody.saleDate,
      reasonTrip: callBody.reasonTrip,
      destination: callBody.destination,
      services: callBody.services,
      total: callBody.total,
      payment: callBody.payment
    }

    sales.push(newSale)

    res.status(201).json({
      "Mensagem": "Venda Cadastrada com sucesso",
      sales
    })

  } catch (error) {
    res.status(500).json({
      "mensagem": "Não foi possível não cadastrar o cliente."
    })
  }
}

//Atualizar o cadastro de um cliente (Put) - atualizar somente o que foi alterado.

const updateSale = (req, res) => {

  try {
   
    if (sales.client == clients.clientId) {

      const idRequest = req.params.id
      const callBody = req.body

      const findSales = sales.find(sale => sale.saleId == idRequest)

      const indice = sales.indexOf(findSales)

      callBody.saleId == idRequest

      sales.splice(indice, 1, callBody)

      if (findSales == undefined) {

        throw new Error("Cliente não encontrado. Digite o Id correto")

      }

      res.status(200).json({
        "mensagem": "Dados do paciente atualizado com sucesso",
        

      })
    }
    console.log(callBody)


  } catch (error) {
    res.status(500).json({

      message: error.message
    })
  }
}

//Deletar o cadastro do cliente (Delete)

const deleteSale = (req, res) => {
  try {
    const idRequest = req.params.id
    const findSale = sales.find(sale => sale.saleId == idRequest)

    const indice = sales.indexOf(findSale)

    sales.splice(indice, 1)

    if (findSale == undefined) {
      throw new Error("Id não encontrado.")
    }

    res.status(200).json({
      "mensagem": "Venda excluída com sucesso."
    })

  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}
//Exportar as variáveis do controller


module.exports = {

  allSales,
  salesById,
  salesByReason,
  createSale,
  updateSale,
  deleteSale
}