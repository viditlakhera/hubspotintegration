const con = require('../../config/mysql');
const config = require('../../config/config');
const axios = require("axios");
const express = require('express');
const app = express();
const mysql = require('mysql2');
const path = require('path');
const bodyParser = require('body-parser');
const ejs = require('ejs');
app.use(bodyParser.urlencoded({ extended: true }));
const pool = require('../../config/mysql');

let userid = '';
let access_token = 'CIOy5oStMRIOQIEAQAAAYQIAAAAYAAkYv4bmFCDm0MgcKMu-fDIUSEAwUOxL1G4F7AVFS9QjUCul5k46MAAAAEcAAAAEAAAAAAAAAAAAgAAAAAAAAAAAACAAfgAeAOABAAAAIAAA_AAAABBxA0IUZz-bceaStpQzKQT-7GBQe7SS7atKA25hMVIAWgA';
let associatedObjectId = '';

exports.gethubspotdata =  async (req,res) =>{
        const initialjson = req.query
        console.log((req.query));
        console.log("21-------------------------------------")
         associatedObjectId = req.query.associatedObjectId;
         userid = req.query.userId;

        if (associatedObjectId) {
          // first check if prelim record exists to db then show to user you already raise request for this record------
          const [rows] = await con
          .promise()
          .query(`SELECT * FROM prelims WHERE integrationid = ${associatedObjectId}`)
    
          // first check if permit record already exists to db 
          const [permit] = await con.promise().query(`
          SELECT * from permits where integrationid = ${associatedObjectId}`);


          console.log("34-----------------------------")
          if(rows.length >= 1 && permit.length >=1){

            return res.send(
              {
                "results": [
                  {
                    "objectId": 233,
                    "title": "PRELIM request is already created for this record",           
                    "actions": [
                      {
                        "type": "IFRAME",
                        "width": 890,
                        "height": 748,
                        "uri": "https://d482-61-95-163-126.ngrok-free.app/api/status",
                        "label": "view status"
                      },
                    ]
                  },                    
                  {
                    "objectId": 255,
                    "title": "PERMIT request is already created for this record",
                    "actions": [
                      {
                        "type": "IFRAME",
                        "width": 890,
                        "height": 748,
                        "uri": "https://d482-61-95-163-126.ngrok-free.app/api/permit/status",
                        "label": "view status"
                      },
                    ]
                  },                    
                ],     
              }
              )    
          }
          else if(rows.length < 1 && permit.length >= 1){
                console.log("sdsdfsd");

              // check initial mapping for prelim already exists
              const [prelim] = await con.promise().query(`
              SELECT * from hubspotjsons where userid = ${userid}`);

              if(prelim.length>=1){
                return res.send(
                  {
                    "results": [
                      {
                        "objectId": 233,
                        "title": "CREATE DIRECT PRELIM REQUEST",
                        "actions": [
                          {
                            "type": "IFRAME",
                            "width": 890,
                            "height": 748,
                            "uri": "https://d482-61-95-163-126.ngrok-free.app/mappedjson/submit",
                            "label": "create prelim request"
                          },
                        ]
                      },                    
                      {
                        "objectId": 255,
                        "title": "PERMIT request is already created for this record",
                        "actions": [
                          {
                            "type": "IFRAME",
                            "width": 890,
                            "height": 748,
                            "uri": "https://d482-61-95-163-126.ngrok-free.app/api/permit/status",
                            "label": "view permit status"
                          },
                        ]
                      },                    
                    ],     
                  }
                ) 
              }

                return res.send(
                  {
                    "results": [
                      {
                        "objectId": 233,
                        "title": "CREATE INITIAL PRELIM MAPPING",
                        "actions": [
                          {
                            "type": "IFRAME",
                            "width": 890,
                            "height": 748,
                            "uri": "https://d482-61-95-163-126.ngrok-free.app/api/form",
                            "label": "view status"
                          },
                        ]
                      },                    
                      {
                        "objectId": 255,
                        "title": "PERMIT request is already created for this record",
                        "actions": [
                          {
                            "type": "IFRAME",
                            "width": 890,
                            "height": 748,
                            "uri": "https://d482-61-95-163-126.ngrok-free.app/api/permit/status",
                            "label": "view permit status"
                          },
                        ]
                      },                    
                    ],     
                  }
                ) 
          }
          else if(permit.length < 1 && rows.length >=1){
            console.log("inside else if")

                          // check initial mapping for permit already exists
                          const [permit] = await con.promise().query(`
                          SELECT * from hubspotjsons where userid = ${userid}`);
            
                          if(permit.length>=1){
                            return res.send(
                              {
                                "results": [
                                  {
                                    "objectId": 233,
                                    "title": "PRELIM request is already created for this record",
                                    "actions": [
                                      {
                                        "type": "IFRAME",
                                        "width": 890,
                                        "height": 748,
                                        "uri": "https://d482-61-95-163-126.ngrok-free.app/api/status",
                                        "label": "view prelim status"
                                      },
                                    ]
                                  },                    
                                  {
                                    "objectId": 234,
                                    "title": "CREATE DIRECT PERMIT REQUEST",
                                    "actions": [
                                      {
                                        "type": "IFRAME",
                                        "width": 890,
                                        "height": 748,
                                        "uri": "https://d482-61-95-163-126.ngrok-free.app/api/permit/mappedjson",
                                        "label": "Direct permit request"
                                      },
                                    ]
                                  },                    
                                ],     
                              }
                            ) 
                          }
            
                            return res.send(
                              {
                                "results": [
                                  {
                                    "objectId": 233,
                                    "title": "PRELIM request is already created for this record",
                                    "actions": [
                                      {
                                        "type": "IFRAME",
                                        "width": 890,
                                        "height": 748,
                                        "uri": "https://d482-61-95-163-126.ngrok-free.app/api/status",
                                        "label": "view prelim status"
                                      },
                                    ]
                                  },                    
                                  {
                                    "objectId": 255,
                                    "title": "CREATE INTIAL MAPPING PERMIT REQUEST",
                                    "actions": [
                                      {
                                        "type": "IFRAME",
                                        "width": 890,
                                        "height": 748,
                                        "uri": "https://d482-61-95-163-126.ngrok-free.app/api/permit/form",
                                        "label": "create permit request"
                                      },
                                    ]
                                  },                    
                                ],     
                              }
                            ) 
          }else{
            console.log("else");
          const schema = await axios.get("https://api.hubapi.com/crm/v3/schemas/deals", {
            headers: { Authorization: `Bearer ${access_token}` }
          }).catch(error => {
            console.log("error",error)
          });
      
          if (!schema) {
            return res.status(200).send('no schema found');
          }
           
          const schemaallproperties = schema.data.properties
          const propertiesname = schemaallproperties.map((ele) => ele.name);
      
          if (propertiesname) {

            // checking if schema for this user is already exists then don't show intialmapping page-------------------------------
            const [rows] = await con
            .promise()
            .query(`SELECT * FROM hubspotjsons WHERE userid = ${userid}`)
           
            console.log("80----------------------------")
            if(rows.length >= 1 ){
              return res.send(
                {
                  "results": [
                    {
                      "objectId": 989,
                      "title": "CREATE PRELIM REQUEST",
                      "actions": [
                        {
                          "type": "IFRAME",
                          "width": 890,
                          "height": 748,
                          "uri": "https://d482-61-95-163-126.ngrok-free.app/mappedjson/submit",
                          "label": "Create prelim request"
                        }
                      ]
                    },
                    {
                      "objectId": 990,
                      "title": "CREATE PERMIT REQUEST",
                      "actions": [
                        {
                          "type": "IFRAME",
                          "width": 890,
                          "height": 748,
                          "uri": "https://d482-61-95-163-126.ngrok-free.app/api/permit/mappedjson",
                          "label": "Create permit request"
                        }
                      ]
                    },
                  ],        
                }
              )}else{

              // this is for mapping of schema( permit,prelim,.... and all other module ) it is one time
               
              return res.send(
                  {
                    "results": [
                      {
                        "objectId": 989,
                        "title": "CREATE PRELIM REQUEST",
                        "actions": [
                          {
                            "type": "IFRAME",
                            "width": 890,
                            "height": 748,
                            "uri": "https://d482-61-95-163-126.ngrok-free.app/api/form",
                            "label": "Create prelim request"
                          }
                        ]
                      },
                      {
                        "objectId": 400,
                        "title": "CREATE PERMIT REQUEST",
                        "actions": [
                          {
                            "type": "IFRAME",
                            "width": 890,
                            "height": 748,
                            "uri": "https://d482-61-95-163-126.ngrok-free.app/api/permit/form",
                            "label": "Create permit request"
                          }
                        ]
                      },  
                    ],        
                  }
                )
              }
          }
        }
      }
}

