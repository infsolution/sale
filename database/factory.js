'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

Factory.blueprint('App/Models/User', (faker) => {
  return {
   name:faker.first(),
   username: faker.username(),
   email: faker.email({domain: 'sale.com'}),
   password: '123456',
   phone: faker.phone()
  }
})

Factory.blueprint('App/Models/Address', (faker)=>{
  return{
     street: faker.name(),
     number: faker.integer({min:1, max:9999}),
     district: faker.first(),
     city: faker.first(),
     state: faker.first(),
     country: faker.first(),
     zipcode: faker.integer({min: 111111111, max: 999999999 }),
     reference: faker.sentence()
  }
})
