//Normatizar o código, ajuda a evitar gambiarras
'use strict';

//Chamando a variavel de ambiente
require('dotenv').config();
// Permite trabalhar com o sistema do PC
const fs = require('fs');
// Fornece ultilitários para trabalhar com caminhos de arquivos e diretórios
const path = require('path');
// Sequelize é um ORM para Node.js, que tem vários bancos de dados
// ORM mapeamento objeto-relacional, as tabelas de bancos de dados são representadas em classes e os registros das tabelas seriam instâncias dessas classes
const Sequelize = require('sequelize');
// Permite obter informações do processo da pag atual
const process = require('process');
// Permite obter parte do caminho para o arquivo
const basename = path.basename(__filename);
// Verifica se usa a variávela global ou a 'development'
const env = process.env.NODE_ENV || 'development';
// Incluir o arquivo
const config = require(__dirname + '/../config/config.js')[env];
// Criar a constance com objeto vazio
const db = {};

// Criar a variável que recebe a conexão com banco de dados
let sequelize;
// Verificar qual configuração de banco de dados você deseja usar
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  // Usar as configurações do arquivo "config/database.js"
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

/*
// Testar a conexão com banco de dados

try {
  console.log('Realizado com sucesso')
}catch(e) {

}
*/

// Identificar o MODEL
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// ATRIBUIR A CONEXÃO COM BANCO DE DADOS PARA OBJETO DB
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Exportar a instrução que está dentro da constante db
module.exports = db;