exports.hubspotintialform = async ( req,res ) => {

  console.log("reqhubspotinitialform",req);
     const schema = await axios.get("https://api.hubapi.com/crm/v3/schemas/deals", {
    headers: { Authorization: `Bearer ${access_token}` }
  }).catch(error => {
    console.log("error")
  });
  if (!schema) {
    return res.status(200).send('no schema found');
  }    
  // console.log("schema",schema.data.properties);
  const schemaallpropertiesdeal = schema.data.properties
  const propertiesname = schemaallpropertiesdeal.map((ele) => ele.name);
  console.log("propertiesname", propertiesname);
  res.render('initialmappingform', {  propertiesname }); 
}

exports.hubspotmappedform = async (req,res) => {
  console.log("req", req.body);
  
  const json_object = req.body;
  

  // const searchjson = await con.promise().query(`select * from hubspotjsons where userid = ${userid}`);
  // if(searchjson.length >= 1){
    // append userid in json object
    json_object.userid = userid;
  // }

//check if json for particular user is exists in database---
const [alreadyjson] = await con.promise().query(`select * from hubspotjsons where userid = ${userid}`);
console.log("already",alreadyjson);

  // store json for particular user in database-----------------------
  if(!alreadyjson.length){
    console.log("inside hubspot json -----------------------------")
    const storejson = con.query(
      'INSERT INTO hubspotjsons SET ?',
      json_object,
      (err, res) => {
        if (err) {throw err}
        else{
          console.log("succeess",res);
        }
      })
  }
  console.log("userid",userid);

  let propertiesinarray = Object.values(json_object);

  //remove userid
  propertiesinarray.pop();

//   const dealschemaobject = {};
//   propertiesinarray.forEach(item => {
//     dealschemaobject[item] = 'String'; // You can set any default string value here
// })

// dealschemaobject.userid = 'String';
// console.log("schema-----------",dealschemaobject);

// if(!dealschemaobject){
//   res.send("schema for deals not created");
// }

  console.log("propertiesinarray", propertiesinarray)
  let joinpropertiesinarray = propertiesinarray.join()
  console.log("join", joinpropertiesinarray);
  console.log("reqbody",req.body);
  console.log("associatedObjectId", associatedObjectId);
  // if (req.body) {
    await axios.get(`https://api.hubapi.com/crm/v3/objects/deals/${associatedObjectId}?properties=${joinpropertiesinarray}`,
      {
        headers: { Authorization: `Bearer ${access_token}` }
      }
    ).then((data) => {
    //   if (data.data.properties) {
        const hubspotdatafilledobject = data.data.properties;

        // deleting properties not need to render ----------------
        delete  hubspotdatafilledobject.createdate;
        delete hubspotdatafilledobject.hs_lastmodifieddate;
        delete hubspotdatafilledobject.hs_object_id;

        console.log('hubspotdatafilledobject', hubspotdatafilledobject)

        //converting that values in array to pass to  index.ejs page to render ------
        const arrayofhubspotproperites = Object.values(hubspotdatafilledobject);
        console.log('arrayofhubspotproperites', arrayofhubspotproperites)

//------------ Check if the length of the array matches the number of keys in the object

// if (Object.keys(json_object).length === arrayofhubspotproperites.length) {                        // check is hide for value
  Object.keys(json_object).forEach((key, index) => {
    json_object[key] = arrayofhubspotproperites[index];
  });
  console.log("new",json_object);

  //remove userid field before passing to rendering page
  delete json_object.userid;
  
  //delete extra keys from schema 
  delete json_object.reviewissues;
  delete json_object.requestdeclinereason;

// }
 res.render('index', {  json_object });
    })
  }
