import express, { Router } from 'express'
import user from './src/routes/user'
import review from './src/routes/review'
import comment from './src/routes/comment'

require('dotenv').config()



const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/', user)
app.use(review)
app.use(comment)


app.listen(process.env.PORT)


module.exports = Router();