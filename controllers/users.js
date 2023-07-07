const express = require('express');
const router = express.Router()

//Incluir o arquivo que possui a conexão com o banco de dados
const db = require('./../db/models')

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
      console.log('Usuário não cadastrado com sucesso!');
   })
})


module.exports = router;