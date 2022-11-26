var nodemailer = require('nodemailer'); 
var cheerio = require('cheerio');
var fs = require('fs');
var uuid = require('node-uuid');
var coupon = require('./../models/Coupon');
var email = require('./../models/Emails');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport('smtps://nikk%40beaver.digital:S5t9hCXvmiHLWJuwAf@smtp.gmail.com');

// setup e-mail data with unicode symbols
var sendToCustomerOpts = {
    from: '"Nikk Wong" <nikk@beaver.digital>', // sender address
    to: 'nikk@beaver.digital, sbwong8@yahoo.com', // list of receivers
    subject: 'Fractal Filters newsletter! 📸 📸', // Subject line
};

function sendToCustomer (formData) {

    email.findOne({email: formData.email}).then(function(result, err) {

        if (result) return;

        var $ = cheerio.load(fs.readFileSync(__dirname + '/email-signup.html'));
        var code = uuid.v4();
        $('#coupon').text(code);
        var c = new coupon({code: code, 
          email: formData.email,
          item: '10Percent',
          used: false
        });
        c.save(function (err) {
            if (err) throw new Error('Problem saving coupon');
        });
        var e = new email({
            email: formData.email,
            page: formData.page,
            userAgent: formData.browser
        });

        e.save(function (err) {
            if (err) throw new Error('Problem saving coupon');
        });
        sendToCustomerOpts.html = $.html();
        sendToCustomerOpts.to = formData.email;
        transporter.sendMail(sendToCustomerOpts, function(error, info){
            if(error){
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
        });

    });

};


mailer = {
	send: function (formData) {
		sendToCustomer(formData);
	}

};

module.exports = mailer;