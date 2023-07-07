SEQUENCIA PARA CRIAR UM PROJETO

Criar o arquivo package
### npm init

Em seguida instalar dependências começando com a "express"
### npm install

Com express instalado, no arquivo app.js, mostra como chamamos a função express e criamos as primeiras rotas do projeto.
### app.get('/', (req, res) => {})...

               DATABSE
Agora vamos conectar o projeto ao banco de dados MYSQL
Primeiro instalar o pacote mysql2
### npm i --save mysql2

Depois indo na documentação mysql2 mostra como conectar quando nao tem SEQUELIZE
### const mysql = require('mysql2'); CHAMA NO ARQUIVO APP.JS
E em seguida criar a conexão com DB que está no arquivo
const mysql = require('mysql2');
const connection = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: '',
   database: 'jobs_api'
});

connection.connect((err)=>{
   console.log('Conexão com banco de dados com sucesso.')
})


### Conectar o banco de dados com sequelize sempre seguindo a documentação
Sequelize é uma biblioteca do JS que facilita o gerenciamento do banco de dados SQL
### npm i --save sequelize
Em seguida instalar o banco de dados que será usado, no meu caso MYSQL
### npm i --save mysql2
Vamos instar o sequelize-cli para ultilizar linhas de comando