// }

exports.hubspotfinalform = async (req,res) =>{
    console.log(typeof(req.body));
   
   const prelimdataobject = req.body
    
// added more keys to store prelim request in db--------------
  prelimdataobject.createdbyid = userid
  prelimdataobject.integrationsource = 'hubspot'
  prelimdataobject.integrationid = associatedObjectId;
  prelimdataobject.status = 'created'   // status is updating

  console.log("prelimobj",prelimdataobject);

        con.query(
          'INSERT INTO prelims SET ?',
          prelimdataobject,
          (err, res) => {
            if (err) {throw err}
            else{
              console.log("succeess",res);
            }
          })


  res.send("successfully created prelim req");
}

exports.hubspotrecordstatus = async (req,res) =>
{
    if(associatedObjectId){
      console.log("lfsdg",associatedObjectId);
      const [rows] = await con
      .promise()
      .query(`SELECT * FROM prelims WHERE integrationid = ${associatedObjectId}`)

      console.log('rows',rows)
      if(rows.length < 1){
       res.send('no prelim record is created for this deal till now! for creating record please go to create prelim request')
      }
      
      const prelimdata = rows[0];
     
      const responseback = {
        id:prelimdata.id,
        name:prelimdata.name,
        status: prelimdata.status
      }
       
      console.log("prelimdata",prelimdata);

      if(prelimdata.status == 'delivered'){
      // fetch files id from files_related_morphs

      const [filesrelatedmorphsrecord] = await con
      .promise()
      .query(`SELECT * FROM files_related_morphs where related_id = ${prelimdata.id} AND field = "prelimdesign"`)

      
console.log("filesrelatedmorphsrecord",filesrelatedmorphsrecord);

      if(filesrelatedmorphsrecord.length >= 1){
          let record = filesrelatedmorphsrecord[0];
          
          console.log("record",record);
          const [filerecord] = await con
          .promise()
          .query(`SELECT * FROM files where id = ${record.file_id}`)
          console.log("filerecord",filerecord);
          let recordurl = filerecord[0].url;
          console.log("recordurl",recordurl);
          //adding prelimdesign to response when status id delivered
          responseback.prelimdesign = recordurl;
          }
          return res.render('delivered', { responseback });
      }
      return res.render('withoutdelivered', { responseback });
 
    }

    return res.send("deal id is not defined");
}

