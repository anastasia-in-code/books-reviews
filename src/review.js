import query from "./db.js";

const ORDER_BY ={
    ID_DESC: 'id desc',
    ID_ASC: 'id asc'
}

export async function allReviews({orderReviews}) {
    const order = ORDER_BY[orderReviews]
    const sql = `
    select * from hb.review
    order by ${order}
    ;
    `
    try {
        const result = await query(sql)
        return result.rows
    } catch (err) {
        console.log(err)
        throw err;
    }
}