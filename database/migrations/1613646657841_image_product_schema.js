'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ImageProductSchema extends Schema {
  up () {
    this.create('image_product', (table) => {
      table.increments()
      table.timestamps()
      table.integer('image_id').notNullable()
      table.foreign('image_id').references('images.id').onDelete('cascade')
      table.integer('product_id').notNullable()
      table.foreign('product_id').references('products.id').onDelete('cascade')
    })
  }

  down () {
    this.drop('image_product')
  }
}

module.exports = ImageProductSchema