exports.hubspotmappedjsonsubmit = async ( req,res) =>{
  
  console.log("req---------------------------",req);
  const [rows] = await con
  .promise()
  .query(`SELECT address,company,email,monthlybill,name FROM hubspotjsons WHERE userid = ${userid}`);

  const json_object = rows[0]
  let propertiesinarray = Object.values(json_object);

  console.log("jsonobject-------------",json_object);

//   const dealschemaobject = {};
//   propertiesinarray.forEach(item => {
//     dealschemaobject[item] = 'String'; // You can set any default string value here
// })

// dealschemaobject.userid = 'String';
// // console.log("schema-----------",dealschemaobject);

// if(!dealschemaobject){
//   res.send("schema for deals not created");
// }

  console.log("propertiesinarray", propertiesinarray)
  let joinpropertiesinarray = propertiesinarray.join()
  console.log("join", joinpropertiesinarray);
  console.log("reqbody",req.body);
  console.log("associatedObjectId", associatedObjectId);
  if (req.body) {
    await axios.get(`https://api.hubapi.com/crm/v3/objects/deals/${associatedObjectId}?properties=${joinpropertiesinarray}`,
      {
        headers: { Authorization: `Bearer ${access_token}` }
      }
    ).then((data) => {
    //   if (data.data.properties) {
        const hubspotdatafilledobject = data.data.properties;
        console.log('hubspotdatafilledobject', hubspotdatafilledobject)
        
        // delete unneccesary keys
        delete hubspotdatafilledobject.createdate;
        delete hubspotdatafilledobject.hs_lastmodifieddate;
        delete hubspotdatafilledobject.hs_object_id;
        delete hubspotdatafilledobject.userId;

        //converting that values in array to pass to  index.ejs page to render ------
        const arrayofhubspotproperites = Object.values(hubspotdatafilledobject);
        console.log('arrayofhubspotproperites', arrayofhubspotproperites)

//------------ Check if the length of the array matches the number of keys in the object

// if (Object.keys(json_object).length === arrayofhubspotproperites.length) {                        // check is hide for value
  Object.keys(json_object).forEach((key, index) => {
    json_object[key] = arrayofhubspotproperites[index];
  });
  console.log("new",json_object);
// }
 res.render('index', {  json_object });
    })
  }
}

