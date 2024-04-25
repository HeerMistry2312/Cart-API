
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartC');
const middleWare= require('../middleware/auth')
router.get('/',middleWare.authProfile,cartController.showProfileCart)//profile cart
router.post('/add',middleWare.authProfile, cartController.addToCart); //add and update cart
//decrement product quantity
router.post('/del',middleWare.authProfile,cartController.decrementCartItem)
//remove product
router.post('/remove',middleWare.authProfile,cartController.deleteItem)
module.exports = router;

