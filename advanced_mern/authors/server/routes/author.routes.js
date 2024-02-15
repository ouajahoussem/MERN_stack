const AuthorControllers = require("../controllers/author.controller")

module.exports = app => {
    app.get("/api/authors", AuthorControllers.findAllAuthors)
    app.get("/api/authors/:id", AuthorControllers.findOneAuthor)
    app.post("/api/authors", AuthorControllers.createNewAuthor)
    app.patch("/api/authors/:id", AuthorControllers.updateAuthor)
    app.delete("/api/authors/:id", AuthorControllers.deleteAuthor)
} 