import express from 'express'
import { Request, Response } from "express";
import { isAuthenticated } from '../middlewares/isAuthenticated'
import { createCheckoutSession, getOrders, getRestaurantOrders, webhook } from '../controllers/orderController';




const router = express.Router()

router.route('/create/create_checkout_session').post(isAuthenticated, createCheckoutSession)
router.route('/webhook').post(express.raw({type: 'application/json'}), webhook)
router.route('/').get(isAuthenticated, getOrders)
router.route('/admin_orders').get(isAuthenticated, getRestaurantOrders)



export default router
