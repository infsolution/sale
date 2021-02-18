'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ImageStoreSchema extends Schema {
  up () {
    this.create('image_store', (table) => {
      table.increments()
      table.timestamps()
      table.integer('image_id').notNullable()
      table.foreign('image_id').references('images.id').onDelete('cascade')
      table.integer('store_id').notNullable()
      table.foreign('store_id').references('stores.id').onDelete('cascade')
    })
  }

  down () {
    this.drop('image_store')
  }
}

module.exports = ImageStoreSchema
