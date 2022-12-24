// /* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE stories (
        id SERIAL PRIMARY KEY,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        url VARCHAR(500) NOT NULL ,
        heading VARCHAR(50) ,
        subheading VARCHAR(50) ,
        profileImage VARCHAR(150) ,
        type VARCHAR(50),
        duration INTEGER,
        
        userid int references users(id) ON DELETE CASCADE

        )`);
};

exports.down = (pgm) => {
  pgm.sql(`
    DROP TABLE stories;`);
};
