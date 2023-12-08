import query from "./db.js"
import { groupBy, map } from "ramda";
import DataLoader from 'dataloader'

export async function findBooksByIds(ids) {
    const sql = `
    select * 
    from hb.book
    where hb.book.id=ANY($1);`
    
    const params = [ids]
    try {
        const result = await query(sql, params)
        const rowsById = groupBy(book => book.id, result.rows)
        return map(id => {
            const book = rowsById[id] ? rowsById[id][0] : null
            return book
        }, ids)
    } catch (err) {
        console.log(err)
        throw err
    }
}

export function findBooksByIdLoader() {
    return new DataLoader(findBooksByIds)
}

export async function findBookById(id) {
    const sql = `
    select * 
    from hb.book
    where hb.book.id=$1;`
    
    const params = [id]
    try {
        const result = await query(sql, params)
        return result.rows[0]
    } catch (err) {
        console.log(err)
        throw err
    }
}

const ORDER_BY ={
    ID_DESC: 'id desc',
    RATING_DESC: 'rating desc'
}

export async function allBooks({orderBy}) {
    const order = ORDER_BY[orderBy]
    const sql = `select * from hb.book
    order by ${order}`
    try {
        const result = await query(sql)
        return result.rows
    } catch (err) {
        console.log(err)
        throw err
    }
}

export function imageUrl(size, id) {
    const zoom = size === "SMALL" ? 1 : 0
    return `//books.google.com/books/content?printsec=frontcover&img=1&edge=curl&source=gbs_api&zoom=${zoom}&id=${id}`
}