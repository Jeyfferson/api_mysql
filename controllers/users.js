const express = require('express');
const router = express.Router()

//Incluir o arquivo que possui a conexão com o banco de dados
const db = require('./../db/models')

//Criar rota de listar
//Endereço para acessar  através da aplicação externa http://localhost/8080/users?page=2
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
   //console.log(countUser)

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
   //console.log((page * limit) - limit)

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
         next_page_url: Number(page) + 1 > Number(lastPage) ? Number(lastPage) : Number(page) + 1,
         //Retorna a ultima pagina
         lastPage: lastPage,
         //Quantidade de registro
         total: countUser
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

// Criar rota de visualizar Cadastro
//Endereço para acessar  através da aplicação externa http://localhost/8080/users?page=7
router.get("/users/:id", async (req, res) => {

   //Receber parâmetro id
   const { id } = req.params;
   //console.log(id)

   //Recuperar o registro do banco de dados
   const user = await db.Users.findOne({
      //Indicar quais colunas recuperar
      attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
      //Acrecentando condição para indicar qual registro deve ser retornado no banco de dados
      where: {id: id}
   });
   //console.log(user)

   //Acessar o IF  se encontrar o registro no banco de dados
   if(user){
      // Pausar processamento e retornar os dados
      return res.json({
         user: user.dataValues
      })
   }else{
      //Pausar o processamento e retornar a mensagem de erro!
      return res.status(400).json({
         message: "ERRO: Nenhum registro encontrado!"
      });
   }
})

//Criar Rota de cadastro
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

// Criar rota editar e receber o parâmetro id enviado da URL
router.put("/users", async (req, res) => {

   // Receber os dados enviados no corpo da requisição
   var dados = req.body;
   //console.log(dados)

   //Editar no banco de dados
   await db.Users.update(dados, {where: {id: dados.id}})
   .then(() => {
      //Pausar o processamento e retornar a mensagem
      return res.json({
         message: "Usuário editado com sucesso!"
      });
   })
   .catch(() => {
      //Pausar o processamento e retornar a mensagem de error
      return res.status(400).json({
         message: `ERRO: Usuário não editado error: `
      });
   });
})

module.exports = router;