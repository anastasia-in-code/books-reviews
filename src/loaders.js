import { findAuthorsByBookIdsLoader } from "./author.js"
import { findBooksByIdLoader } from "./book.js"
import { findUsersByIdsLoader } from "./user.js"
import { findReviewsByBookIdsLoader } from "./review.js"

export default ()  => ({
    findAuthorsByBookIdsLoader : findAuthorsByBookIdsLoader(),
    findBooksByIdLoader: findBooksByIdLoader(),
    findUsersByIdsLoader: findUsersByIdsLoader(),
    findReviewsByBookIdsLoader: findReviewsByBookIdsLoader(),
})
