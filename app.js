const express = require('express')
const app = express()
const route = require('./route/route')
const port = 3000

app.set("view engine", "ejs")
app.use(express.urlencoded({extended:true}))
app.use(route)
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})