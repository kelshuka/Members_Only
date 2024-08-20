const { Router } = require("express");
const indexController = require("../controllers/indexController");
const postRouter = Router();


postRouter.get("/", (req, res) => {
    res.render("pubPosts", {title: "Posts"});
});




module.exports = postRouter;