// initial permit mapping form--
exports.hubspotintialpermitform = async ( req,res ) => {

  console.log("inside permitintialmapping form--------------");
     const schema = await axios.get("https://api.hubapi.com/crm/v3/schemas/deals", {
    headers: { Authorization: `Bearer ${access_token}` }
  }).catch(error => {
    console.log("error")
  });
  if (!schema) {
    return res.status(200).send('no schema found');
  }  
  
  
  const schemaallpropertiesdeal = schema.data.properties
  const propertiesname = schemaallpropertiesdeal.map((ele) => ele.name);
  console.log("propertiesname", propertiesname);
  res.render('permitinitialmappingform', {  propertiesname }); 
}

exports.hubspotpermitmappedform = async (req,res) =>{
  console.log("req", req.body);
  
  const json_object = req.body;

    json_object.userid = userid;


  // store json for particular user in database-----------------------
  const storejson = con.query(
    'INSERT INTO hubspotjsons SET ?',
    json_object,
    (err, res) => {
      if (err) {throw err}
      else{
        console.log("succeess",res);
      }
    })
  console.log("userid",userid);

  let propertiesinarray = Object.values(json_object);

  console.log("propertiesinarray", propertiesinarray)
  let joinpropertiesinarray = propertiesinarray.join()
  console.log("join", joinpropertiesinarray);
  console.log("reqbody",req.body);
  console.log("associatedObjectId", associatedObjectId);
  if (req.body) {
    await axios.get(`https://api.hubapi.com/crm/v3/objects/deals/${associatedObjectId}?properties=${joinpropertiesinarray}`,
      {
        headers: { Authorization: `Bearer ${access_token}` }
      }
    ).then((data) => {
    //   if (data.data.properties) {
        const hubspotdatafilledobject = data.data.properties;

        // deleting properties not need to render ----------------
        delete  hubspotdatafilledobject.createdate;
        delete hubspotdatafilledobject.hs_lastmodifieddate;
        delete hubspotdatafilledobject.hs_object_id;

        console.log('hubspotdatafilledobject', hubspotdatafilledobject)

        //converting that values in array to pass to  index.ejs page to render ------
        const arrayofhubspotproperites = Object.values(hubspotdatafilledobject);
        console.log('arrayofhubspotproperites', arrayofhubspotproperites)

//------------ Check if the length of the array matches the number of keys in the object

// if (Object.keys(json_object).length === arrayofhubspotproperites.length) {                        // check is hide for value
  Object.keys(json_object).forEach((key, index) => {
    json_object[key] = arrayofhubspotproperites[index];
  });
  console.log("new",json_object);

  //remove userid field before passing to rendering page
  delete json_object.userid;

// }
 res.render('permitindex', {  json_object });
    })
}
}

