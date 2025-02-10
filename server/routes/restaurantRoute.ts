import express from 'express'

import { isAuthenticated } from '../middlewares/isAuthenticated'
import { createRestaurant, getCuisines, getRestaurant, getRestaurants, getSigleRestaurant,  searchRestaurant,  updateRestaurant, uploadRestaurantBanner } from '../controllers/restaurantControllers'




const router = express.Router()




router.route('/:id([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})').get(getSigleRestaurant)
router.route('/').post(isAuthenticated, createRestaurant)
router.route('/upload-banner').post(isAuthenticated, uploadRestaurantBanner)
router.route('/').get(isAuthenticated, getRestaurant)
router.route('/restaurants').get(getRestaurants)
router.route('/').put(isAuthenticated, updateRestaurant)
router.route("/search/:searchText").get(searchRestaurant);
router.route('/cuisines').get(getCuisines);


export default router

