'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CategorySchema extends Schema {
  up () {
    this.create('categories', (table) => {
      table.increments()
      table.string('name')
      table.integer('store_id')
      table.integer('owner').notNullable()
      table.timestamps()
      table.foreign('store_id').references('stores.id').onDelete('cascade')
    })
  }
  down () {
    this.drop('categories')
  }
}

module.exports = CategorySchema
