const typeDefs = `
schema {
  query: Query
  mutation: Mutation
}

# root query
type Query {
  # books
  books(
    # book sorting order 
    orderBy: BooksOrderBy = RATING_DESC): [Book]
  # book reviews
  reviews(
    # reviews sorting order 
    orderReviews: ReviewsOrderBy = ID_DESC): [Review]
  # specific book
  book(
    # book id
    bookId: ID!): Book
  # seach
  searchBook(
    # search value
    query: String!): [SearchBookResult]
}

type Mutation {
    createReview(reviewInput: ReviewInput!) : Review
    createBook(googleBookId: ID!): Book
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
type SearchBookResult {
    id: ID!
    title: String!
    description: String!
    authors: [Author]
    imageUrl(size: ImageSize = LARGE): String!
}
input ReviewInput {
    bookId: ID!
    rating: Int!
    name: String!
    email: String!
    title: String!
    comment: String!
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