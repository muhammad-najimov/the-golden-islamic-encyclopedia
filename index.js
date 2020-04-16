const http = require('http')
const express = require('express')
const cors = require('cors')
const PORT = process.env.PORT || 4000
const { ApolloServer, PubSub, } = require('apollo-server-express')

const app = express()
app.use(cors())

;(async () => {
	const server = new ApolloServer({
		modules: [],
		context: () => {
			return { pubSub: new PubSub(), }
		},
	}, )
	server.applyMiddleware({ app, path: '/graphql' })
	const httpServer = http.createServer(app)
	server.installSubscriptionHandlers(httpServer)
	await httpServer.listen({ port: PORT, }, () => {
		console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
		console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`);
	})
})()