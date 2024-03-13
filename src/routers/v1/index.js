const express = require("express");
const router = express.Router();
const TicketAndEmailApi = require("./TicketAndEmail");

router.use(TicketAndEmailApi);

module.exports = router;