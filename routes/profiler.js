const express = require('express');
const router = express.Router();
const controller = require('../controllers/profileC');
const middleware = require('../middleware/auth');

router.post('/', middleware.authUser, controller.create);//create profile
router.get('/', middleware.authUser, controller.show);//get profiles
router.get('/:id',middleware.authUser, controller.findParticular)//particular profile
router.delete('/del', middleware.authProfile, controller.deleteProfile)//delete profile
router.put('/edit',middleware.authProfile, controller.editProfile)//edit profile
module.exports = router;