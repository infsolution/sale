'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
Route.post('v1/manager/store', 'Manager/StoreController.store').as('store.store').middleware(['auth','is:client'])
Route.group(()=>{
    Route.resource('store', 'StoreController').only(['index','show', 'update', 'destroy'])
    Route.resource('category', 'CategoryController').apiOnly()
    Route.resource('product', 'ProductController').apiOnly()
}).prefix('v1/manager').namespace('Manager').middleware(['auth','is:manager'])
