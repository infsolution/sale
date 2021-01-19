'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

require('./auth')
require('./admin')
require('./manager')
require('./client')
Route.get('v1/store','StoreController.index').as('store.all')
Route.get('v1/store/:slug','StoreController.show').as('store.one')
Route.get('v1/store/:slug/product/:id','StoreController.product').as('store.product')
