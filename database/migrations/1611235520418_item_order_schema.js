'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ItemOrderSchema extends Schema {
  up () {
    this.create('item_orders', (table) => {
      table.increments()
      table.string('product_name', 256).notNullable()
      table.float('product_value', 8, 2).notNullable()
      table.integer('quantity').notNullable()
      table.float('value', 8, 2).notNullable()
      table.string('observation')
      table.integer('order_id').notNullable()
      table.integer('product_id').notNullable()
      table.foreign('order_id').references('orders.id').onDelete('cascade').onUpdate('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('item_orders')
  }
}

module.exports = ItemOrderSchema
