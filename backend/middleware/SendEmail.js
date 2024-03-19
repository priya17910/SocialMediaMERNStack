const nodeMailer = require('nodemailer');
// const { google } = require("googleapis");
// const { OAuth2Client } = require('google-auth-library');



exports.SendEmail = async (options) => {

    // const tokenEndpoint = "https://oauth2.googleapis.com/token"
    
    // const oauth2Client = new OAuth2Client(
    //     process.env.OAUTH_CLIENT_ID,
    //     process.env.OAUTH_CLIENT_SECRET,
    //     "https://developers.google.com/oauthplayground"
    // );
    
    
    // oauth2Client.setCredentials({
    //     refresh_token: process.env.OAUTH_REFRESH_TOKEN
    // });
 

    

    // const transporter = nodeMailer.createTransport({
        // host: process.env.SMTP_HOST,
        // port: process.env.SMTP_PORT,
        // secure: true,
        // service: process.env.SMTP_SERVICE,
        // auth: {
        //     type: "OAUTH2",
        //     user: process.env.SMTP_MAIL,
        //     pass: process.env.SMTP_PASSWORD,
        //     clientId: process.env.OAUTH_CLIENT_ID,
        //     clientSecret: process.env.OAUTH_CLIENT_SECRET,
        //     refreshToken: process.env.OAUTH_REFRESH_TOKEN,
        //     //accessToken: "ya29.a0AfB_byDF0fybakMaeH2g7b1Izx25kk9T2wrUOgDN1F2n7mt9n2_ER5I232H9uRCVHPMhKaW_Lqlp5J_hnDyadVN-mIsEZzHfen1mOtRAE1g-nVBe5VJKs8Gcn0CZcn9vXghiRGcTLBPYna0n83GNhPU5VlBwvzRKlMsjMgaCgYKAbUSARMSFQHsvYlsjKRFq5P96QJ_arjXLBzo4w0173",
        //     // accessToken: getAccessToken(),
        // }
        // service: process.env.SMTP_SERVICE,
        // host: process.env.SMTP_HOST,
        // port: process.env.SMTP_PORT,
        // auth: {
        //     user: process.env.SMTP_MAIL,
        //     pass: process.SMTP_PASSWORD,
        // },
        
    // });


    var transport = nodeMailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "2ffcd864391e1c",
          pass: "69935eea997087"
        }
    });
    console.log(process.env.SMTP_HOST);
    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message,
    };
    //await transporter.sendMail(mailOptions);
    await transport.sendMail(mailOptions);
};



const createTransporter = async () => {
    
}