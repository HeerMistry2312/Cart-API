const express = require("express")
const ucontrol = require('../controllers/userC')
const pcontrol = require('../controllers/profileC')
const middleWare = require('../middleware/auth')

const router = express.Router()
router.post('/SignUp', ucontrol.create)//signup
router.post('/login', ucontrol.login)//login
router.delete('/deleteProfile/:id', middleWare.authUser,pcontrol.deleteProfile)//delete pfrofile from user
router.delete('/removeUser/:id',middleWare.authUser, ucontrol.removeUser)//remove user
router.patch('/edit/:id',middleWare.authUser, ucontrol.editUser)//edit user
module.exports = router