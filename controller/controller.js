const { Product, Category, Cart } = require('../models')
const { toRupiah } = require('../helper')
const { Op } = require('sequelize')

class Controller {
    static landingPage(req, res) {
        console.log(req.session, 'req session yang home');
        res.render('landingPage')
    }
    static register(req, res) {
        res.render('register')
    }

    static products(req, res) {
        const session = req.session
        let notification = req.query.notification
        let search = req.query.search
        let include = { include: { model: Category } }
        let option = include
        if (search) {
            option = {
                ...include,
                where: { name: { [Op.iLike]: `%${search}%` } }
            }
        }
        console.log(option);
        Product.findAll(option)
            .then(data => {
                // res.send(data)
                res.render('products', { data, notification, session, toRupiah })
            })
            .catch(err => res.send(err))
    }

    static delete(req, res) {
        let id = +req.params.productId
        let namaProduct;
        Product.findByPk(id)
            .then(data => {
                namaProduct = data.name
                return Product.destroy({ where: { id: id } })
            })
            .then(data => {
                let notification = `Product with name ${namaProduct} has been removed`
                res.redirect(`/products/?notification=${notification}`)
            })
            .catch(err => res.send(err))
    }

    static buy(req, res) {
        let id = req.params.productId

        Product.findOne({ where: { id: id } })
            .then(data => {
                const { name, price, id } = data
                return Cart.create({ name, price, ProductId: +id })
            })
            .then(result => {
                res.redirect('/products')
            })
            .catch(err => {
                res.send(err)
            })
    }
    static checkout(req, res) {
        const session = req.session
        Cart.findAll()
            .then(data => {
                res.render('checkout', { data, session, toRupiah })
            })
            .catch(err => {
                res.send(err)
            })
    }
    static cartDelete(req, res) {
        Cart.destroy({ where: { id: req.params.id } })
            .then(result => {
                res.redirect(`/products/cart/purchase`)
            })
            .catch(err => {
                res.send(err)
            })
    }
    static purchase(req, res) {
        let tempId = []
        Cart.findAll()
            .then(data => {
                data.forEach(el => {
                    tempId.push(el.ProductId)
                })
                tempId.forEach(el => {
                    Product.decrement({ stock: 1 }, { where: { id: el } })
                })
                return
            })
            .then((result) => {
                return Cart.destroy({
                    where: {},
                    truncate: true
                })
            })
            .then((result) => {
                res.redirect('/products')
            })
            .catch(err => {
                res.send(err)
            })
    }
    static add(req, res) {
        const errors = req.query
        res.render('add', { errors })
    }
    static postAdd(req, res) {
        let data = req.body
        Product.create(data)
            .then(e => {
                res.redirect("/products")
            })
            .catch(err => {
                let errors = err
                if (err.name == "SequelizeValidationError") {
                    errors = err.errors.map(el => {
                        return el.message
                    })
                }
                // console.log(errors);
                // res.send(errors)
                res.redirect(`/add/?err=${errors}`)
            })
    }

}

module.exports = Controller