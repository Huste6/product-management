const express = require("express")
const router = express.Router();
const controller = require("../../controllers/client/chat.controller")
const ChatMiddleware = require("../../middlewares/client/chat.middleware");

router.get('/:roomChatId',ChatMiddleware.isAccess,controller.index);

module.exports = router;