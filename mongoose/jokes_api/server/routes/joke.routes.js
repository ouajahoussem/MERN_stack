const JokeController = require("../controllers/joke.controller")

module.exports = app =>{
    app.get("/api/jokes", JokeController.findAllJokes)
    app.get("/api/jokes/:id", JokeController.findOneJoke)
    app.patch("/api/jokes/:id", JokeController.updateOneJoke)
    app.post("/api/jokes", JokeController.createNewJoke)
    app.delete("/api/jokes/:id", JokeController.deleteOneJoke)
}