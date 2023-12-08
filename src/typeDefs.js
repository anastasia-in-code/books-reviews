const typeDefs = `
schema {
  query: Query
}
type Query {
  books: [Book]
  reviews: [Review]
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
}
enum ImageSize {
    SMALL
    LARGE
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
}
`;

export default typeDefs