'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddressUserSchema extends Schema {
  up () {
    this.create('address_users', (table) => {
      table.increments()
      table.integer('address_id').notNullable()
      table.integer('user_id')
      table.integer('store_id')
      table.timestamps()
    })
  }

  down () {
    this.drop('address_users')
  }
}

module.exports = AddressUserSchema
