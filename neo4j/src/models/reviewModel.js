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

const findAllReviews = async () =>{
    const result = await session.run(`Match (u:Review) return u`)
    return result.records.map(i=>i.get('u').properties)
}

const findReviewById = async (id) =>{
    const result = await session.run(`MATCH (u:Review {_id : '${id}'} ) return u limit 1`)
    return result.records[0].get('u').properties
}
const createReview = async (review) =>{
    const unique_id = nanoid(8)
    await session.run(`CREATE (u:Review {_id : '${unique_id}', title: '${review.title}', rating: '${review.rating}', review: '${review.review}', date: '${review.date}', idUser: '${review.idUser}'}) return u`)
    return await findReviewById(unique_id)
}
const findByIdAndUpdateReview = async (id, review) =>{
    const result = await session.run(`MATCH (u:Review {_id : '${id}'}) SET u.title= '${review.title}', u.rating= '${review.rating}', u.review= '${review.review}' return u`)
    return result.records[0].get('u').properties
}
const findByIdAndDeleteReview = async (id) =>{
    await session.run(`MATCH (u:Review {_id : '${id}'}) DELETE u`)
    return await findAllReviews()
}


export default {
    findAllReviews,
    findReviewById,
    createReview,
    findByIdAndUpdateReview,
    findByIdAndDeleteReview
}