exports.hubspotfinalpermitform = async (req,res) =>{
  console.log(typeof(req.body));
   
  const permitdataobject = req.body
   
// added more keys to store prelim request in db--------------
permitdataobject.createdbyid = userid
permitdataobject.integrationsource = 'hubspot'
permitdataobject.integrationid = associatedObjectId;
permitdataobject.status = 'created'   // status is updating

 console.log("prelimobj",permitdataobject);

       con.query(
         'INSERT INTO permits SET ?',
         permitdataobject,
         (err, res) => {
           if (err) {throw err}
           else{
             console.log("succeess",res);
           }
         })


 res.send("successfully created permit req"); 
}

exports.hubspotrecordpermitstatus = async (req,res) => {
  if(associatedObjectId){
    console.log("lfsdg",associatedObjectId);
    const [rows] = await con
    .promise()
    .query(`SELECT * FROM permits WHERE integrationid = ${associatedObjectId}`)

    console.log('rows',rows)
    if(rows.length < 1){
     res.send('no permit record is created for this deal till now! for creating record please go to create prelim request')
    }
    
    const permitdata = rows[0];
   
    const responseback = {
      id:permitdata.id,
      name:permitdata.name,
      status: permitdata.status
    }
     
    console.log("permitdata",permitdata);

    if(permitdata.status == 'delivered'){
    // fetch files id from files_related_morphs

    const [filesrelatedmorphsrecord] = await con
    .promise()
    .query(`SELECT * FROM files_related_morphs where related_id = ${permitdata.id} AND field = "architecturaldesign"`);

    
console.log("filesrelatedmorphsrecord",filesrelatedmorphsrecord);

    if(filesrelatedmorphsrecord.length >= 1){
        let record = filesrelatedmorphsrecord[0];
        
        console.log("record",record);
        const [filerecord] = await con
        .promise()
        .query(`SELECT * FROM files where id = ${record.file_id}`)
        console.log("filerecord",filerecord);
        let recordurl = filerecord[0]?.url;
        console.log("recordurl",recordurl);
        //adding architecturaldesign to response when status id delivered
        responseback.architecturaldesign = recordurl;
        }
        return res.render('permitdelivered', { responseback });
    }
    return res.render('permitwithoutdelivered', { responseback });

  }

  return res.send("deal id is not defined");
}

exports.hubspotpermitmappedjsonsubmit = async (req,res) =>{
  console.log("inside hubspotpermitmappedjsonsubmit-----------");
  const [rows] = await con
  .promise()
  .query(`SELECT address,company,email,monthlybill,name,reviewissues,requestdeclinereason FROM hubspotjsons WHERE userid = ${userid}`);

  const json_object = rows[0]
  let propertiesinarray = Object.values(json_object);

  console.log("jsonobject-------------",json_object);

  console.log("propertiesinarray", propertiesinarray)
  let joinpropertiesinarray = propertiesinarray.join()
  console.log("join", joinpropertiesinarray);
  console.log("reqbody",req.body);
  console.log("associatedObjectId", associatedObjectId);
  // if (req.body) {
    await axios.get(`https://api.hubapi.com/crm/v3/objects/deals/${associatedObjectId}?properties=${joinpropertiesinarray}`,
      {
        headers: { Authorization: `Bearer ${access_token}` }
      }
    ).then((data) => {
      console.log("data",data);
    //   if (data.data.properties) {
        const hubspotdatafilledobject = data.data.properties;
        console.log('hubspotdatafilledobject', hubspotdatafilledobject)
        
        // delete unneccesary keys
        delete hubspotdatafilledobject.createdate;
        delete hubspotdatafilledobject.hs_lastmodifieddate;
        delete hubspotdatafilledobject.hs_object_id;
        delete hubspotdatafilledobject.userId;

        //converting that values in array to pass to  index.ejs page to render ------
        const arrayofhubspotproperites = Object.values(hubspotdatafilledobject);
        console.log('arrayofhubspotproperites', arrayofhubspotproperites)

//------------ Check if the length of the array matches the number of keys in the object

// if (Object.keys(json_object).length === arrayofhubspotproperites.length) {                        // check is hide for value
  Object.keys(json_object).forEach((key, index) => {
    json_object[key] = arrayofhubspotproperites[index];
  });
  console.log("new",json_object);
// }
 res.render('permitindex', {  json_object });
    })
  } 
// }

