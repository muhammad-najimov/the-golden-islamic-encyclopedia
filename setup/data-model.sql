CREATE EXTENSION pgcrypto;

CREATE TABLE users (
	id bigserial NOT NULL,
	username character varying(40) NOT NULL,
	password character varying(60) NOT NULL,
	first_name character varying(40) NOT NULL,
	last_name character varying(40) NOT NULL,
	gender boolean DEFAULT NULL NOT NULL,
	score bigint DEFAULT 0,
	verified boolean DEFAULT FALSE,
	joined timestamptz DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY(id)
);

CREATE UNIQUE INDEX username_index ON users (LOWER(username));

CREATE TABLE languages (
	id bigserial NOT NULL,
	code character varying(6) NOT NULL,
	label character varying(30) NOT NULL,
	PRIMARY KEY(id)
);
CREATE INDEX language_index ON languages(code);

CREATE TABLE categories (
	id bigserial NOT NULL,
	name character varying(40) NOT NULL,
	language bigint NOT NULL REFERENCES languages(id),
	PRIMARY KEY(id)
);

CREATE INDEX category_index ON categories(name, language);

CREATE TABLE articles (
	id bigserial NOT NULL,
	title character varying(96) NOT NULL,
	content text NOT NULL,
	language bigint NOT NULL REFERENCES languages(id),
	category_id bigint NOT NULL REFERENCES categories(id),
	views bigint DEFAULT 0,
	created timestamptz DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY(id)
);

CREATE INDEX article_index ON articles(language, category_id);


-- INSERT DATA

INSERT INTO users (
	username,
	password,
	first_name,
	last_name,
	gender
) VALUES (
	'muhammad',
	crypt('muhammad', gen_salt('bf')),
	'Muhammad',
	'Najimov',
	TRUE
);


