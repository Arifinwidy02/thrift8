'use strict';
const toRupiah = require('../helper/helper')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.User)
      Product.belongsTo(models.Category)
      Product.hasMany(models.Cart)
      // define association here
    }
  //  formatedUnit() {
  //     return `${this.stock} Package`
  //   }
  //   get formatedPrice(){
  //     return toRupiah(this.price)
  //   }
    get unit() {
      return `${this.stock} Package`
    }
    formatedPrice(input){
      return toRupiah(input)
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: `name cannot be empthy`
        }
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: `imageUrl cannot be empthy`
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate:{
        notEmpty:{
          msg: `Price cannot be empthy`
        },
        isStock(value){
          if(value > 1000000){
            throw new Error(`price must be under Rp. 1000.000,-`)
          }
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      validate:{
        notEmpty:{
          msg: `UserId cannot be empthy`
        }
      }
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      validate:{
        notEmpty:{
          msg: `Category cannot be empthy`
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate:{
        notEmpty:{
          msg: `Category cannot be empthy`
        },
        isStock(value){
          if(value < 1 || value > 50){
            throw new Error(`stock must be between 1 and 50`)
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
    hooks:{
      beforeCreate(newData,option){
        newData.UserId = 1
      }
    }
  });
  return Product;
};