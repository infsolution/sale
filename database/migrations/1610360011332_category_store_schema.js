'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CategoryStoreSchema extends Schema {
  up () {
    this.create('category_stores', (table) => {
      table.increments()
      table.string('name', 120).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('category_stores')
  }
}

module.exports = CategoryStoreSchema
