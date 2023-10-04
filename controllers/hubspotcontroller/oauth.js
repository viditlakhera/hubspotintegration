let axios = require('axios');
const con = require('../../config/mysql');

var formData = {
    grant_type: "authorization_code",
    client_id: "7105d93a-f835-462e-a2a9-f17b19b89ec7",
    client_secret: "1bc43cee-3af5-4908-bde6-ceee1deff819",
    redirect_uri: "https://d482-61-95-163-126.ngrok-free.app/oauth/callback",
};

let appid = 2039627;
// let clientid = "7105d93a-f835-462e-a2a9-f17b19b89ec7";
// let clientsecret = "1bc43cee-3af5-4908-bde6-ceee1deff819";

let authurl = "https://app.hubspot.com/oauth/authorize?client_id=7105d93a-f835-462e-a2a9-f17b19b89ec7&redirect_uri=https://d482-61-95-163-126.ngrok-free.app/oauth/callback&scope=timeline%20integration-sync%20crm.objects.contacts.read%20crm.objects.contacts.write%20crm.schemas.custom.read%20crm.objects.custom.read%20crm.objects.companies.write%20crm.objects.companies.read%20crm.objects.deals.read%20crm.objects.owners.read%20conversations.read";

exports.oauth = async( req,res) =>{
    try {
            console.log("req",req);
            const  code = req.query.code;
            const tokendata = await this.getTokenFromCode(code);
            console.log("Token Data:", tokendata);
            
            return res.send({ status: 200, data: tokendata });
        } catch (error) {
            console.log("error", error);
        }
    
},

exports.getTokenFromCode = async(code) => {
    try {
        formData.code = code;

        const formBody = Object.keys(formData)
            .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(formData[key])}`)
            .join("&");

        const response = await axios.post("https://api.hubapi.com/oauth/v1/token", formBody, {
            headers: { "Content-Type": "application/x-www-form-urlencoded", },
        });
        this.getuserdetails(response.data)
        return response.data;
    } catch (error) {
        console.log("error", error);
    }
},

exports.getuserdetails = async(data) => {
    try {
     
        await axios.get(`https://api.hubapi.com/oauth/v1/access-tokens/${data.access_token}`,
        {
            headers: { "Content-Type": "application/x-www-form-urlencoded", },
        }).then((response) =>{
            console.log('response',response);
             
            const storedata = {}

            storedata.token = response.data.token;
            storedata.refreshtoken = data.refresh_token;
            storedata.email = response.data.user;

            // save data of user email,accesstoken,refreshtoken to database ----------
            const [rows] = con.query(
                'INSERT INTO hubspotuserdetails (userdetail) VALUES (?)',
                [JSON.stringify(storedata)],
                (err, res) => {
                  if (err) {throw err}
                  else{
                    console.log("success",res);
                  }
                })
        })
    } catch (error) {
        console.log("error", error);
    }
},

exports.refreshtoken = async(fetchtoken) =>{
    console.log("inside refreshtoken----------");
    formData.grant_type = 'refresh_token';
    formData.refresh_token = fetchtoken[0].userdetail.refreshtoken;
    console.log("formdata");
    const formBody = Object.keys(formData)
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(formData[key])}`)
        .join("&");
    await axios.post("https://api.hubapi.com/oauth/v1/token", formBody, {
        headers: { "Content-Type": "application/x-www-form-urlencoded", }
    }).then(async response => {
       console.log("response----",response.data);
       console.log("email-----------",fetchtoken[0].userdetail.email)
        //store newly created access token in database----
        const updateaccesstoken = await con.promise().query(`UPDATE hubspotuserdetails
        SET userdetail = JSON_SET(
          userdetail,
          '$.token',
          '${response.data.access_token}'
        )
        WHERE JSON_EXTRACT(userdetail, '$.email') = '${fetchtoken[0].userdetail.email}'`); 
 
        return response;
    }).catch(error => {
        if (error.response) {
            ctx.status = error.response.status;
            ctx.body = error.response.data
            return;
        } else {
            console.log(error)
            strapi
                .plugin('sentry')
                .service('sentry')
                .sendError(error);
            throw error;
        }
    });
}
