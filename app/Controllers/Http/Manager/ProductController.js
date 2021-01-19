'use strict'
 const Product = use('App/Models/Product')
 const Store = use('App/Models/Store')
 const Category = use('App/Models/Category')
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with products
 */
class ProductController {
  /**
   * Show a list of all products.
   * GET products
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, auth }) {
    try {
      const products = []
      const store = await Store.findBy('user_id', auth.user.id)
      if(!store){
        return response.status(404).send({Error:'Store not dound!'})
      }
      const categories = await Category.query().where('store_id',store.id).fetch()
      await Promise.all(categories.rows.map(async category=>{
        const prods = await Product.query().where('category_id', category.id).fetch()
        await Promise.all(
          prods.rows.map(async prod=>{
            products.push(prod)
          })
        )
      }))
      return response.send({products})
    } catch (error) {
      return response.status(400).send({error:error.message})
    }
  }


  /**
   * Create/save a new product.
   * POST products
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    try {
      const data = request.all()
      const product = await Product.create({...data})
      return response.status(201).send({product})
    } catch (error) {
      return response.status(400).send({error:error.message})
    }
  }

  /**
   * Display a single product.
   * GET products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, auth }) {
    try {
      const product = await Product.query().where('id', params.id).fetch()
      return response.send({product})
    } catch (error) {
      return response.status(400).send({error:error.message})
    }
  }


  /**
   * Update product details.
   * PUT or PATCH products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    try {
      const data = request.all()
      const product = await Product.query().where('id', params.id).first()
      product.merge({...data})
      await product.save()
      return response.send({product})
    } catch (error) {
      return response.status(400).send({error:error.message})
    }
  }

  /**
   * Delete a product with id.
   * DELETE products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    try {
      const product = await Product.query().where('id', params.id).first()
      product.delete()
      return response.status(204).send({})
    } catch (error) {
      return response.status(400).send({error:error.message})
    }
  }
}

module.exports = ProductController
