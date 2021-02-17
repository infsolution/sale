'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ImageStoreSchema extends Schema {
  up () {
    this.create('image_stores', (table) => {
      table.increments()
      table.timestamps()
      table.string('path',256).notNullable()
      table.integer('store_id').notNullable()
      table.foreign('store_id').references('stores.id').onDelete('cascade')
    })
  }

  down () {
    this.drop('image_stores')
  }
}

module.exports = ImageStoreSchema
