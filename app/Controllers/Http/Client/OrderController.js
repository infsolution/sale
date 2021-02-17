'use strict'

const Store = use('App/Models/Store')
const Order = use('App/Models/Order')
const Attribute = use('App/Models/Attribute')
const ValueAttribute = use('App/Models/ValueAttribute')
const Item = use('App/Models/ItemOrder')
const Client = use('App/Models/Client')
const User = use('App/Models/User')
const Product = use('App/Models/Product')
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with orders
 */
class OrderController {
  /**
   * Show a list of all orders.
   * GET orders
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, auth }) {
    try {
      const orders = await Order.query().where('user_id', auth.user.id)
      .with('itens')
      .fetch()
      return response.send({orders})
    } catch (error) {
      return response.status(400).send({error:error.message})
    }
  }


  /**
   * Create/save a new order.
   * POST orders
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    try {
      const data = request.all()
      const store = await Store.find(data.store_id)
      if(!store){
        return response.status(404).send({message:'Store not found!'})
      }
      const client = await store.clients()
      .where('user_id', auth.user.id).where('store_id', store.id).first()
      if(!client){
        store.clients().attach([auth.user.id])
      }
      const order = await Order.create({message:data.message, value:data.value,
        status:'RECEBIDO', user_id:auth.user.id, store_id:store.id})
      await Promise.all(data.itens.map(async item=>{
        const product = await Product.find(item.product_id)
        if(!product){
          return response.status(404).send({message:'Product not found!'})
        }
          let description = ''
          let additional = 0
        await Promise.all(item.attributes.map(async attr=>{
          const attribute = await Attribute.find(attr.attribute_id)
          description+= ' '+attribute.title+': '+attr.attribute_description
          additional += attr.quantity * attr.additional_value
        }))
        const item_order = await Item.create({product_name:product.name,
          product_value: product.value,
          value:additional+product.value,
          quantity:item.quantity,
          description:description,
          product_id:product.id, order_id:order.id})
          order.value += item_order.value * item.quantity
      }))
      await order.save()
      return response.status(201).send({order})
    } catch (error) {
      console.log(error)
      return response.status(400).send({error:error.message})
    }
  }

  /**
   * Display a single order.
   * GET orders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, auth }) {
    try {
      const order = await Order.query().where('id',params.id)
      .where('user_id', auth.user.id)
      .with('itens')
      .first()
      if(!order){
        return response.status(404).send({message: 'Order not found!'})
      }
      return response.send({order})
    } catch (error) {
      return response.status(400).send({error:error.message})
    }
  }

  /**
   * Update order details.
   * PUT or PATCH orders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response,auth }) {
    try {
      const data = request.all()
      const order = await Order.query().where('id', params.id)
      .where('user_id', auth.user.id).first()
      if(!order){
        return response.status(404).send({message:'Order not found!'})
      }
      order.merge({...data})
      await order.save()
      return response.send({order})

    } catch (error) {
      return response.status(400).send({error:error.message})
    }
  }

  /**
   * Delete a order with id.
   * DELETE orders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response, auth }) {

  }
}

module.exports = OrderController
