'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ItemAttributeValueSchema extends Schema {
  up () {
    this.create('item_attribute_values', (table) => {
      table.increments()
      table.string('name_value')
      table.float('additional_value', 8, 2).notNullable().defaultTo(0)
      table.integer('quantity').notNullable()
      table.timestamps()
      table.integer('item_attribute_id').notNullable()
      table.foreign('item_attribute_id').references('item_attributes.id').onDelete('cascade').onUpdate('cascade')
    })
  }

  down () {
    this.drop('item_attribute_values')
  }
}

module.exports = ItemAttributeValueSchema
