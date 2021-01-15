'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Store extends Model {
  manager(){
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Store
