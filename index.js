
const axios = require('axios');
const cheerio = require('cheerio');
const mailer = require('./utils/mailer');

const base_url = 'https://tempus-termine.com/termine/index.php'
const full_url = base_url + '?anr=29&standort=auslaender&anwendung=10&sna=Td5ed5c92739b0ab48fa9f6cf3458e34d&action=open&page=tagesauswahl&tasks=1978&kuerzel=antrag&schlangen=240&standortrowid=190&standortanzahl=1';

const delay = ms => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
};

setInterval(() => {
    axios.get(full_url)
        .then(response => {
            var $ = cheerio.load(response.data);
            var email_text = '';
            var fields = $('td.monatevent');
            fields.each((index, element) => {
                var partial_url = element.children[0].attribs.href;
                var final_url = new URL(base_url + partial_url);
                var appointment_date = new Date(final_url.searchParams.get('datum'));
                var month = appointment_date.getMonth();
                if (month === 5 || month === 6 ) {
                    email_text += `${appointment_date.toUTCString()} : ${final_url}\r\n`;
                }
            })

            if (email_text.length) {
                mailer.sendMail(
                    'Auslander Appointment Available for Booking',
                    email_text);
            }
        })
        .catch(error => {
            console.log("error", error)
        });;
}, 120000);