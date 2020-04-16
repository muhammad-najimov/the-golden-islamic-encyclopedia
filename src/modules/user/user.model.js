const { ApolloError, } = require('apollo-server-express')
const CoreModel = require('../../CoreModel')

module.exports = class extends CoreModel {
	constructor() {
		super()
	}

	async all({ score, gender, verified, }) {
		try {
			const { data } = await this.query(
				`
					SELECT
						u.id,
						u.username,
						u.first_name,
						u.last_name,
						u.gender,
						u.score,
						u.verified,
						u.joined
					FROM users u
					ORDER BY joined DESC
				`
			)
			return data
		}
		catch (error) {
			throw new ApolloError(error)
		}
	}
}