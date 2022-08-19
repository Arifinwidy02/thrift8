const express = require('express')
const app = express()

const route = require('./route/route')
const session = require('express-session')
const port = process.env.PORT || 3000

app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }))
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false, //untuk login session
  cookie: {
    secure: false, //untuk development, true untuk production
    sameSite: true // tambahan aja untuk security
  }
}))
app.use(route)


app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})