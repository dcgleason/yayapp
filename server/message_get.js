const express = require("express");
const router = express.Router()
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const id_queue = require('./index.js');
const cors = require('cors')
const app = express();
const path = require('path');
const axios = require('axios')

for(var i = 0; i<id_queue.length; i ++){

axios
  .get(`https://gmail.googleapis.com/gmail/v1/users/admin@youandyours.io/messages?q=in:inbox subject: ${unique_id[i].id}`,{
    headers: {
      authorization: 'Bearer ya29.A0ARrdaM_QR6iOrS2FxWK0BJD0RiovS0j9KL86YiXzaYWVusvNv2btGzoh19H3CGoJsrCETyKttimOSNZQhzgNvsN37r6DQjXf_0LMj-jf4yVHRlKwZlcoiRmBucYhvXnonbb1ob9xwEAxBgxWBkloNBbyzQX6'
    }
  })
  .then(res => {
    console.log(`statusCode: ${res.status}`)
    console.log(res.data.messages)
  })
  .catch(error => {
    console.error(error)
  })

}