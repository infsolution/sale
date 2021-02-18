'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ImageProductSchema extends Schema {
  up () {
    this.create('images', (table) => {
      table.increments()
      table.timestamps()
      table.string('path',256).notNullable()
      table.integer('owner').notNullable()
    })
  }

  down () {
    this.drop('images')
  }
}

module.exports = ImageProductSchema
