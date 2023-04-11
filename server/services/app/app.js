if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 4002
app.use(express.urlencoded({extended: true}))
app.use(express.json())
const cors = require('cors')
app.use(cors())
const errorHandler = require('./middlewares/errorHandler')
const routes  = require('./routes/index');

//main routes
app.use("/", routes)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})