'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ItemAttributeValueSchema extends Schema {
  up () {
    this.create('item_attribute_values', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('item_attribute_values')
  }
}

module.exports = ItemAttributeValueSchema
