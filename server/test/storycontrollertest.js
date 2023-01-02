const expect = require("chai").expect;
const pool = require("../pool");
const StoryRepo = require("../repos/story-repo.js");

describe("story insert and check find query", function () {
  it("story insert and check find query", async function () {
    try {
      await pool.query(
        "INSERT INTO stories (url,heading,subheading,profileImage,userId) VALUES ('https://picsum.photos/1080/1920','Mohit Karekar','Posted 5h ago','https://picsum.photos/1000/1000',1)"
      );

      await pool.query(
        "INSERT INTO stories (url,heading,subheading,profileImage,userId) VALUES ('https://fsa.zobj.net/crop.php?r=dyJ08vhfPsUL3UkJ2aFaLo1LK5lhjA_5o6qEmWe7CW6P4bdk5Se2tYqxc8M3tcgYCwKp0IAyf0cmw9yCmOviFYb5JteeZgYClrug_bvSGgQxKGEUjH9H3s7PS9fQa3rpK3DN3nx-qA-mf6XN','Mohit Karekar','Posted 32m ago', 'https://picsum.photos/1000/1000',1);"
      );
      await pool.query(
        "INSERT INTO stories (url,heading,subheading,profileImage,userId) VALUES ('https://images.unsplash.com/photo-1565506737357-af89222625ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80','mohitk05/react-insta-stories','Posted 32m ago','https://picsum.photos/1000/1000',1);"
      );

      const stories = await StoryRepo.find();

      expect(stories[0].id).to.equal(1);
      expect(stories[0].url).to.equal("https://picsum.photos/1080/1920");
      expect(stories[0].heading).to.equal("Mohit Karekar");
      expect(stories[0].subheading).to.equal("Posted 5h ago");
      expect(stories[0].profileimage).to.equal(
        "https://picsum.photos/1000/1000"
      );
      expect(stories[0].type).to.equal(null);
      expect(stories[0].duration).to.equal(null);
      expect(stories[0].userid).to.equal(1);
    } catch (error) {
      console.log(error);
    }
  });
});
