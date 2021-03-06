const { gql, } = require('apollo-server-express')
const moment = require('moment')

const UserModel = require('./user.model')
const userModel = new UserModel()

const typeDefs = gql`
	scalar Date
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
		users: async (global, { filter, }, context) => await userModel.all({}),
	},
	Mutation: {},
	User: {
		id: async global => global.id,
		username: async global => global.username,
		firstName: async global => global.first_name,
		lastName: async global => global.last_name,
		gender: async global => global.gender !== null ? global.gender ? 'Male': 'Female' : null,
		score: async global => global.score,
		verified: async global => global.verified,
		joined: async global => moment(global.joined).fromNow(),
	},
}

module.exports = { typeDefs, resolvers, }