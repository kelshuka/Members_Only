const passport = require("passport");
const asyncHandler = require('express-async-handler');
const { validationResult } = require('express-validator');
const db = require("../db/queries");

const validateJoinPassword = require('../middleware/validateJoinPassword');
const validateMessage = require('../middleware/validateMessage');
/* const validateAdminPassword = require('../middleware/validateAdminPassWord'); */



// Join club
const joinClubGet = asyncHandler( async (req,res) => {
    res.render("joinForm", {title: 'Join Club Form'});
});

const joinClubPost = [
    //validateGame,
    validateJoinPassword,
    
    asyncHandler( async (req, res, next) => {
    
        const allErrors = validationResult(req);
        if(!allErrors.isEmpty()){
            return res.status(400).render('joinForm',
                {
                    title: "Join Club Form", errors: allErrors.array(),                 
                });
        };


        await db.setMember(req.user.id);
        res.redirect("/posts");
    }),
];

//Add Message

const membersMessagesGet = asyncHandler( async (req, res) => {
    res.render("messageForm", {title: 'Message Form'});
});

const membersMessagesPost = [
    validateMessage,
    asyncHandler( async (req, res, next) => {
    
        const allErrors = validationResult(req);
        if(!allErrors.isEmpty()){
            return res.status(400).render('messageForm',
                {
                    title: "Message Form", errors: allErrors.array(),                 
                });
        };

        const {messageTitle, message } = req.body;
        console.log(messageTitle);
        await db.addMessage(req.user.id, messageTitle, message);
        res.redirect("/posts");
    }),
];


//Get messages
const getAllPosts = asyncHandler( async (req, res) => {
    const allMessages = await db.fetchMessages();
    //console.log(allMessages);
    res.render("posts", {title: "Posts", messages: allMessages});
});





module.exports = {
    joinClubGet,
    joinClubPost,
    membersMessagesGet,
    membersMessagesPost,
    getAllPosts
};