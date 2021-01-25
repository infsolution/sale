'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ItemAttributeSchema extends Schema {
  up () {
    this.create('item_attributes', (table) => {
      table.increments()
      table.string('attribute_name').notNullable()
      table.integer('quantity').notNullable()
      table.timestamps()
      table.integer('item_order_id').notNullable()
      table.foreign('item_order_id').references('item_orders.id').onDelete('cascade').onUpdate('cascade')
    })
  }

  down () {
    this.drop('item_attributes')
  }
}

module.exports = ItemAttributeSchema
