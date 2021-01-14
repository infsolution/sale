/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')


Route.group(()=>{
   Route.resource('client', 'ClientController').apiOnly()
   Route.resource('store', 'StoreController').apiOnly()

}).prefix('v1/admin').namespace('Admin').middleware(['auth', 'is:admin'])
