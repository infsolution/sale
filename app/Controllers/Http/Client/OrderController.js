'use strict'

const Store = use('App/Models/Store')
const Order = use('App/Models/Order')
const Attribute = use('App/Models/Attribute')
const ValueAttribute = use('App/Models/ValueAttribute')
const Item = use('App/Models/ItemOrder')
const ItemAttribute = use('App/Models/ItemAttribute')
const ItemAttributeValue = use('App/Models/itemAttributeValue')
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
      const orders = await Order.query().where('user_id', auth.user.id).fetch()
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
        const item_order = await Item.create({product_name:product.name, value:product.value,
          quantity:item.quantity, observation:item.observation, product_id:product.id,
        order_id:order.id})
        await Promise.all(item.attributes.map(async attr=>{
          console.log(attr)
          const attribute = await Attribute.find(attr.attribute_id)
          const order_attribute = await ItemAttribute.create({attribute_name:attribute.title, quantity:attr.quantity})
          await Promise.all(attr.values.map(async value=>{
            console.log(value)
          }))
        }))
        console.log(item_order)
      }))
      return response.status(201).send({order})
    } catch (error) {
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
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing order.
   * GET orders/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update order details.
   * PUT or PATCH orders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a order with id.
   * DELETE orders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = OrderController
