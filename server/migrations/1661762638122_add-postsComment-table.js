/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE postscomment (
        id SERIAL PRIMARY KEY,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        
        comment VARCHAR(500) NOT NULL,
        userid int references users(id) ON DELETE CASCADE,
        postid int references posts(id) ON DELETE CASCADE

        )`);
};

exports.down = (pgm) => {
  pgm.sql(`
    DROP TABLE postscomment;`);
};
