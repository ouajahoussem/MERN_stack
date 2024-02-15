const Author = require("../models/author.model")

module.exports.findAllAuthors = (req, res) => {
    Author.find()
        .then((allAuthors) => {
            console.log(">>> Authors.find()  >>>", allAuthors)
            res.json(allAuthors)
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports.findOneAuthor = (req, res) => {
    Author.findOne({ _id: req.params.id })
        .then(oneAuthor => {
            res.json(oneAuthor)
        })
        .catch(err => {
            res.json(err)
        })
}

module.exports.createNewAuthor = (req, res) => {
    Author.create(req.body)
        .then((oneAuthor) => {
            console.log(">>> Author.create()= >>>", oneAuthor)
            res.status(200).json(oneAuthor)
        })
        .catch((err) => {
            res.status(400).json(err)
        })
}
module.exports.updateAuthor = (req, res) => {
    Author.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
        .then(updateAuthor => {
            res.status(200).json(updateAuthor)
        })
        .catch(err => {
            res.status(400).json(err)
        })
}


module.exports.deleteAuthor = (req, res) => {
    Author.deleteOne({ _id: req.params.id })
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            res.json(err)
        })
}
