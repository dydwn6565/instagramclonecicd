/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE files (
        id SERIAL PRIMARY KEY,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        
        filename VARCHAR(200) NOT NULL,
        filepath VARCHAR(200) NOT NULL,
        
        
        postid int references posts(id) ON DELETE CASCADE

        )`);
};

exports.down = (pgm) => {
  pgm.sql(`
    DROP TABLE files;`);
};
