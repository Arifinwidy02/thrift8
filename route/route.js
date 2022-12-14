const route = require('express').Router()
const userController = require('../controller/auth-controller')
const Controller = require('../controller/controller')
const {isAdmin, isOwner} = require('../middleware/authentification')
//landing page 1.
route.get('/', Controller.landingPage)
route.get('/products', Controller.products)
route.get('/register', userController.register)
route.post('/register', userController.postRegister) 
route.get("/login", userController.login)
route.post("/login", userController.postLogin)


// login --> data session --> disimpan di variabel -- dan bisa dipanggil agar namanya bisa consisten
// logout --> destroy/hapus variabel session
route.use(function (req, res, next) {
    console.log(req.session, 'dari route');
    if (!req.session.UserId) {
        const error = `please login first`
        res.redirect(`/login?err=${error}`)
    } else {
        next()
    }
})

route.get('/add', Controller.add)
route.post('/add', Controller.postAdd)
route.get("/logout", userController.logout)
route.get('/products/checkout', Controller.checkout)
route.get('/products/cart/purchase', Controller.purchase)
route.get('/products/:id/cart/delete', Controller.cartDelete)
route.get('/products/buy/:productId', Controller.buy)
route.get('/products/:productId/delete', isOwner, Controller.delete)





module.exports = route