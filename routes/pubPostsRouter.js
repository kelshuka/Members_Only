const { Router } = require("express");
const postsController = require("../controllers/postsController");
const pubPostRouter = Router();


pubPostRouter.get("/", postsController.getPublicPosts);


pubPostRouter.get("/join-club", postsController.joinClubGet);
pubPostRouter.post("/join-club", postsController.joinClubPost);


module.exports = pubPostRouter;