'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class CategoryStore extends Model {
  stores(){
    return this.hasMany('App/Models/Store')
  }
}

module.exports = CategoryStore
