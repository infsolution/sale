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
      const values_list = []
      const store = await Store.findBy('user_id', auth.user.id)
      if(!store){
        return response.status(404).send({message: 'Store not found!'})
      }
      const attributes = await Attribute.query().where('store_id',store.id).fetch()
      await Promise.all(
        attributes.rows.map(async attribute=>{
          const values = await Value.query().where('attribute_id', attribute.id).fetch()
          await Promise.all(
            values.rows.map(async value=>{
              values_list.push(value)
            })
          )
        })
      )
      return response.send({values_list})
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
      const value = await Value.create({...data})
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

    } catch (error) {
      return response.status(400).send({error:error.message})
    }
  }

  /**
   * Render a form to update an existing attributevalue.
   * GET attributevalues/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update attributevalue details.
   * PUT or PATCH attributevalues/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a attributevalue with id.
   * DELETE attributevalues/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = AttributeValueController
