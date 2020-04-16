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

	async references(articleId) {
		try {
			const { data } = await this.query(
				`
					SELECT
						res.value,
						res.type,
						res.year
					FROM refs ref
					JOIN resources res ON res.id = ref.resource_id
					WHERE ref.article_id = $1
				`,
				articleId
			)
			return data
		}
		catch (error) {
			throw new ApolloError(error)
		}
	}
}