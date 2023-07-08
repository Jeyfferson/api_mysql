SEQUENCIA PARA CRIAR UM PROJETO

Criar o arquivo package
### npm init

Em seguida instalar dependências começando com a "express"
### npm install

Com express instalado, no arquivo app.js, mostra como chamamos a função express e criamos as primeiras rotas do projeto.
### app.get('/', (req, res) => {})...

               DATABSE
### Agora vamos conectar o projeto ao banco de dados MYSQL
Primeiro instalar o pacote mysql2
npm i --save mysql2
###

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
npm i --save sequelize
Em seguida instalar o banco de dados que será usado, no meu caso MYSQL
npm i --save mysql2
###

### Vamos instar o sequelize-cli para ultilizar linhas de comando usada para criar modelos,
configurações e arquivos de migração de banco de dados
npm i --save-dev sequelize-cli
###

Agora criar o arquivo de configuração do seequilize, Cria varias pastas de arquivos para configuração do sequelize
### npx sequelize-cli init

### Para organizar, criar um diretório db, e sem seguida colocar todos diretórios do sequelize no "db"
Em seguida no diretório CONFIG, alterar o arquivo que está em json para js
e exportar para usar suas credênciais do banco de dados quando nao se tem variaveis de ambientes.
config.json - config.js
modules.exports = {alterar as credenciais}
###

Logo depois ir para o diretório models/index.js, e alterar a const config =..., pois está com o arquivo config.json

Criar o banco de dados no MYSQL diretamente para evitar erros
### CREATE DATABASE jobs_api CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

### Criando variaveis de ambientes (SEMPRE VENDO A DOCUMENTAÇÃO)
npm i --save dotenv
Depois de criar a chamada para variaveis de ambientes na "config", incluir tbm no arquivo que faz conexão com db, "models/index.js"
require('dotenv').config()
###

                      MIGRATE
Primeiro vamos indicar onde está os diretórios do sequelize(models, config...), criar um arquivo na raiz de .sequelizerc
depois de criado o arquivo seguindo a documentação

### Criar uma migrate passo a passo
npx sequelize-cli migration:generate --name create-users
Em seguida configurar o arquivo da migration create
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email:{
        type: Sequelize.TEXT,
      },
      createdAt:{
        type: Sequelize.TEXT,
      },
      updatedAt:{
        type: Sequelize.TEXT,
      },
    });

  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');

  }
};
###

### Editando uma tabela ja existente
 npx sequelize-cli migration:generate --name alter-users
Assim criara nova migration para alteração
###

### DESFAZER ROLLBACK: - Permite que seja desfeita a migration desejada, para versionamento. 
Criando uma rollback na migration, caso precise retornar ao passo anterior se fez algo de errado ou aconteceu alguma coisa
Na mesma migrate que quer refazer, apenas usar a function "down" que está esperando apenas os parametros.
async down (queryInterface, Sequelize) {
  return queryInterface.sequelize.transaction( t => {
    return Promise.all([
      queryInterface.removeColumn('Users', 'image', {transaction: t}), 
    ]);
  });
}
***  npx sequelize-cli db:migrate:undo --name (nome da migrate desejada)
###



Depois de criar o arquivo migration, agora exercutar
EXECUTAR MIGRATIONS
### npx sequelize-cli db:migrate

### Criar uma model users
npx sequelize-cli model:genetare --name (nome da model) --attributes name:string,email:string,image:string

### Começando a cadastrar, pegando os dados no mysql atraves da API
Criar um diretório na raiz com nome de "controllers", em seguida o arquivo "users.js"
no users.js chamar express, e em uma contante criar express.Router, apenas para rotas e exportar e importar no app.js
No app.js "const users = require('./controllers/users')" invocar o arquivo das rotas e comecar usar

