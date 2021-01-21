'use strict'
const Attribue = use('App/Models/Attribute')
const Store = use('App/Models/Store')
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with attributes
 */
class AttributeController {
  /**
   * Show a list of all attributes.
   * GET attributes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, auth }) {
    try {
      const store = await Store.findBy('user_id', auth.user.id)
      if(!store){
        return response.status(404).send({message: 'Store not found!'})
      }
      const attributes = await Attribue.query().where('store_id', store.id).fetch()
      return response.send({attributes})
    } catch (error) {
      return response.status(400).send({error:error.message})
    }
  }


  /**
   * Create/save a new attribute.
   * POST attributes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    try {
      const data = request.all()
      const store = await Store.findBy('user_id', auth.user.id)
      const attribute = await Attribue.create({...data, store_id:store.id, owner:store.id})
      return response.status(201).send({attribute})
    } catch (error) {
      return response.status(400).send({error:error.message})
    }
  }

  /**
   * Display a single attribute.
   * GET attributes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, auth }) {
    try {
      const data = request.all()
      const store = await Store.findBy('user_id', auth.user.id)
      if(!store){
        return response.status(404).send({message: 'Store not found!'})
      }
      const attribute = await Attribue.query().where('store_id', store.id)
      .where('id', params.id)
      .with('values')
      .first()
      return response.send({attribute})
    } catch (error) {
      console.log(error)
      return response.status(400).send({error:error.message})
    }
  }


  /**
   * Update attribute details.
   * PUT or PATCH attributes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response, auth }) {
    try {
      const data = request.all()
      const store = await Store.findBy('user_id', auth.user.id)
      if(!store){
        return response.status(404).send({message: 'Store not found!'})
      }
      const attribute = await Attribue.query().where('store_id', store.id).where('id', params.id).first()
      attribute.merge({...data})
      await attribute.save()
      return response.send({attribute})
    } catch (error) {
      console.log(error)
      return response.status(400).send({error:error.message})
    }
  }

  /**
   * Delete a attribute with id.
   * DELETE attributes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response, auth }) {
    try {
      const store = await Store.findBy('user_id', auth.user.id)
      if(!store){
        return response.status(404).send({message: 'Store not found!'})
      }
      const attribute = await Attribue.query().where('store_id', store.id).where('id', params.id).first()
      await attribute.delete()
      return response.status(204).send({})
    } catch (error) {
      console.log(error)
      return response.status(400).send({error:error.message})
    }
  }
}

module.exports = AttributeController
