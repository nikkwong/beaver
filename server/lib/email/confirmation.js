var nodemailer = require('nodemailer');
var cheerio = require('cheerio');
var fs = require('fs');
var coupon = require('./../models/Coupon');
var uuid = require('node-uuid');
// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport('smtps://nikk%40beaver.digital:S5t9hCXvmiHLWJuwAf@smtp.gmail.com');

// setup e-mail data with unicode symbols
var sendToCustomerOpts = {
    from: '"Nikk Wong 👥" <nikk@beaver.digital>', // sender address
    to: 'nikk@beaver.digital, sbwong8@yahoo.com', // list of receivers
    subject: 'Fractal Filters receipt! 📸 📸', // Subject line
};

function sendToCustomer(body, email, transaction) {
    var $ = cheerio.load(fs.readFileSync(__dirname + '/email-confirmation.html'));
    var code = uuid.v4();
    var c = new coupon({
        code: code,
        email: email,
        item: 'Pascal',
        used: false
    });
    c.save(function(err) {
        if (err) throw new Error('Problem saving coupon');
    });
    $('#coupon').text(uuid.v4());

    var hey = body.amount.toString();
    if (hey.length === 4) {
        $('#price_front').text(hey[0] + hey[1]);
        $('#price_back').text(hey[2] + hey[3]);
    } else {
        $('#price_front').text(hey[0] + hey[1] + hey[2]);
        $('#price_back').text(hey[3] + hey[4]);
    }
    console.log(body);
    $('#tracking').text(transaction.tracking_number);
    if (body.description) $('#product-name').text(body.description);
    if (body['first-name']) $('#first-name').text(body['first-name']);
    if (body['last-name']) $('#last-name').text(body['last-name']);
    if (body.email) $('#email').text(body.email);
    if (body.address_1) $('#address_line1').text(body.address_1);
    if (body.address_2) $('#address_line2').text(body.address_2);
    if (body.city) $('#address_city').text(body.city);
    if (body.state) $('#address_state').text(body.state);
    if (body.country) $('#address_country').text(body.country);
    if (body.zip) $('#address_zip').text(body.zip);

    sendToCustomerOpts.to = 'nikk@beaver.digital, sbwong8@yahoo.com, ' + email;
    sendToCustomerOpts.html = $.html();

    transporter.sendMail(sendToCustomerOpts, function(error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });

};

// Send confirmation to me and to purchaser.

mailer = {
    send: function(body, email, transaction) {
        sendToCustomer(body, email, transaction);
    }

};

module.exports = mailer;