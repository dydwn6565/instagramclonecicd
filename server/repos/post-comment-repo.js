const pool = require("../pool");
const toCamelCase = require("../utils/to-comel-case");
class PostCommentRepo {
  static async findById({ postid }) {
    try {
      const { rows } = await pool.query(
        `SELECT comment,postid,u.id as userid,username,avatar FROM postscomment pc  INNER JOIN users u ON pc.userid = u.id WHERE postid =${postid};`
      );

      return toCamelCase(rows);
    } catch (error) {
      console.log(error);
    }
  }
  static async insert({ comment, userid, postid }) {
    try {
      const { rows } = await pool.query(
        "INSERT INTO postscomment(comment,userid,postid) VALUES($1,$2,$3) ",
        [comment, userid, postid]
      );
      return true;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = PostCommentRepo;
