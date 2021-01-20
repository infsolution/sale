'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AttributeSchema extends Schema {
  up () {
    this.create('attributes', (table) => {
      table.increments()
      table.timestamps()
      table.string('title').notNullable()
      table.integer('max_item').notNullable().defaultTo(1)
      table.boolean('required').notNullable().defaultTo(false)
      table.string('description', 256).notNullable()
      table.integer('store_id').notNullable()
      table.foreign('store_id').references('stores.id').onDelete('cascade').onUpdate('cascade')
    })
  }

  down () {
    this.drop('attributes')
  }
}

module.exports = AttributeSchema
