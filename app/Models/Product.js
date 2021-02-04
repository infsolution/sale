'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Product extends Model {
  category(){
    return this.belongsTo('App/Models/Category')
  }
  attributes(){
    return this.belongsToMany('App/Models/Attribute')
  }
}

module.exports = Product
