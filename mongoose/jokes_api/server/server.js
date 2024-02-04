const express = require("express")
const app = express()

app.use(express.json(),express.urlencoded({extended: true}));

require("dotenv").config()
require("./config/mongoose.config")

const port = process.env.port
require("./routes/joke.routes")(app)

app.listen(port, () => console.log(`The server is all fired up on port: ${port}`));