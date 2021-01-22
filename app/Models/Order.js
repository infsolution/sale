'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Order extends Model {
  itens(){
    return this.hasMany('App/Models/ItemOrder')
  }
}

module.exports = Order
