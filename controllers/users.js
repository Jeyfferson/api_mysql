const express = require('express');
const router = express.Router()

//Incluir o arquivo que possui a conexão com o banco de dados
const db = require('./../db/models')

//Criar rota de listar
router.get("/users", async (req, res) => {

   //Receber o  número da pag, quando nao enviado p número da pagina é atribuido página 1
   const { page = 1 } = req.query;
   //console.log(page)

   //Limite de registro de paginas
   const limit = 10;

   //Variável com o núm da ultima página
   var lastPage = 1

   //conta a quantidade  de registro de banco de dados
   const countUser = await db.Users.count();
   console.log(countUser)

   //Acessa o IF quando encontrar o registro no banco de dados
   if(countUser !== 0) {
      
      // Calcular última página
      lastPage = Math.ceil((countUser/limit)); //arredondar para cima
      //console.log(lastPage)
   }else{
      return res.status(400).json({
         mensagem: `ERRO: Usuário não encontrado.`
      })
   }

   //calculo de dados por pagina
   console.log((page * limit) - limit)

   //Recuperar todos os usuarios do banco
   const users = await db.Users.findAll({

      //Iniciar quais colunas recuperar
      attributes: ['id','name','email'],

      //Ordenar os registros pela coluna id na forma descrescente
      order:[['id', 'ASC']],
      offset: Number((page * limit) - limit),
      limit: limit   
   })

   if(users){

      //Criar um objeto com as informações
      var pagination = {
         //Caminho
         path: '/users',
         //Página atual
         page,
         //Página anterior
         prev_page_url: page - 1 >= 1 ? page - 1 : false,
         //Próxima página
         next_page_url: page + 1 >= lastPage ? lastPage : page + 1,
      }

      //Pausar o processamento e retornar os dados em formato de objeto
      return res.json({
         users: users,
         pagination
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