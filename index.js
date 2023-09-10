const express = require('express');
const axios = require("axios");
const app = express();
const mysql = require('mysql2');

const config = require('./config/config');
const db = require('./config/titans');
const path = require('path');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
// create the connection......................
// const pool = mysql.createPool({
//   host: "testwattmonkdb-do-user-8587296-0.b.db.ondigitalocean.com",
//   user: "doadmin",
//   password: "AVNS_3lzv2XN5b491XBspt-2",
//   database: "sunnovav4",
//   port: 25060,
//    debug: false,
//    connectionLimit : 1000,
//    waitForConnections:true,
//    queueLimit:0
// });
// pool.getConnection((err,connection)=> {
//   console.log(connection)
//   if(err){
//     console.log(err)
//     throw err;
//   } 
//   console.log('Database connected successfully');
//   connection.release();
// });

app.get('/api/form', async (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
  //   const options = {
  //     root: path.join(__dirname)
  // };

  // const fileName = 'app.html';
  // res.sendFile(fileName, options, function (err) {
  //     if (err) {
  //         next(err);
  //     } else {
  //         console.log('Sent:', fileName);
  //     }
  // });
});

app.post('/submit', async (req, res) => {
  console.log('hitting.............')
  console.log("req", req.body);

  const object = req.body;

  let propertiesinarray = Object.values(object);
  console.log("propertiesinarray", propertiesinarray)
  let joinpropertiesinarray = propertiesinarray.join()
  console.log("join", joinpropertiesinarray);
  const access_token = "CMmfg6OnMRIMAAEAQAAAYQIAAAAYGL-G5hQg5tDIHCjLvnwyFAZAsL8ar7K4Ql9cLHGATn5V17E8OjAAAABBAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAgAH4AHgDgAQAAAAAAAPwAAAAAcANCFI0bAce6VNQ0A68X82z4oUWmGKyzSgNuYTFSAFoA";
  if (req.body) {
    await axios.get(`https://api.hubapi.com/crm/v3/objects/deals/14998061332?properties=${joinpropertiesinarray}`,
      {
        headers: { Authorization: `Bearer ${access_token}` }
      }
    ).then((data) => {
      console.log("data", data.data.properties);
      // if (data.properties) {
        const hubspotdatafilledobject = data.data.properties;
        console.log('hubspotdatafilledobject', hubspotdatafilledobject)
        const arrayofhubspotproperites = Object.values(hubspotdatafilledobject);
        console.log('arrayofhubspotproperites', arrayofhubspotproperites)
      // }
      res.send(JSON.stringify(data.data.properties));
    })
  }

})

