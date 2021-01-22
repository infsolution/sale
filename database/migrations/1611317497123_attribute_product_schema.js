'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateAttributeProductSchema extends Schema {
  up () {
    this.create('attribute_products', (table) => {
      table.increments()
      table.integer('attribute_id').notNullable()
      table.foreign('attribute_id').references('attributes.id').onDelete('cascade')
      table.integer('product_id').notNullable()
      table.foreign('product_id').references('products.id').onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('attribute_products')
  }
}

module.exports = CreateAttributeProductSchema
