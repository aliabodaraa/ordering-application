const express = require('express')
const app = express()
const testDoc = require('./routes/testDoc')
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

app.use(adminRoutes);
app.use(shopRoutes);
app.use(testDoc);

app.use(( req, res, next) => {
    console.log("medium admin destination")
    next()
})
app.use('/admin',( req, res, next) => {
    console.log("second admin destination")
    res.send("last admin destination --go to log to makesense the next('router')")
})
app.use(( req, res, next) => {
    console.log("11111")
})
app.use('/admin',( req, res, next) => {
    console.log("222222222")
})

app.listen(3000)