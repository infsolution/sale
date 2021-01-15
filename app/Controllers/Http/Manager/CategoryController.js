'use strict'
const Store = use('App/Models/Store')
const Category = use('App/Models/Category')
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with categories
 */
class CategoryController {
  /**
   * Show a list of all categories.
   * GET categories
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
        return response.status(404).send({Error:'Store not dound!'})
      }
      const categories = await Category.query().where('store_id',store.id).fetch()
      return response.send({categories})

    } catch (error) {
      return response.status(400).send({error:error.message})
    }
  }



  /**
   * Create/save a new category.
   * POST categories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    try {
      const data = request.all()
      const store = await Store.findBy('user_id',auth.user.id)
      if(!store){
        return response.status(404).send({Error:'Store not found!'})
      }
      const category = await Category.create({...data, store_id:store.id})
      return response.status(201).send({category})
    } catch (error) {
      return response.status(400).send({error:error.message})
    }
  }

  /**
   * Display a single category.
   * GET categories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, auth }) {
    try {
      const store = await Store.findBy('user_id', auth.user.id)
      if(!store){
        return response.status(404).send({Error:'Store not found!'})
      }
      const category = await Category.query().where('store_id', store.id).where('id', params.id).first()
      if(!category){
        return response.status(404).send({Error:'Category not found!'})
      }
      return response.send({category})
    } catch (error) {
      return response.status(400).send({error:error.message})
    }
  }

  /**
   * Update category details.
   * PUT or PATCH categories/:id
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
        return response.status(404).send({Error:'Store not found!'})
      }
      const category = await Category.query().where('store_id', store.id).where('id', params.id).first()
      if(!category){
        return response.status(404).send({Error:'Category not found!'})
      }
      category.merge({...data})
      await category.save()
      return response.send({category})
    } catch (error) {
      return response.status(400).send({error:error.message})
    }
  }

  /**
   * Delete a category with id.
   * DELETE categories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response, auth }) {
    try {
      const store = await Store.findBy('user_id', auth.user.id)
      if(!store){
        return response.status(404).send({Error:'Store not found!'})
      }
      const category = await Category.query().where('store_id', store.id).where('id', params.id).first()
      if(!category){
        return response.status(404).send({Error:'Category not found!'})
      }
      category.delete()
      return response.status(204).send({})
    } catch (error) {
      return response.status(400).send({error:error.message})
    }
  }
}

module.exports = CategoryController
