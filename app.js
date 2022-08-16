const express = require('express')
const app = express()
const port = 3000
const route = require('./route/route')


app.set("view engine", "ejs")
app.set(express.urlencoded({extended:true}))
app.use(route)


app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})