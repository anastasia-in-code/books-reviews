import query from "./db.js";
import { groupBy, map } from "ramda";
import DataLoader from 'dataloader'

export async function userById (id) {
    const sql = `
    select * from hb.user
    where id = $1;`

    const params = [id]
    try {
        const result = await query(sql, params)
        return result.rows[0]
    } catch (err) {
        console.log(err)
        throw err
    }
}

export async function usersByIds (ids) {
    const sql = `
    select * from hb.user
    where id = ANY($1);`

    const params = [ids]
    try {
        const result = await query(sql, params)
        const rowsById = groupBy(user => user.id, result.rows)
        return map(id => {
            const user = rowsById[id] ? rowsById[id][0] : null
            return user
        }, ids)
    } catch (err) {
        console.log(err)
        throw err
    }
}

export function findUsersByIdsLoader() {
    return new DataLoader(usersByIds)
}