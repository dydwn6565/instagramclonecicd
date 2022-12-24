const pool = require("../pool");
const toCamelCase = require("../utils/to-comel-case");

class UserRepo {
  static async find() {
    const { rows } = await pool.query("SELECT * FROM users;");
    return toCamelCase(rows);
  }

  static async findById(id) {
    const { rows } = await pool.query(`SELECT * FROM users WHERE id= $1;`, [
      id,
    ]);
    return toCamelCase(rows)[0];
  }

  static async findByuserId(userid) {
    const { rows } = await pool.query(`SELECT * FROM users WHERE userid= $1;`, [
      userid,
    ]);
    return toCamelCase(rows)[0];
  }

  static async insert(userId, name, username, password) {
    try {
      const { rows } = await pool.query(
        "INSERT INTO users (userId,name,username,password) VALUES ($1,$2,$3,$4);",
        [userId, name, username, password]
      );
      return true;
    } catch (error) {
      console.log(error);
    }
  }

  static async update(
    id,
    userId,
    name,
    username,
    password,
    bio,
    avatar,
    status
  ) {
    try {
      const { rows } = await pool.query(
        "UPDATE users SET userId= $1, name = $2, usrname=$3, password = $4, bio =$5, avatar=$6,status=$7 Where id=$8",
        [userId, name, username, password, bio, avatar, status, id]
      );
      return toCamelCase(rows)[0];
    } catch (error) {
      console.log(error);
    }
  }

  static async delete(id) {
    try {
      const { rows } = await pool.query(
        `
      DELETE FROM users WHERE id=$1`,
        [id]
      );

      return toCamelCase(rows)[0];
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = UserRepo;
