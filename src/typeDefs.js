const typeDefs = `
schema {
  query: Query
}
type Query {
  books(orderBy: BooksOrderBy = RATING_DESC): [Book]
  reviews(orderReviews: ReviewsOrderBy = ID_DESC): [Review]
  book(bookId: ID!): Book
}
type Book {
    id: ID!
    ratingCount: Int
    title: String!
    imageUrl(size: ImageSize = LARGE): String!
    description: String!
    rating: Float
    subtitle: String
    authors: [Author]
    reviews: [Review]
}
enum ImageSize {
    SMALL
    LARGE
}
enum BooksOrderBy {
    ID_DESC
    RATING_DESC
}
enum ReviewsOrderBy {
    ID_DESC
    ID_ASC
}
type Author {
    id: ID!
    name: String
}
type Review {
    id: ID!
    rating: Int
    title: String
    comment: String
    book: Book
    user: User
}
type User {
    id: ID!
    email: String
    name: String
    tokens: String
    createdAt: String
    imageUrl(size: Int =50): String
}
`;

export default typeDefs