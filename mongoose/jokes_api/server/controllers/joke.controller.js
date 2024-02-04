const Joke = require("../models/joke.model")

module.exports.findAllJokes = (req, res)=>{
    Joke.find()
        .then((allJokes) => {
            console.log(">>> Joke.find()  >>>", allJokes)
            res.json( allJokes )
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', err })
        });
}
module.exports.createNewJoke =(req ,res)=>{
    Joke.create(req.body)
        .then(oneJoke=>{
            console.log(">>> Joke.create()  >>>", oneJoke)
            res.json(oneJoke)
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', err })
        });
}
module.exports.findOneJoke =(req, res)=>{
    Joke.findOne({_id: req.params.id})
        .then(oneJoke =>{
            res.json(oneJoke)
        })
        .catch((err)=>{
            res.json({ message: 'Something went wrong', err })
        })
}
module.exports.updateOneJoke =(req ,res)=>{
    Joke.findByIdAndUpdate({_id: req.params.id},req.body,{new:true,runValidators:true})
        .then(updateOneJoke=>{
            res.json(updateOneJoke)
    })
    .catch((err)=>{
        res.json({ message: 'Something went wrong', err })
    })
}
module.exports.deleteOneJoke =(req ,res)=>{
    Joke.deleteOne({_id: req.params.id})
        .then(result =>{
            res.json(result)
        })
        .catch((err)=>{
            res.json({ message: 'Something went wrong', err })
        })

}