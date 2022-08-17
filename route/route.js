const route = require('express').Router()
const userController = require('../controller/auth-controller')
const Controller = require('../controller/controller')
const {isAdmin, isOwner} = require('../middleware/authentification')
//landing page 1.
route.get('/', Controller.register)
route.get('/home', Controller.home)
route.get('/register', userController.register)
route.post('/register', userController.postRegister) //regsiter 2.

route.get('/home/buy/:productId', Controller.buy)
route.get('/home/:productId/delete', Controller.delete)

route.get("/login", userController.login)
route.post("/login", userController.postLogin)




module.exports = route