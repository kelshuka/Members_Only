const { Router } = require("express");
const postsController = require("../controllers/postsController");
const postRouter = Router();





postRouter.get("/", postsController.getAllPosts);

postRouter.get("/createMessage", postsController.membersMessagesGet);
postRouter.post("/createMessage", postsController.membersMessagesPost);



module.exports = postRouter;