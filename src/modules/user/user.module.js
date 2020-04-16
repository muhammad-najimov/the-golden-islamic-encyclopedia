const { gql, } = require('apollo-server-express')

const typeDefs = gql`
	scalar Date!
	input UserFilterInput {
		score: String
		gender: String
		verified: Boolean
	}
	extend type Query {
		users(filter: UserFilterInput): [User!]!
	}
	type User {
		id: Int!
		username: String!
		firstName: String!
		lastName: String!
		gender: String
		score: Int!
		verified: Boolean!
		joined: Date!
	}
`

const resolvers = {
	Query: {},
	Mutation: {},
	User: {}
}

module.exports = { typeDefs, resolvers, }