const express = require('express');
const router = express.Router();
const { gethubspotdata, hubspotintialform, hubspotmappedform, hubspotfinalform, hubspotrecordstatus, hubspotmappedjsonsubmit,hubspotpermitmappedform, hubspotrecordpermitstatus, hubspotpermitmappedjsonsubmit,hubspotfinalpermitform, hubspotintialpermitform } = require("../../controllers/hubspotcontroller/gethubspotdata");
const { oauth,checktokenexpired,extractaccess_token } = require('../../controllers/hubspotcontroller/oauth');

//--------------------------------------------oauth----------------------------------------
router.get('/oauth/callback', async (req,res) =>{
try {
     console.log("inside oauth callback route")
     await oauth(req,res);
} catch (error) {
  res.status(400).send({msg: 'Something Went Wrong', err:error.message});
}
});

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

// ------------------------------------permit route-------------------------------------------------------
router.get('/api/permit/form', async (req, res) => {
  try {
    console.log("----------inside apipermitform route");
    return await hubspotintialpermitform(req,res);
  } catch (error) {
    res.status(400).send({ msg: 'Something Went Wrong', err: error.message })
  }
})

router.post('/api/permit/submit', async ( req,res) =>{
  try {
    console.log("----------inside permitsubmit route file");
    return await hubspotpermitmappedform(req,res);
    // res.send('success')
  } catch (error) {
    res.status(400).send({ msg: 'Something Went Wrong', err: error.message })
  }
})

router.post("/api/permit/final", async (req,res) =>{
  try {
    console.log("----------inside hubspotfinalform file");
    return await hubspotfinalpermitform(req,res);
    // res.send('success')
  } catch (error) {
    res.status(400).send({ msg: 'Something Went Wrong', err: error.message })
  }
})

router.get('/api/permit/status', async ( req,res) =>{
  try {
    console.log("----------inside recordstatus file");
    return await hubspotrecordpermitstatus(req,res);
    // res.send('success')
  } catch (error) {
    res.status(400).send({ msg: 'Something Went Wrong', err: error.message })
  } 
})

router.get('/api/permit/mappedjson', async (req,res) =>{
  try {
    console.log("----------inside hubspotmappedpermitjsonsubmit file");
    return await hubspotpermitmappedjsonsubmit(req,res);
    // res.send('success')
  } catch (error) {
    res.status(400).send({ msg: 'Something Went Wrong', err: error.message })
  }
})



//------------------------------------webhook--------------------------------------

router.post('/webhook', async (req,res) => {
  try {
     console.log("req---------------",req);
     res.send('hlw world');
  } catch (error) {
    res.status(400).send({msg:'Something went wrong', err: error.message});
  }
})

module.exports = router;