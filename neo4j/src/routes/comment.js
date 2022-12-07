import { Router } from "express";
import res from "express/lib/response";
import commentModel from '../models/commentModel'


const comment = Router()

comment.get('/findComments', async (req,res)=>{
    const result = await commentModel.findAllComments()
    res.json(result)
})

comment.get('/findComments/:id', async (req,res)=>{
    const result = await commentModel.findAllComments()
    res.json(result)
})

comment.post('/createComment', async (req,res)=>{
    const result = await commentModel.createComment(req.body)
    res.json(result)
})

comment.put('/updateComment/id', async (req,res)=>{
    const result = await comment.findByIdAndUpdateComment()
    res.json(result)
})

comment.delete('/deleteComment/id', async (req,res)=>{
    const result = await comment.findByIdAndDeleteComment()
    res.json(result)
})




export default comment
