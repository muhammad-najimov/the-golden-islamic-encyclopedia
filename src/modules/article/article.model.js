const { ApolloError, } = require('apollo-server-express')
const CoreModel = require('../../CoreModel')

module.exports = class extends CoreModel {
	constructor() {
		super()
	}

	async all({ username, }) {
		try {
			const { data } = await this.query(
				`
					SELECT
						a.id,
						a.title,
						a.content,
						a.views,
						a.created
					FROM articles a
					ORDER BY views DESC
				`
			)
			return data
		}
		catch (error) {
			throw new ApolloError(error)
		}
	}
}