// /* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE chatrooms (
        id SERIAL PRIMARY KEY,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        roomnumber VARCHAR(50),
        
       
        userid int references users(id) ON DELETE CASCADE
        )`);
};

exports.down = (pgm) => {
  pgm.sql(`
    DROP TABLE posts;`);
};
      
