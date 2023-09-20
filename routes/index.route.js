const express = require('express');
const router = express.Router(); // eslint-disable-line new-cap
const hubspotroute = require("./hubspotroute/gethubspot");

//========================================
/** GET /health-check - Check service health */

router.use('/', hubspotroute);

// router.use('/hubspot', validateEnv, realroutes);

module.exports = router;
