import { Router } from "express";
import res from "express/lib/response";
import reviewModel from '../models/reviewModel'


const review = Router()

review.get('/findReviews', async (req,res)=>{
    const result = await reviewModel.findAllReviews()
    res.json(result)
})

review.get('/findReviews/:id', async (req,res)=>{
    const result = await reviewModel.findAllReviews()
    res.json(result)
})

review.post('/createReview', async (req,res)=>{
    const result = await reviewModel.createReview(req.body)
    res.json(result)
})

review.put('/updateReview/id', async (req,res)=>{
    const result = await review.findByIdAndUpdateReview()
    res.json(result)
})

review.delete('/deleteReview/id', async (req,res)=>{
    const result = await review.findByIdAndDeleteReview()
    res.json(result)
})




export default review
