"use strict";

import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';

// grant all privileges on imad.* to 'imad'@'localhost' identified by "GanD1do*4";

const sequelize = new Sequelize(
  'imad',
  'imad',
  'GanD1do*4',
  {
    dialect : 'mysql',
    host : 'localhost'
  }
);
let db = {};

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
