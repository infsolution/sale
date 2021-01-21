'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StoreSchema extends Schema {
  up () {
    this.create('stores', (table) => {
      table.increments()
      table.string('name',80).notNullable().unique()
      table.string('slug',80).notNullable().unique()
      table.string('cnpj',15)
      table.integer('category_store_id').unsigned().notNullable()
      table.integer('user_id').unsigned().notNullable()
      table.foreign('category_store_id').references('category_stores.id').onDelete('set null')
      table.foreign('user_id').references('users.id').onDelete('set null')

      table.timestamps()
    })
  }

  down () {
    this.drop('stores')
  }
}

module.exports = StoreSchema
