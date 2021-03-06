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

CREATE TABLE resources (
	id bigserial NOT NULL,
	value character varying(256) NOT NULL,
	type int NOT NULL,
	year character varying(4),
	PRIMARY KEY(id)
);

CREATE TABLE refs (
	id bigserial NOT NULL,
	article_id bigint REFERENCES articles(id),
	resource_id bigint REFERENCES resources(id),
	PRIMARY KEY(id)
);

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

INSERT INTO languages (
	code,
	label
) VALUES (
	'uz_lat',
	'O''zbekcha (Lotin)'
);

INSERT INTO categories (
	name,
	language
) VALUES (
	'sahoba',
	1
);

INSERT INTO articles (
	title,
	content,
	language,
	category_id
) VALUES (
	'ABDULLOH IBN MAS''UD',
	'To''liq ismi Abdulloh ibn Mas''ud ibn Rofiya ibn Habib al-Xuzaliy. Kunyasi - Abu Abdurahmon (590-653). Buyuk faqih va mujtahidlardan biri, Muhammad sollalohu alayhi vasallam xizmatlarida turgan zotlardan. Shu sababli Qur''oni karimni hammadan yaxshi o''rgangan, juda ko''p hadis eshitgan va yod bilgan.',
	1,
	1
);

INSERT INTO resources (
	value,
	type,
	year
) VALUES (
	'http://islom.ziyouz.com',
	1,
	NULL
);

INSERT INTO refs (
	article_id,
	resource_id
) VALUES (
	1,
	1
);
