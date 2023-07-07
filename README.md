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

Vamos instar o sequelize-cli para ultilizar linhas de comando usada para criar modelos,
configurações e arquivos de migração de banco de dados
### npm i --save-dev sequelize-cli

Agora criar o arquivo de configuração do seequilize, Cria varias pastas de arquivos para configuração do sequelize
### npx sequelize-cli init

Para organizar, criar um diretório db, e sem seguida colocar todos diretórios do sequelize no "db"
Em seguida no diretório CONFIG, alterar o arquivo que está em json para js
e exportar para usar suas credênciais do banco de dados quando nao se tem variaveis de ambientes.
### config.json - config.js
### modules.exports = {alterar as credenciais}

Logo depois ir para o diretório models/index.js, e alterar a const config =..., pois está com o arquivo config.json

Criar o banco de dados no MYSQL diretamente para evitar erros
### CREATE DATABASE jobs_api CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
