const typeDefs = `
schema {
  query: Query
}
type Query {
  books: [Book]
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
`;

export default typeDefs