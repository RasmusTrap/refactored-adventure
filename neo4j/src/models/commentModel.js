import { nanoid } from 'nanoid';

const neo4j = require('neo4j-driver');
require('dotenv').config()
const {
    url,
    db_username,
    db_password,
    database,
} = process.env
const driver = neo4j.driver(url, neo4j.auth.basic(db_username, db_password));
const session = driver.session({ database });

const findAllComments = async () =>{
    const result = await session.run(`Match (u:Comment) return u`)
    return result.records.map(i=>i.get('u').properties)
}

const findCommentById = async (id) =>{
    const result = await session.run(`MATCH (u:Comment {_id : '${id}'} ) return u limit 1`)
    return result.records[0].get('u').properties
}
const createComment = async (comment) =>{
    const unique_id = nanoid(16)
    await session.run(`CREATE (u:Comment {_id : '${unique_id}', idUser: '${comment.idUser}', reviewId: '${comment.reviewId}', UserComment: '${comment.UserComment}', date: '${comment.date}'} ) return u`)
    return await findCommentById(unique_id)
}
const findByIdAndUpdateComment = async (id, comment) =>{
    const result = await session.run(`MATCH (u:Comment {_id : '${id}'}) SET u.comment= '${comment.comment}' return u`)
    return result.records[0].get('u').properties
}
const findByIdAndDeleteComment = async (id) =>{
    await session.run(`MATCH (u:Comment {_id : '${id}'}) DELETE u`)
    return await findAllComments()
}



export default {
    findAllComments,
    findCommentById,
    createComment,
    findByIdAndUpdateComment,
    findByIdAndDeleteComment
}