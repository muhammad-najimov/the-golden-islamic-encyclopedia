const { gql, } = require('apollo-server-express')

const typeDefs = gql``

const resolvers = {
	Query: {},
	Mutation: {},
	User: {}
}

module.exports = { typeDefs, resolvers, }