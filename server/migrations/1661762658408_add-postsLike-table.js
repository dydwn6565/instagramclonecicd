/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE postslike (
        id SERIAL PRIMARY KEY,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        
        userid int references users(id) ON DELETE CASCADE,
        postid int references posts(id) ON DELETE CASCADE

        )`);
};

exports.down = (pgm) => {
  pgm.sql(`
    DROP TABLE postslike;`);
};
