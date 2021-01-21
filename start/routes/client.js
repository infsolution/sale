'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
Route.group(()=>{
  Route.resource('order','OrderController').apiOnly()
}).prefix('v1/client').namespace('Client').middleware(['auth','is:client'])
