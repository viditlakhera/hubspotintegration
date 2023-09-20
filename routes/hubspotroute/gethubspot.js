const express = require('express');
const router = express.Router();
const { gethubspotdata, hubspotintialform, hubspotmappedform, hubspotfinalform, hubspotrecordstatus, hubspotmappedjsonsubmit } = require("../../controllers/hubspotcontroller/gethubspotdata");

router.get('/', async (req, res) => {
  try {
    console.log("----------inside gethubspot file");
    return await gethubspotdata(req , res);
    // res.send('success')
  } catch (error) {
    res.status(400).send({ msg: 'Something Went Wrong', err: error.message })
  }
})

router.get('/api/form', async (req, res) => {
  try {
    console.log("----------inside hubspotinitial file");
    return await hubspotintialform(req , res);
    // res.send('success')
  } catch (error) {
    res.status(400).send({ msg: 'Something Went Wrong', err: error.message })
  }
})

router.post('/submit', async (req, res) => {
  try {
    console.log("----------inside hubspotmappedform file");
    return await hubspotmappedform(req,res);
    // res.send('success')
  } catch (error) {
    res.status(400).send({ msg: 'Something Went Wrong', err: error.message })
  }
})

router.get('/mappedjson/submit', async (req, res) => {
  try {
    console.log("----------inside hubspotmappedjsonsubmit file");
    return await hubspotmappedjsonsubmit(req,res);
    // res.send('success')
  } catch (error) {
    res.status(400).send({ msg: 'Something Went Wrong', err: error.message })
  }
})

router.post('/final', async (req, res) => {
  try {
    console.log("----------inside hubspotfinalform file");
    return await hubspotfinalform(req,res);
    // res.send('success')
  } catch (error) {
    res.status(400).send({ msg: 'Something Went Wrong', err: error.message })
  }
})

router.get('/api/status', async (req, res) => {
  try {
    console.log("----------inside recordstatus file");
    return await hubspotrecordstatus(req,res);
    // res.send('success')
  } catch (error) {
    res.status(400).send({ msg: 'Something Went Wrong', err: error.message })
  }
})
module.exports = router;