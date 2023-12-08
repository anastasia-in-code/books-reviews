import { findAuthorsByBookIdsLoader } from "./author.js"
import { findBooksByIdLoader } from "./book.js"
import { findUsersByIdsLoader } from "./user.js"

export default ()  => ({
    findAuthorsByBookIdsLoader : findAuthorsByBookIdsLoader(),
    findBooksByIdLoader: findBooksByIdLoader(),
    findUsersByIdsLoader: findUsersByIdsLoader(),
})
