import { allBooks, imageUrl } from './book.js'
import { authorsByBookId } from './author.js';

const resolvers = {
    Book: {
        imageUrl: (book, { size }) => imageUrl(size, book.googleId),
        authors: (book, args, context) => {
            const { loaders } = context;
            const { findAuthorsByBookIdsLoader } = loaders;
            return findAuthorsByBookIdsLoader.load(book.id);
          },
    },
    Query: {
        books: () => {
            return allBooks()
        },
    },
};

export default resolvers