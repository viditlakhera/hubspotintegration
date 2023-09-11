const express = require('express');
const axios = require("axios");
const app = express();
const mysql = require('mysql2');

const config = require('./config/config');
const db = require('./config/titans');
const path = require('path');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const databasefile = require('./db')
const initialdetail = require("./initaldetail")
app.use(bodyParser.urlencoded({ extended: true }));

//set ejs as view engine
app.set('view engine', 'ejs');

const responsedata = [];

app.post('/ok', async(req,res)=>{
  console.log("req",req.body);
  res.send(req.body);
 })

app.get('/api/form', async (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/submit', async (req, res) => {
  console.log('hitting.............')
  console.log("req", req.body);

  const json_object = req.body;
    
  let propertiesinarray = Object.values(json_object);
  console.log("propertiesinarray", propertiesinarray)
  let joinpropertiesinarray = propertiesinarray.join()
  console.log("join", joinpropertiesinarray);
  const access_token = "CL2m8pSoMRIMQIEAQAAAYQIAAAAYGL-G5hQg5tDIHCjLvnwyFBh5ErR1WX4CGfMrc08gCm_ckVBXOjAAAABHAAAABAAAAAAAAAAAAIAAAAAAAAAAAAAgAH4AHgDgAQAAACAAAPwAAAAAcANCFCJjd9ICkWlQA3YbOWqXfiCvjoqHSgNuYTFSAFoA";
  if (req.body) {
    await axios.get(`https://api.hubapi.com/crm/v3/objects/deals/14998061332?properties=${joinpropertiesinarray}`,
      {
        headers: { Authorization: `Bearer ${access_token}` }
      }
    ).then((data) => {
      console.log("data", data.data.properties);
      // if (data.properties) {
        const hubspotdatafilledobject = data.data.properties;

        // deleting properties not need to render ----------------
        delete  hubspotdatafilledobject.createdate;
        delete hubspotdatafilledobject.hs_lastmodifieddate;
        delete hubspotdatafilledobject.hs_object_id;

        console.log('hubspotdatafilledobject', hubspotdatafilledobject)

        //converting that values in array to pass to  index.ejs page to render ------
        const arrayofhubspotproperites = Object.values(hubspotdatafilledobject);
        console.log('arrayofhubspotproperites', arrayofhubspotproperites)

// Check if the length of the array matches the number of keys in the object
if (Object.keys(json_object).length === arrayofhubspotproperites.length) {
  Object.keys(json_object).forEach((key, index) => {
    json_object[key] = arrayofhubspotproperites[index];
  });

  console.log("new",json_object);
}

 res.render('index', {  json_object });
    })
  }

})

app.get('/', async (req, res) => {
  const { associatedObjectId } = req.query
  // console.log(associatedObjectId);
  const initialjson = req.query
  
  if(initialjson){
    initialdetail.addItem(initialjson);
    console.log('Item added to the database');
  }

  const access_token = "CL2m8pSoMRIMQIEAQAAAYQIAAAAYGL-G5hQg5tDIHCjLvnwyFBh5ErR1WX4CGfMrc08gCm_ckVBXOjAAAABHAAAABAAAAAAAAAAAAIAAAAAAAAAAAAAgAH4AHgDgAQAAACAAAPwAAAAAcANCFCJjd9ICkWlQA3YbOWqXfiCvjoqHSgNuYTFSAFoA";
  if (associatedObjectId) {
    const schema = await axios.get("https://api.hubapi.com/crm/v3/schemas/deals", {
      headers: { Authorization: `Bearer ${access_token}` }
    }).catch(error => {
      console.log("error")
    });

    if (!schema) {
      return res.status(200).send('no schema found');
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
              "actions": [
                {
                  "type": "IFRAME",
                  "width": 890,
                  "height": 748,
                  "uri": "https://fuzzy-guide-qpgwv7gpx9qcxw7-3000.app.github.dev/api/form",
                  "label": "Create prelim request"
                },
              ]
            },
          ],
        }
      )
    }
  }
});

app.get('/webhook', async (req,res) =>{
  console.log("hitttted--------------")
  console.log("req",req.query);
})
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () => console.log(`server is up!`));