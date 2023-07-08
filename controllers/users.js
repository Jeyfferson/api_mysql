const express = require('express');
const router = express.Router()

//Incluir o arquivo que possui a conexão com o banco de dados
const db = require('./../db/models')

//Criar rota de listar
router.get("/users", async (req, res) => {
   //Recuperar todos os usuarios do banco
   const users = await db.Users.findAll({
      //Iniciar quais colunas recuperar
      attributes: ['id','name','email'],

      //Ordenar os registros pela coluna id na forma descrescente
      order:[['id', 'DESC']]   
   })

   if(users){
      //Pausar o processamento e retornar os dados em formato de objeto
      return res.json({
         users: users
      })
   }else{
      //Pausar o processamento e retornar a mensagem de erro!
      return res.status(400).json({
         message: "Nenhum Usuário encontrado!"
      })
   }
})


//Rota de cadastro
router.post(`/users`, async (req, res) => {

   //Receber os dados enviados no body request
   var dados = req.body;
   console.log(dados)

   //Salvar os dados no banco de dados
   await db.Users.create(dados)
   .then((dadosUsuario) => {
      //Pausar o processamento e retornar os dados em formato de obejto
      return res.json({
         message: 'Usuario cadastrado com sucesso!',
         dadosUsuario
      });
   }).catch((erro) =>{
      //Pausar o processamento e retornar a mensagem de erro!
      return res.json({
         message: "Usuário não cadastrado com sucesso!"
      })
   })
})


module.exports = router;