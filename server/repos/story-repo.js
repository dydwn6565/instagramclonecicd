const pool = require("../pool");
const toCamelCase = require("../utils/to-comel-case");

class StoryRepo {
  static async find() {
    const { rows } = await pool.query("SELECT * FROM stories;");

    return toCamelCase(rows);
  }
}

module.exports = StoryRepo;
