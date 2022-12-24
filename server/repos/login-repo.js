const pool = require("../pool");
const toCamelCase = require("../utils/to-comel-case");
class LoginRepo {
  static async find() {
    try {
      const { rows } = await pool.query("SELECT * FROM login;");

      return toCamelCase(rows);
    } catch (error) {
      console.log(error);
    }
  }

  static async insert(lat, long, userid) {
    try {
      const { row } = await pool.query(
        "INSERT INTO login(lat,long,userid) VALUES($1,$2,$3)",
        [lat, long, userid]
      );
      return row;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = LoginRepo;
