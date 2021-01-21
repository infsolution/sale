'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ItemAttributeSchema extends Schema {
  up () {
    this.create('item_attributes', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('item_attributes')
  }
}

module.exports = ItemAttributeSchema
