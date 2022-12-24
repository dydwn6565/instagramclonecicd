// /* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE chatmessages (
        id SERIAL PRIMARY KEY,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        
        text VARCHAR(1000),
        imagepath VARCHAR(100),
        
         roomnumber VARCHAR(50),
        userid int references users(id) ON DELETE CASCADE

        )`);
};

exports.down = (pgm) => {
  pgm.sql(`
    DROP TABLE chatmessage;`);
};
