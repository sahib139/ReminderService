const express = require("express");
const router = express.Router();

const {TicketAndMailController} = require("../../controllers/index");

router.post('/tickets',TicketAndMailController.create);

module.exports=router;