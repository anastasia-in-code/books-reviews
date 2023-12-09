import query from "./db.js";
import { groupBy, map } from "ramda";
import DataLoader from 'dataloader'

const ORDER_BY ={
    ID_DESC: 'id desc',
    ID_ASC: 'id asc'
}

const findReviewsByBookIds = async (ids) => {
    const sql = `
    select * from hb.review
    where book_id = ANY($1)
    order by id
    `
    const params =[ids]

    try {
        const result = await query(sql, params)
        const rowsById = groupBy(review => review.bookId, result.rows)
        return map(id => rowsById[id], ids)
    } catch (err) {
        console.log(err)
        throw err;
    }
}

export const findReviewsByBookIdsLoader = () => new DataLoader(findReviewsByBookIds)

export async function allReviews({orderReviews}) {
    const order = ORDER_BY[orderReviews]
    const sql = `
    select * from hb.review
    order by ${order};
    `
    try {
        const result = await query(sql)
        return result.rows
    } catch (err) {
        console.log(err)
        throw err;
    }
}

export const createReview = async(reviewInput) => {
    const {bookId, email, name, rating, title, comment} = reviewInput
    const sql = `select * from hb.create_review($1, $2, $3, $4, $5, $6);`
    const params = [bookId, email, name, rating, title, comment]

    try {
        const result = await query(sql, params)
        return result.rows[0]
    } catch (err) {
        console.log(err)
        throw err;
    }
}