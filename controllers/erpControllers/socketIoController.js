const express = require('express');
const router = express.Router();
const Order = require('./../../models/erpModels/Order')

/**
 *  Get all order of a Model
 *  @param {Object} req.params
 *  @returns {Object} Results with pagination
 */
router.get('/', async (req, res) => {
    try {
        console.log('come');
        const orders = await Order.find().sort({ "created": -1 })
        return res.status(200).send({
            success: true,
            orders,
            message: 'Successfult get orders',
        });
    } catch (error) {
        res.send(error)
    }
})

router.post('/', async (req, res) => {
    try {
        console.log('come in post')
        const order = new Order(req.body)
        await order.save()
        const orders = await Order.find().sort({ "created": -1 })
        req.io.emit('order-added', orders)
        return res.status(201).send({
            success: true,
            orders,
            message: 'Successfully Created orders',
        });
    } catch (error) {
        console.log('error', error)
        res.send(error)
    }
})

module.exports = router
