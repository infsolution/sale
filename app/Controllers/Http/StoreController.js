'use strict'
const Store = use('App/Models/Store')
const Product = use('App/Models/Product')
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with stores
 */
class StoreController {
  /**
   * Show a list of all stores.
   * GET stores
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    try {
      const stores = await Store.all()
      return response.send({stores})
    } catch (error) {
      return response.status(400).send({error:error.message})
    }
  }

  /**
   * Create/save a new store.
   * POST stores
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single store.
   * GET stores/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    try {
      const store = await Store.query()
      .where('slug', params.slug)
      .with('categories', (builder)=>{
        return builder.with('products').fetch()
      })
      .with('address')
      .first()
      return response.send({store})
    } catch (error) {
      return response.status(400).send({error:error.message})
    }
  }

  /**
   * Render a form to update an existing store.
   * GET stores/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update store details.
   * PUT or PATCH stores/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a store with id.
   * DELETE stores/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }


   /**
   * Products a store with id.
   * Products products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async product ({ params, request, response }) {
    try {
      const store = await Store.findBy('slug',params.slug)
      if(!store){
        return response.status(404).send({message: 'Store not found!'})
      }
      const product = await Product.query().where('id', params.id).first()
      return response.send({product})
    } catch (error) {
      return response.status(400).send({error:error.message})
    }
  }



}

module.exports = StoreController
