'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Order extends Model {
  itens(){
    return this.hasMany('App/Models/ItemOrder')
  }
  client(){
    return this.hasOne('App/Models/User')
  }
  store(){
    return this.hasOne('App/Models/Store')
  }
}

module.exports = Order
