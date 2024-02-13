const express = require('express')
const app = express()
const router = express.Router()

// predicate the router with a check and bail out when needed

router.get('/ali', (req, res) => {
  res.send('hello, ali!')
})
router.get('/user/:id', (req, res) => {
  res.send('hello, user!')
})
router.use('/admin', (req, res,next) => {
  console.log("first admin destination")
  next('router')
},(req,res)=>{
    console.log("callback")
})
router.use('/admin', (req, res,next) => {
  console.log("ali3")
})
router.use((req, res,next) => {
  console.log("-------------")
})
module.exports=router