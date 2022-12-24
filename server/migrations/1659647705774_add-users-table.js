/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.sql(`
    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        userId VARCHAR(100) NOT NULL UNIQUE,
        name VARCHAR(100) NOT NULL,
        password VARCHAR(100) NOT NULL,
        username VARCHAR(30) NOT NULL,
        bio VARCHAR(400),
        avatar VARCHAR(200),
        status VARCHAR(50)
        )`);
};

exports.down = pgm => {
    pgm.sql(`
    DROP TABLE users;`)
};

