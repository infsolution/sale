'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
Route.post('v1/manager/store', 'Manager/StoreController.store').as('store.store').middleware(['auth','is:client'])
Route.group(()=>{
    Route.resource('store', 'StoreController').only(['index','show','edit', 'update', 'destroy'])
    Route.resource('category', 'CategoryController').apiOnly()
    Route.resource('product', 'ProductController')
    Route.resource('attribute', 'AttributeController').apiOnly()
    Route.put('attribute/:attribute_id/product/:product_id', 'AttributeController.edit').as('product.attribute')
    Route.resource('value-attribute', 'AttributeValueController').apiOnly()
    Route.resource('order', 'OrderController').apiOnly()
    Route.resource('client', 'ClientController').apiOnly()
    Route.resource('image', 'ImageController').apiOnly()
}).prefix('v1/manager').namespace('Manager').middleware(['auth','is:manager'])
