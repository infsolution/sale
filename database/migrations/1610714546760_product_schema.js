'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductSchema extends Schema {
  up () {
    this.create('products', (table) => {
      table.increments()
      table.string('name')
      table.float('value', 8, 2)
      table.timestamps()
      table.integer('ranking').notNullable().defaultTo(0)
      table.integer('category_id')
      table.foreign('category_id').references('categories.id').onDelete('cascade')
    })
  }

  down () {
    this.drop('products')
  }
}

module.exports = ProductSchema
