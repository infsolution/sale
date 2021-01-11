'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const User = use('App/Models/User')
const Store = use('App/Models/Store')
const Address = use('App/Models/Address')
const Category = use('App/Models/CategoryStore')
const Role = use('Role')
class UserSeeder {
  async run () {
    const roleClient = await Role.findBy('slug','client')
    const roleManeger = await Role.findBy('slug', 'manager')
    const roleAdmin = await Role.findBy('slug', 'admin')

    const clients = await Factory.model('App/Models/User').createMany(3)
    await Promise.all(
      clients.map(async client => {
        await client.roles().attach([roleClient.id])
      })
    )
    const admin = await User.create({
      name: 'Cicero Leonardo',
      username: 'Cicero',
      email: 'cicero@email.com',
      password: '123456',
      phone: '88888-8888'
    })
    await admin.roles().attach([roleAdmin.id])

    const manager = await User.create({
      name: 'Rafaela Sousa',
      username: 'Raphaella',
      email: 'raphaella@email.com',
      password: '123456',
      phone: '2222-2222'
    })
    await manager.roles().attach([roleManeger.id])
    const category = await Category.create({
      name:'Pizzaria'
    })
    const address = await Address.create({
      street:'Quadra U',
      number: '8',
      district:'Joao Emilio Falcão',
      city:'Timon',
      state:'MA',
      country:'Brazil',
      zipcode:'65631020',
      reference:'Quarta rua'
    })
    const store = await Store.create({
      name:'Bazinga Pizzaria',
      cnpj:'125496166313515',
      address_id:address.id,
      category_store_id:category.id,
      user_id:manager.id
    })
  }
}

module.exports = UserSeeder
