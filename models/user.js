'use strict';
const bcrypt = require('bcrypt')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.Profile)
      User.hasMany(models.Product)
      // define association here
    }
  }
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: 
    {
      type : DataTypes.STRING,
      notEmpty:{
        msg: `role cannot be empthy`
      }
    },
  }, {
    sequelize,
    modelName: 'User',
    hooks: 
    {
      beforeCreate(newUser, options){
        const salt = bcrypt.genSaltSync(8)
        const hash = bcrypt.hashSync(newUser.password, salt)
        newUser.password = hash
      }
    }
  });
  return User;
};