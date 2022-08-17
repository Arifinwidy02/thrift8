const { Product, Category } = require('../models')
const { toRupiah } = require('../helper')
class Controller {
    static register(req, res) {
        res.render('register')
    }

    static home(req, res) {
        let notification = req.query.notification
        Product.findAll({ include: { model: Category } })
            .then(data => {
                res.render('home', { data, toRupiah, notification })
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
                res.redirect(`/home/?notification=${notification}`)
                // res.redirect(`/home`)
            })
            .catch(err => res.send(err))
    }

    static buy(req, res) {
        let id = req.params.productId
        console.log(id);
        Product.decrement({ stock: 1 }, { where: { id } })
            .then(data => {
                res.redirect('/home')
            })
            .catch(err => res.send(err))
    }

}

module.exports = Controller