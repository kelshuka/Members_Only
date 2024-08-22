const { Router } = require("express");
const postsController = require("../controllers/postsController");
const pubPostRouter = Router();


pubPostRouter.get("/", (req, res) => {
    res.render("pubPosts", {title: "Publick Posts"});
});


pubPostRouter.get("/join-club", postsController.joinClubGet);
pubPostRouter.post("/join-club", postsController.joinClubPost);


module.exports = pubPostRouter;