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
	Query: {
		users: asycn (global, { filter, }, context) => await [],
	},
	Mutation: {},
	User: {
		id: async global => global.id,
		username: async global => global.username,
		firstName: async global => global.first_name,
		lastName: async global => global.last_name,
		gender: async global => global.gender,
		score: async global => global.score,
		verified: async global => global.verified,
		joined: async global => global.joined,
	},
}

module.exports = { typeDefs, resolvers, }