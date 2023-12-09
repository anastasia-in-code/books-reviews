import { allBooks, imageUrl, searchBook, createBook } from './book.js'
import { allReviews, createReview } from './review.js';
import gravatar from 'gravatar'

const resolvers = {
    User: {
        imageUrl: (user, args) => gravatar.url(user.email, { s: args.size })
    },
    Book: {
        imageUrl: (book, { size }) => imageUrl(size, book.googleId),
        authors: (book, args, context) => {
            const { loaders } = context;
            const { findAuthorsByBookIdsLoader } = loaders;
            return findAuthorsByBookIdsLoader.load(book.id);
        },
        reviews: (book, args, context) => {
            const { loaders } = context
            const { findReviewsByBookIdsLoader } = loaders
            return findReviewsByBookIdsLoader.load(book.id)
        }
    },
    Review: {
        book: (review, args, context) => {
            const { loaders } = context;
            const { findBooksByIdLoader } = loaders;
            return findBooksByIdLoader.load(review.id)
        },
        user: (review, args, context) => {
            const { loaders } = context;
            const { findUsersByIdsLoader } = loaders;
            return findUsersByIdsLoader.load(review.userId)
        },
    },
    SearchBookResult: {
        imageUrl: (result, args) => imageUrl(args.size, result.id)
    },
    Query: {
        books: (root, args) => {
            return allBooks(args)
        },
        reviews: (root, args) => {
            return allReviews(args)
        },
        book: (root, args, context) => {
            const { loaders } = context;
            const { findBooksByIdLoader } = loaders;
            return findBooksByIdLoader.load(args.bookId)
        },
        searchBook: (root, args) => {
            const { query } = args
            return searchBook(query)
        }
    },
    Mutation: {
        createReview: (root, args) => {
            const { reviewInput } = args
            return createReview(reviewInput)
        },
        createBook: (root, args) => {
            const {googleBookId} = args;
            return createBook(googleBookId)
        }
    }
};

export default resolvers