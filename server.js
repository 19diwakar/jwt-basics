require('dotenv').config()
require('express-async-error')

const express = require('express')
const app = express();

const notFoundMiddleware = require('./middleware/not_found')
const errorHandlerMiddleware = require('./middleware/error_handler')

const connectDB = require('./db/connect')

//middleware
app.use(express.static('./public'))
app.use(express.json())

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.port || 3000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(
            port,
            console.log(`Listening 👂👂👂 on http://localhost:${port}`)
        )
    } catch (err) {
        console.log(err)
    }
}

start()