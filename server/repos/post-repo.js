const pool = require("../pool");
const toCamelCase = require("../utils/to-comel-case");

class PostRepo {
  static async find() {
    try {
      const { rows } = await pool.query(
        "SELECT * FROM posts p INNER JOIN files f ON p.id = f.postid"
      );
      console.log(rows[0]);
      return rows;
    } catch (error) {
      console.log(error);
    }
  }

  static async findById(userid) {
    try {
      const { rows } = await pool.query(
        "SELECT * FROM posts WHERE userid = $1",
        [userid]
      );

      return rows;
    } catch (error) {
      console.log(error);
    }
  }

  static async insert(files, content, lat, long, userid) {
    try {
      const { rows } = await pool.query(
        "INSERT INTO posts(content,lat,long,userid) VALUES($1,$2,$3,$4) RETURNING id",
        [content, lat, long, userid]
      );

      await Promise.all(
        files.map(async (file) => {
          await pool.query(
            "INSERT INTO files(filename,filepath,postid) VALUES($1,$2,$3)",
            [file.originalname, file.location, rows[0].id]
          );
        })
      );
      return 1;
    } catch (error) {
      console.log(error);
    }
  }

  static async update(url, content, lat, long, userId, id) {
    try {
      const { row } = await pool.query(
        "UPDATE posts SET url=$1,content=$2,lat=$3,long=$4,userId=$5 WHERE id=$6",
        [url, content, lat, long, userId, id]
      );
      return row;
    } catch (error) {
      console.log(error);
    }
  }

  static async delete(id) {
    try {
      const { row } = await pool.query("DELETE FROM posts WEHERE id=$1", [id]);

      return row;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = PostRepo;
