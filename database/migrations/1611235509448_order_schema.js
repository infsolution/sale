'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderSchema extends Schema {
  up () {
    this.create('orders', (table) => {
      table.increments()
      table.string('message',512)
      table.float('value', 8,2)
      table.enu('status',['RECEBIDO', 'PREPARANDO', 'A CAMINHO', 'ENTREGE', 'CANCELADO'])
      table.integer('user_id').notNullable()
      table.integer('store_id').notNullable()
      table.timestamps()
      table.foreign('user_id').references('users.id').onDelete('cascade')
      table.foreign('store_id').references('stores.id').onDelete('cascade')
    })
  }

  down () {
    this.drop('orders')
  }
}

module.exports = OrderSchema
