'use strict'
const Category = use('App/Models/CategoryStore')
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with categorystores
 */
class CategoryStoreController {
  /**
   * Show a list of all categorystores.
   * GET categorystores
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, auth }) {
    try {
      const categories = await Category.all()
      return response.send({categories})
    } catch (error) {
      return response.status(400).send({error:error.message})
    }
  }


  /**
   * Create/save a new categorystore.
   * POST categorystores
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    try {
      const data = request.all()
      const category = await Category.create({...data})
      return response.status(201).send({category})
    } catch (error) {
      return response.status(400).send({error:error.message})
    }
  }

  /**
   * Display a single categorystore.
   * GET categorystores/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    try {
      //console.log(request.qs)
      const category = await Category.query(params.id).first()
      if(!category){
        return response.status(404).send({message:'Category not found!'})
      }
      return response.send({category})
    } catch (error) {
      return response.status(400).send({error:error.message})
    }
  }


  /**
   * Update categorystore details.
   * PUT or PATCH categorystores/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    try {
      const data = request.all()
      const category = await Category.find(params.id)
      if(!category){
        return response.status(404).send({message:'Category not found!'})
      }
      category.merge({...data})
      await category.save()
      return response.send({category})
    } catch (error) {
      return response.status(400).send({error:error.message})
    }
  }

  /**
   * Delete a categorystore with id.
   * DELETE categorystores/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    try {
      const category = await Category.find(params.id)
      if(!category){
        return response.status(404).send({message:'Category not found!'})
      }
      await category.delete()
      return response.status(204).send({})
    } catch (error) {
      return response.status(400).send({error:error.message})
    }
  }
}

module.exports = CategoryStoreController
