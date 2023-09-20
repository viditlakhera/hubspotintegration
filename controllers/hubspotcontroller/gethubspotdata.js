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
let access_token = 'COWh94mrMRIOQIEAQAAAYQIAAAAYAAEYv4bmFCDm0MgcKMu-fDIUT6rLURruW6uLMANL5uJ8Wqjf2i86MAAAAEcAAAAEAAAAAAAAAAAAgAAAAAAAAAAAACAAfgAeAOABAAAAIAAA_AAAABBwA0IUN1GSMp7CyudlNgWPU-pzoo5PvOdKA25hMVIAWgA';
let associatedObjectId = '';

exports.gethubspotdata =  async (req,res) =>{
        console.log("inside get route------")
        // res.send("hello world");
        const initialjson = req.query
        console.log((req.query));
        
         associatedObjectId = req.query.associatedObjectId;
         userid = req.query.userId;

        if (associatedObjectId) {
          // first check if prelim record exists to db then show to user you already raise request for this record------
          const [rows] = await con
          .promise()
          .query(`SELECT * FROM prelims WHERE integrationid = ${associatedObjectId}`)
    
          console.log('rows',rows)

          if(rows.length >= 1){

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
                ],     
              }
            )    
          }

          const schema = await axios.get("https://api.hubapi.com/crm/v3/schemas/deals", {
            headers: { Authorization: `Bearer ${access_token}` }
          }).catch(error => {
            console.log("error",error)
          });
      
          if (!schema) {
            return res.status(200).send('no schema found');
          }
            
          // console.log("schema",schema.data.properties);
          const schemaallproperties = schema.data.properties
          const propertiesname = schemaallproperties.map((ele) => ele.name);
          // console.log("propertiesname", propertiesname);
      
          if (propertiesname) {

            // checking if schema for this user is already exists then don't show intialmapping page-------------------------------
            const [rows] = await con
            .promise()
            .query(`SELECT * FROM hubspotjsons WHERE userid = ${userid}`)
      
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
                  ],        
                }
              )}else{
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
                    ],        
                  }
                )
              }
          }
        }
}

exports.hubspotintialform = async ( req,res ) => {

//  res.sendFile(path.join(__dirname, 'public', 'index.html'));
// res.send("api form hitting");

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
 res.render('index', {  json_object });
    })
  }
}

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
      .query(`SELECT * FROM files_related_morphs where related_id = ${prelimdata.id}`)

      
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

//direct call without intialmapping 
exports.hubspotmappedjsonsubmit = async ( req,res) =>{
  
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
