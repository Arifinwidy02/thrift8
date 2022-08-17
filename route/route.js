const route = require('express').Router()
const userController = require('../controller/auth-controller')
const Controller = require('../controller/controller')
const {isAdmin, isOwner} = require('../middleware/authentification')
//landing page 1.
route.get('/', Controller.home)
route.get('/register', userController.register)
route.post('/register', userController.postRegister) //regsiter 2.
route.get("/login", userController.login)
route.post("/login", userController.postLogin)
 //login 3.
// route.get("/product") // 4. --> 
// ngurangin produc
//nambahin product
// delete product
//

module.exports = route