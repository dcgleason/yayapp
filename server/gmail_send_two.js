export const nodemailer = require('nodemailer');
export const { google } = require('googleapis');

export const config = require('./config.js');

const OAuth2 = google.auth.OAuth2

const OAuth2_client = new OAuth2(config.client_id, config.client_secret);

OAuth2_client.setCredentials( { refresh_token: config.refresh_token } );

function send_mail(name, recipient) {
  const accessToken = OAuth2_client.getAccessToken();

  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: config.user,
        clientId: config.client_id,
        clientSecret: config.client_secret,
        refreshToken: config.refresh_token,
        accessToken: accessToken
    }
  })


  const mail_options = {
      from: 'admin <admin@youandyours.io',
      to: recipient, 
      subject: 'Test message from googleapis second try',
      html: get_html_message()


  }

  transport.sendMail( mail_options, function(error, result){
      if(error){
          console.log('Error: ',  error)
      }
      else {
          console.log("Success:  ", result)
      }
      transport.close()
  } )
}

function get_html_message(name){
    return "<h3> ${name}, you did it! You sent an email via api! </h3>"
}

send_mail('Danny', 'danny.c.gleason@gmail.com' );