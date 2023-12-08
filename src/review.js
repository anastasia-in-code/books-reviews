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