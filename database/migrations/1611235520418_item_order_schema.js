'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ItemOrderSchema extends Schema {
  up () {
    this.create('item_orders', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('item_orders')
  }
}

module.exports = ItemOrderSchema
