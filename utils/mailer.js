require('dotenv').config();
const nodemailer = require('nodemailer');

exports.sendMail = (subject, text) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SENDER_EMAIL_ADDRESS,
            pass: process.env.SENDER_EMAIL_PASSWORD
        }
    });

    var mailOptions = {
        from: process.env.SENDER_EMAIL_ADDRESS,
        to: process.env.RECEIVER_EMAIL_ADDRESS,
        subject,
        text
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            var now = new Date.now()
            console.log(`Email sent (${now.toUTCString()}): ${info.response}`);
        }
    });
}
