'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateClientSchema extends Schema {
  up () {
    this.create('store_user', (table) => {
      table.increments()
      table.timestamps()
      table.integer('store_id').notNullable()
      table.integer('user_id').notNullable()
      table.foreign('store_id').references('stores.id').onDelete('cascade')
      table.foreign('user_id').references('users.id').onDelete('cascade')
    })
  }

  down () {
    this.drop('store_user')
  }
}

module.exports = CreateClientSchema
