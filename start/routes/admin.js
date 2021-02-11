/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')


Route.group(()=>{
   Route.resource('client', 'ClientController').apiOnly()
   Route.resource('store', 'StoreController').apiOnly()
   Route.resource('category-store', 'CategoryStoreController').apiOnly()

}).prefix('v1/admin').namespace('Admin').middleware(['auth', 'is:admin'])
