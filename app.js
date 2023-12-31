
//Incluir bibliotecas
//Gerenciar as requisições, rotas e URLs, entre outras funcionalidades
const express = require('express');
//Chamando a função EXPRESS
const app = express();
//Incluindo o MYSQL e em seguida Criar a conexão com banco de dados
const mysql = require('mysql2');
const db = require("./db/models");

//Criar um middleware para receber os dados no corpo da requisição
app.use(express.json());

// Incluir controllers
const users = require('./controllers/users');

//Criar rotas
app.use('/', users);


/*
const connection = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: '',
   database: 'jobs_api'
});

connection.connect((err)=>{
   console.log('Conexão com banco de dados com sucesso.')
})
*/


//Criar a rota tipo GET  direcionando para a raiz do projeto
app.get('/', (req, res) => {
   res.send('Welcome to the portal 8080');
})

//Criando outra rota tipo GET direcionando para pagina Jobs
app.get('/jobs', (req, res) => {
   res.send('Welcome to the portal to Jobs');
})


//Mostra que o express está escutando a portaa para as req e res
app.listen(8080, () => {
   console.log('Server listening on port 8080');
});