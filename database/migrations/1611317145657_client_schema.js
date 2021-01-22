'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateClientSchema extends Schema {
  up () {
    this.create('clients', (table) => {
      table.increments()
      table.string('name', 80).notNullable()
      table.timestamps()
      table.integer('store_id').notNullable()
      table.integer('user_id').notNullable()
      table.foreign('store_id').references('stores.id').onDelete('cascade')
      table.foreign('user_id').references('users.id').onDelete('cascade')
    })
  }

  down () {
    this.drop('clients')
  }
}

module.exports = CreateClientSchema
