'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Store extends Model {
  manager(){
    return this.belongsTo('App/Models/User')
  }
  categories(){
    return this.hasMany('App/Models/Category')
  }
  address(){
    return this.belongsToMany('App/Models/Address').pivotTable('address_users')
  }
}

module.exports = Store
