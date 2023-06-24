const Sequelize = require('sequelize');
const path = require('path');
const fs = require('fs');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);
db.sequelize = sequelize;

const basename = path.basename(__filename);
fs.readdirSync(__dirname)
  .filter( file => {
    return (file !== basename) && (file.slice(-3) === '.js') && (file.indexOf('.') !==0)
  })
  .forEach(file =>{
    const model = require(path.join(__dirname,file));
    db[model.name] = model;
    model.initiate(sequelize);
  });

Object.keys(db).forEach(model=>{
  if(db[model].associate){
    db[model].associate(db);
  }
});

module.exports = db;