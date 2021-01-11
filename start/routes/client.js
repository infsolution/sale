'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
Route.group(()=>{
  //Route.post('order', 'ItemCardController.store').as('order.store')
  //Route.resource('user','UserController').only(['show','update','delete'])
}).prefix('v1/client').namespace('Client').middleware(['auth','is:client'])
