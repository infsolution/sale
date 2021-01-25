'use strict'
const Store = use('App/Models/Store')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with orders
 */
class ClientController {
    /**
   * Show a list of all clients.
   * GET clients
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, auth }) {
    try {
      const store = await Store.findBy('user_id', auth.user.id)
      const clients = await store.clients().load()
      return response.send({clients})
    } catch (error) {
      return response.status(400).send({error:error.message})
    }
  }

}

module.exports = ClientController
