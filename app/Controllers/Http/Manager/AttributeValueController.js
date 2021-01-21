'use strict'
const Value = use('App/Models/ValueAttribute')
const Attribute = use('App/Models/Attribute')
const Store = use('App/Models/Store')
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with attributevalues
 */
class AttributeValueController {
  /**
   * Show a list of all attributevalues.
   * GET attributevalues
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
      const values = await Value.query().where('owner',store.id).fetch()
      return response.send({values})
    } catch (error) {
      return response.status(400).send({error:error.message})
    }
  }

  /**
   * Create/save a new attributevalue.
   * POST attributevalues
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    try {
      const data = request.all()
      const store = await Store.findBy('user_id', auth.user.id)
      if(!store){
        return response.status(404).send({message: 'Store not found!'})
      }
      const attribute = await Attribute.query().where('store_id',store.id).where('id', data.attribute_id).first()
      if(!attribute){
        return response.status(404).send({message: 'Attribute not found!'})
      }
      const value = await Value.create({...data, owner:store.id})
      return response.status(201).send({value})
    } catch (error) {
      console.log(error)
      return response.status(400).send({error:error.message})
    }
  }

  /**
   * Display a single attributevalue.
   * GET attributevalues/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, auth }) {
    try {
      const store = await Store.findBy('user_id',auth.user.id)
      if(!store){
        return response.status(404).send({message: 'Store not found!'})
      }
      const value = await Value.query().where('id',params.id)
      .where('owner', store.id).first()
      return response.send({value})
    } catch (error) {
      return response.status(400).send({error:error.message})
    }
  }

  /**
   * Update attributevalue details.
   * PUT or PATCH attributevalues/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response, auth }) {
    try {
      const data = request.all()
      const store = await Store.findBy('user_id',auth.user.id)
      if(!store){
        return response.status(404).send({message: 'Store not found!'})
      }
      const value = await Value.query().where('id',params.id)
      .where('owner', store.id).first()
      value.merge({...data})
      await value.save()
      return response.send({value})
    } catch (error) {
      return response.status(400).send({error:error.message})
    }
  }

  /**
   * Delete a attributevalue with id.
   * DELETE attributevalues/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response, auth }) {
    try {
      const store = await Store.findBy('user_id',auth.user.id)
      if(!store){
        return response.status(404).send({message: 'Store not found!'})
      }
      const value = await Value.query().where('id',params.id)
      .where('owner', store.id).first()
      if(!value){
        return response.status(404).send({message:'Value not found!'})
      }
      await value.delete()
      return response.status(204).send({})
    } catch (error) {
      return response.status(400).send({error:error.message})
    }
  }
}

module.exports = AttributeValueController
