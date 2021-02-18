'use strict'

const Store = use('App/Models/Store')
const Role = use('Role')
const Database = use('Database')
const User = use('App/Models/User')

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
  async index ({ request, response, auth }) {
    try {
      const store = await Store.query().where('user_id', auth.user.id)
      .with('address')
      .with('images')
      .first()
      return response.send({store})
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
  async store ({ request, response, auth }) {
    const trx = await Database.beginTransaction()
    try {
      const data = request.all()
      const user = await User.find(auth.user.id)
      const userRole = await Role.findBy('slug', 'manager')
      //await user.roles().detach()
      await user.roles().attach([userRole.id], null, trx)
      const store = await Store.create({...data, user_id:user.id},trx)
      await trx.commit()
      return response.status(201).send({store})
    } catch (error) {
      console.log(error)
      await trx.rollback()
      return response.status(400).send({error:error.message})
    }
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
  }

  /**
   * Render a form to update an existing store.
   * GET stores/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.auth
   */
  async edit ({ params, request, response, auth }) {
    try {
      const {images} = request.all()
      const store = await Store.find(params.id)
      if(!store){
        return response.status(404).send({message:'Store not found!'})
      }
      await store.images().attach(images)
      return response.send({message:'Images add'})
    } catch (error) {
      return response.status(400).send({error:error.message})
    }
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
}

module.exports = StoreController
