const Sequelize = require('sequelize')
const sequelize = new Sequelize('node-complete','root','MasterR540',{dialect:'mysql',host:'localhost'});
module.exports = sequelize;