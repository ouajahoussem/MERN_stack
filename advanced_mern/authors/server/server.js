const express = require("express")
const app = express()
const cors = require("cors")

require("dotenv").config()
require("./config/mongoose.config")


const port = process.env.PORT

app.use(express.json(), express.urlencoded({ extended: true }), cors())

require("./routes/author.routes")(app)



app.listen(port, () => console.log(`🌴🌴🌴🌴 Listening on port: ${port}`));