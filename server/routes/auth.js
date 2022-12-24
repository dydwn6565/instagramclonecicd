const express = require("express");
const userRepo = require("../repos/user-repo");
const bcrypt = require("bcrypt");
const jwtToken = require("../utils/is-auth");
const jwt = require("jsonwebtoken");

const router = express.Router();
let refreshTokens = [];

router.post("/login", async (req, res) => {
  try {
    const { userid, password } = req.body;

    const user = await userRepo.findByuserId(userid);
    console.log(user);

    if (!user.id)
      return res.status(401).json({ error: "username is incorrect" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(401).json({ error: "Incorrect password" });

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "100m",
    });

    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
    refreshTokens.push(refreshToken);

    // res.cookie("token", tokens, { httpOnly: true });

    res
      .status(200)
      .json({ accessToken: accessToken, refreshToken: refreshToken });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

router.post("/token", (req, res) => {
  const refreshToken = req.body.token;

  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "15s",
    });
    res.json({ accessToken: accessToken });
  });
});

router.delete("/logout", (req, res) => {
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  res.sendStatus(204);
});

// router.get("/refresh_token", (req, res) => {
//   try {
//     const refreshToken = req.cookies.refresh_token;
//     if (refreshToken === null)
//       return res.status(401).json({ error: "Null refresh token" });
//     jwt.verify(
//       refreshToken,
//       process.env.REFRESH_TOKEN_SECRET,
//       (error, user) => {
//         if (error) return res.status(403).json({ error: error.message });
//         let tokens = jwtToken(user);
//         res.cookie("refresh_token", tokens.refreshToken, {
//           httpOnly: true,
//         });
//         res.json(tokens);
//       }
//     );
//     console.log(refreshToken);
//   } catch (error) {
//     res.status(401).json({ error: error.message });
//   }
// });

// router.delete('/refresh_token',(req,res)=>{
//     try{
//         res.clearCookie('refresh_token');
//         return res.status(200).json({message:'refresh token deleted'})
//     }catch(error){
//         res.status(401).json({error: error.message});
//     }
// })

module.exports = router;
