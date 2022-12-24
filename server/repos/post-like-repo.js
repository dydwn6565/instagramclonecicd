const pool = require("../pool");
const toCamelCase = require("../utils/to-comel-case");

class PostLikeRepo {
  static async find() {
    try {
      const { rows } = await pool.query("SELECT * FROM postslike;");

      return toCamelCase(rows);
    } catch (error) {
      console.log(error);
    }
  }

  static async insert({ userid, postid }) {
    try {
      const { rows } = await pool.query(
        "INSERT INTO postslike(userid,postid) VALUES($1,$2) ",
        [userid, postid]
      );
    } catch (error) {
      console.log(error);
    }
  }

  static async delete({ userid, postid }) {
    try {
      const { rows } = await pool.query(
        `
      DELETE FROM postslike WHERE userid=$1 AND postid =$2 `,
        [userid, postid]
      );

      return toCamelCase(rows)[0];
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = PostLikeRepo;
