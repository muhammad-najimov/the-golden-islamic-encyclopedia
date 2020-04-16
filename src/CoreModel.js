const { Pool, } = require('pg')

const POOL = new Pool({
	host: 'localhost',
	port: 5432,
	user: 'muhammad',
	password: 'muhammad',
	database: 'islamic_encyclopedia',
})

module.exports = class CoreModel {

	constructor() {
		this.pool = this.pool || POOL
	}

	async query(SQL, ...params) {
		const client = await this.pool.connect()
		try {
			const { rowCount: count, rows: data, } = await client.query(SQL, params.length ? params : null)
			return { count, data, }
		}
		finally {
			client.release()
		}
	}
}