app.get('/', async (req, res) => {
  const { associatedObjectId } = req.query
  const responsedata = req.query
  // console.log(associatedObjectId);
  // console.log(req.query)
  const access_token = "CMmfg6OnMRIMAAEAQAAAYQIAAAAYGL-G5hQg5tDIHCjLvnwyFAZAsL8ar7K4Ql9cLHGATn5V17E8OjAAAABBAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAgAH4AHgDgAQAAAAAAAPwAAAAAcANCFI0bAce6VNQ0A68X82z4oUWmGKyzSgNuYTFSAFoA";
  if (associatedObjectId) {
    const schema = await axios.get("https://api.hubapi.com/crm/v3/schemas/deals", {
      headers: { Authorization: `Bearer ${access_token}` }
    }).catch(error => {
      console.log("error")
    });

    if (!schema) {
      return res.send('no schema found');
    }

    // console.log("schema",schema.data.properties);
    const schemaallproperties = schema.data.properties
    const propertiesname = schemaallproperties.map((ele) => ele.name);
    console.log("propertiesname", propertiesname);

    if (propertiesname) {
      return res.send(
        {
          "results": [
            {
              "objectId": 989,
              "title": "CREATE PRELIM REQUEST",
              // "link": "http://wattmonk.com",
              // "properties": [
              //   {
              //     "label": "Address",
              //     "dataType": "STRING",
              //     "value": "rajghat"
              //   },
              //   {
              //     "label": "chatid",
              //     "dataType": "STRING",
              //     "value": null
              //   },
              //   {
              //     "label": "country",
              //     "dataType": "STRING",
              //     "value": null
              //   },
              //   {
              //     "label": "dealname",
              //     "dataType": "STRING",
              //     "value": "first"
              //   },
              //   {
              //     "label": "expecteddeliverydate",
              //     "dataType": "STRING",
              //     "value": null
              //   },
              // ]
              "actions": [
                {
                  "type": "IFRAME",
                  "width": 890,
                  "height": 748,
                  "uri": "https://fuzzy-guide-qpgwv7gpx9qcxw7-3000.app.github.dev/api/form",
                  "label": "Create prelim request"
                },
                // {
                //   "type": "CONFIRMATION_ACTION_HOOK",
                //   "confirmationMessage": "Are you sure you want to delete this ticket?",
                //   "confirmButtonText": "Yes",
                //   "cancelButtonText": "No",
                //   "httpMethod": "DELETE",
                //   "associatedObjectProperties": [
                //     "protected_account"
                //   ],
                //   "uri": "https://example.com/tickets/245",
                //   "label": "Delete"
                // }
              ]
            },
          ],
          // "settingsAction": {
          //   "type": "IFRAME",
          //   "width": 890,
          //   "height": 748,
          //   "uri": "https://example.com/settings-iframe-contents",
          //   "label": "Settings"
          // },
          // "primaryAction": {
          //   "type": "IFRAME",
          //   "width": 890,
          //   "height": 748,
          //   "uri": "https://example.com/create-iframe-contents",
          //   "label": "Create Ticket"
          // }
        }
      )
    }

    // const dealproperties = await axios.get(`https://api.hubapi.com/crm/v3/objects/deals/${associatedObjectId}?properties=address,dealname,chatid,status,expecteddeliverydate,country`, {
    //   headers: { Authorization: `Bearer ${access_token}` }
    // }).then(response => {
    //   return response;
    // }).catch(error => {
    //       console.log(error)
    // });
    // console.log("dealproperties",dealproperties); 


    // return res.send(
    //   {
    //     "results": [
    //       {
    //         "objectId": 989,
    //         "title": "CREATE PRELIM REQUEST",
    //         // "link": "http://wattmonk.com",
    //         // "properties": [
    //         //   {
    //         //     "label": "Address",
    //         //     "dataType": "STRING",
    //         //     "value": "rajghat"
    //         //   },
    //         //   {
    //         //     "label": "chatid",
    //         //     "dataType": "STRING",
    //         //     "value": null
    //         //   },
    //         //   {
    //         //     "label": "country",
    //         //     "dataType": "STRING",
    //         //     "value": null
    //         //   },
    //         //   {
    //         //     "label": "dealname",
    //         //     "dataType": "STRING",
    //         //     "value": "first"
    //         //   },
    //         //   {
    //         //     "label": "expecteddeliverydate",
    //         //     "dataType": "STRING",
    //         //     "value": null
    //         //   },
    //         // ]
    //         "actions": [
    //           {
    //             "type": "IFRAME",
    //             "width": 890,
    //             "height": 748,
    //             "uri": "https://example.com/edit-iframe-contents",
    //             "label": "Edit"
    //           },
    //           {
    //             "type": "CONFIRMATION_ACTION_HOOK",
    //             "confirmationMessage": "Are you sure you want to delete this ticket?",
    //             "confirmButtonText": "Yes",
    //             "cancelButtonText": "No",
    //             "httpMethod": "DELETE",
    //             "associatedObjectProperties": [
    //               "protected_account"
    //             ],
    //             "uri": "https://example.com/tickets/245",
    //             "label": "Delete"
    //           }
    //         ]
    //       },
    //       // {
    //       //   "objectId": 990,
    //       //   "title": "PERMITTING RESPONSE",
    //       //   "link": "http://example.com/2",
    //       //   "properties": [
    //       //     {
    //       //       "label": "Address",
    //       //       "dataType": "STRING",
    //       //       "value": "rajghat"
    //       //     },
    //       //     {
    //       //       "label": "chatid",
    //       //       "dataType": "STRING",
    //       //       "value": null
    //       //     },
    //       //     {
    //       //       "label": "country",
    //       //       "dataType": "STRING",
    //       //       "value": null
    //       //     },
    //       //     {
    //       //       "label": "dealname",
    //       //       "dataType": "STRING",
    //       //       "value": "first"
    //       //     },
    //       //     {
    //       //       "label": "expecteddeliverydate",
    //       //       "dataType": "STRING",
    //       //       "value": null
    //       //     },
    //       //   ]
    //       //   },
    //       // {
    //       //   "objectId": 991,
    //       //   "title": "PESTAMP RESPONSE",
    //       //   "link": "http://example.com/2",
    //       //   "properties": [
    //       //     {
    //       //       "label": "Address",
    //       //       "dataType": "STRING",
    //       //       "value": "rajghat"
    //       //     },
    //       //     {
    //       //       "label": "chatid",
    //       //       "dataType": "STRING",
    //       //       "value": null
    //       //     },
    //       //     {
    //       //       "label": "country",
    //       //       "dataType": "STRING",
    //       //       "value": null
    //       //     },
    //       //     {
    //       //       "label": "dealname",
    //       //       "dataType": "STRING",
    //       //       "value": "first"
    //       //     },
    //       //     {
    //       //       "label": "expecteddeliverydate",
    //       //       "dataType": "STRING",
    //       //       "value": null
    //       //     },
    //       //   ],
    //       // },
    //     ],
    //       "settingsAction": {
    //         "type": "IFRAME",
    //         "width": 890,
    //         "height": 748,
    //         "uri": "https://example.com/settings-iframe-contents",
    //         "label": "Settings"
    //       },
    //       "primaryAction": {
    //         "type": "IFRAME",
    //         "width": 890,
    //         "height": 748,
    //         "uri": "https://example.com/create-iframe-contents",
    //         "label": "Create Ticket"
    //       }
    //     }
    //   )
  }
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () => console.log(`server is up!`));