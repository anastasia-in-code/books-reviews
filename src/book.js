import query from "./db.js"

export async function allBooks() {
    const sql = `select * from hb.book`
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