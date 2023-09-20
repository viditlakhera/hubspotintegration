
const config = require('./config/config');
const app = require('./config/express');

const http = require('http').createServer(app);

http.listen(config.port, () => {
  console.info(`server started on port ${config.port} (${config.env})`)
})

module.exports = app




























const express = require('express');
// const axios = require("axios");
// const app = express();
// const mysql = require('mysql2');
// const path = require('path');
// const bodyParser = require('body-parser');
// const ejs = require('ejs');
// app.use(bodyParser.urlencoded({ extended: true }));

//connecting ngrok ---------------
// const ngrok = require("@ngrok/ngrok");
// (async function() {
//   const url = await ngrok.connect({ addr: 3000, authtoken_from_env: true });
//   console.log(`Ingress established at: ${url}`);
// })();


// authentication
// await ngrok.connect({authtoken_from_env: true});

// const url = await ngrok.connect("localhost:3000");
// console.log("----------",url);

// let userid = '';
// let access_token = 'CLyYjvSoMRIMQIEAQAAAYQIAAAAYGL-G5hQg5tDIHCjLvnwyFIhgmlO-bTZjing0lRfH9V02wyU2OjAAAABHAAAABAAAAAAAAAAAAIAAAAAAAAAAAAAgAH4AHgDgAQAAACAAAPwAAAAAcANCFNncMAWF-GA7HsZtNjAyt7zRPcAySgNuYTFSAFoA';
// let associatedObjectId = '';

// //set ejs as view engine
// app.set('view engine', 'ejs');

// app.post('/ok', async(req,res)=>{
//   console.log("req",req.body);
//   res.send(req.body);
//  })

// app.get('/api/form', async (req, res) => {
//   // res.sendFile(path.join(__dirname, 'public', 'index.html'));

//   const schema = await axios.get("https://api.hubapi.com/crm/v3/schemas/deals", {
//     headers: { Authorization: `Bearer ${access_token}` }
//   }).catch(error => {
//     console.log("error")
//   });
  
//   if (!schema) {
//     return res.status(200).send('no schema found');
//   }
    
//   // console.log("schema",schema.data.properties);
//   const schemaallpropertiesdeal = schema.data.properties
//   const propertiesname = schemaallpropertiesdeal.map((ele) => ele.name);
//   console.log("propertiesname", propertiesname);

//   res.render('initialmappingform', {  propertiesname });
// });

// app.post('/submit', async (req, res) => {
//   console.log('hitting.............')
//   console.log("req", req.body);

//   const json_object = req.body;
//   console.log("userid",userid);

//   let propertiesinarray = Object.values(json_object);


//   const dealschemaobject = {};
//   propertiesinarray.forEach(item => {
//     dealschemaobject[item] = 'String'; // You can set any default string value here
// })

// dealschemaobject.userid = 'String';
// // console.log("schema-----------",dealschemaobject);

// if(!dealschemaobject){
//   res.send("schema for deals not created");
// }


//   console.log("propertiesinarray", propertiesinarray)
//   let joinpropertiesinarray = propertiesinarray.join()
//   console.log("join", joinpropertiesinarray);
//   if (req.body) {
//     await axios.get(`https://api.hubapi.com/crm/v3/objects/deals/${associatedObjectId}?properties=${joinpropertiesinarray}`,
//       {
//         headers: { Authorization: `Bearer ${access_token}` }
//       }
//     ).then((data) => {
//       console.log("data", data.data.properties);
//       // if (data.properties) {
//         const hubspotdatafilledobject = data.data.properties;

//         // deleting properties not need to render ----------------
//         delete  hubspotdatafilledobject.createdate;
//         delete hubspotdatafilledobject.hs_lastmodifieddate;
//         delete hubspotdatafilledobject.hs_object_id;

//         console.log('hubspotdatafilledobject', hubspotdatafilledobject)

//         //converting that values in array to pass to  index.ejs page to render ------
//         const arrayofhubspotproperites = Object.values(hubspotdatafilledobject);
//         console.log('arrayofhubspotproperites', arrayofhubspotproperites)

// // //------------ Check if the length of the array matches the number of keys in the object

// // if (Object.keys(json_object).length === arrayofhubspotproperites.length) {                        // check is hide for value
//   Object.keys(json_object).forEach((key, index) => {
//     json_object[key] = arrayofhubspotproperites[index];
//   });
//   console.log("new",json_object);
// // }
//  res.render('index', {  json_object });
//     })
//   }

// })

// app.get('/', async (req, res) => {

//   const initialjson = req.query
//   console.log((req.query));
  
//    associatedObjectId = req.query.associatedObjectId;
//    userid = req.query.userId;

//   if(initialjson){
//   (async () => {
//   try {
//     const newPrelim = new IntialJson(initialjson);
//     const hubspotTrigger = await newPrelim.save();
//     console.log('Person saved successfully:', hubspotTrigger);
//   } catch (err) {
//     console.error('Error saving person:', err);
//   } finally {
//     // Close the database connection
//     mongoose.connection.close();
//   }
// })();
//   }

//   if (associatedObjectId) {
//     const schema = await axios.get("https://api.hubapi.com/crm/v3/schemas/deals", {
//       headers: { Authorization: `Bearer ${access_token}` }
//     }).catch(error => {
//       console.log("error",error)
//     });

//     if (!schema) {
//       return res.status(200).send('no schema found');
//     }
      
//     // console.log("schema",schema.data.properties);
//     const schemaallproperties = schema.data.properties
//     const propertiesname = schemaallproperties.map((ele) => ele.name);
//     console.log("propertiesname", propertiesname);

//     if (propertiesname) {
//       return res.send(
//         {
//           "results": [
//             {
//               "objectId": 989,
//               "title": "CREATE PRELIM REQUEST",
//               "actions": [
//                 {
//                   "type": "IFRAME",
//                   "width": 890,
//                   "height": 748,
//                   "uri": "https://potential-pancake-w6w6qwvpqq729v5p-3000.app.github.dev/api/form",
//                   "label": "Create prelim request"
//                 },
//               ]
//             },
//           ],
//         }
//       )
//     }
//   }
// });

// app.get('/webhook', async (req,res) =>{
//   console.log("hitttted--------------")
//   console.log("req",req.query);
//   res.send('helo')
// })

// app.use(express.static(path.join(__dirname, 'public')));

// app.get("/",(req,res)=>{
//   res.send("hlw world")
// })

// app.listen(8000, () => console.log(`server is up! on 8000`));