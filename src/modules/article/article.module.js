const { gql, } = require('apollo-server-express')
const moment = require('moment')

const ArticleModel = require('./article.model')
const articleModel = new ArticleModel()

const typeDefs = gql`
	input ArticleFilterInput {
		username: String
	}
	extend type Query {
		articles(filter: ArticleFilterInput): [Article!]!
	}
	type Article {
		id: Int!
		title: String!
		content: String!
		views: Int!
		created: Date!
	}
`

const resolvers = {
	Query: {
		articles: async (global, { filter, }, context) => await articleModel.all({}),
	},
	Mutation: {},
	User: {
		id: async global => global.id,
		title: async global => global.title,
		content: async global => global.content,
		views: async global => global.views,
		created: async global => moment(global.created).fromNow(),
	},
}

module.exports = { typeDefs, resolvers, }