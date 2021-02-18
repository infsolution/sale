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
      const store = await Store.findBy('user_id', auth.user.id)
      if(!store){
        return response.status(404).send({Error:'Store not dound!'})
      }
      const products = await Product.query().where('owner',store.id).fetch()
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
  async store ({ request, response, auth }) {
    try {
      const data = request.all()
      const store = await Store.findBy('user_id', auth.user.id)
      if(!store){
        return response.status(404).send({message:'Store not found!'})
      }
      const product = await Product.create({...data, owner: store.id})
      return response.status(201).send({product})
    } catch (error) {
      return response.status(400).send({error:error.message})
    }
  }
  /**
   * GET products/:id/edit
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.auth
   */
  async edit ({ params, request, response, auth }) {
    try {
      const {images} = request.all()
      const product = await Product.find(params.id)
      if(!product){
        return response.status(404).send({message:'Product not found!'})
      }
      await product.images().attach(images)
      return response.send({message:'Images add'})
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
      const store = await Store.findBy('user_id', auth.user.id)
      if(!store){
        return response.status(404).send({message:'Store not found!'})
      }
      const product = await Product.query().where('id', params.id)
      .where('owner', store.id)
      .with('images')
      .first()
      if(!product){
        return response.status(404).send({message:'Product not found!'})
      }
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
  async update ({ params, request, response, auth }) {
    try {
      const data = request.all()
      const store = await Store.findBy('user_id', auth.user.id)
      if(!store){
        return response.status(404).send({message:'Store not found!'})
      }
      const product = await Product.query().where('id', params.id)
      .where('owner', store.id)
      .first()
      if(!product){
        return response.status(404).send({message:'Product not found!'})
      }
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
  async destroy ({ params, request, response, auth }) {
    try {
      const store = await Store.findBy('user_id', auth.user.id)
      if(!store){
        return response.status(404).send({message:'Store not found!'})
      }
      const product = await Product.query().where('id', params.id)
      .where('owner', store.id)
      .first()
      if(!product){
        return response.status(404).send({message:'Product not found!'})
      }
      await product.delete()
      return response.status(204).send({})
    } catch (error) {
      return response.status(400).send({error:error.message})
    }
  }
}

module.exports = ProductController
