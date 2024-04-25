const express = require('express');
const router = express.Router();
const controller = require('../controllers/productC');
const middleware = require('../middleware/auth');
router.post('/admin/add', controller.addProduct);//create
router.delete('/admin/display/:id', controller.deleteProduct)//delete by admin
router.put('/admin/edit/:id', controller.editProduct)//edit by admin
router.get('/display', controller.showProduct);//display
module.exports = router