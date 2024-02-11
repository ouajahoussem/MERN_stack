const Product = require("../models/product.model")

module.exports.findAllProducts = (req, res) => {
    Product.find()
        .then((allProducts) => {
            console.log(">>> Product.find()  >>>", allProducts)
            res.json(allProducts)
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports.findOneProduct = (req, res) => {
    Product.findOne({ _id: req.params.id })
        .then(oneProduct => {
            res.json(oneProduct)
        })
        .catch(err => {
            res.json(err)
        })
}

module.exports.createNewProduct = (req, res) => {
    Product.create(req.body)
        .then((oneProduct) => {
            console.log(">>> Product.create()= >>>", oneProduct)
            res.status(200).json(oneProduct)
        })
        .catch((err) => {
            res.status(400).json(err)
        })
}
module.exports.updateProduct = (req, res) => {
    Product.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
        .then(updateProduct => {
            res.status(200).json(updateProduct)
        })
        .catch(err => {
            res.status(400).json(err)
        })
}


module.exports.deleteProduct = (req, res) => {
    Product.deleteOne({ _id: req.params.id })
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            res.json(err)
        })
}
