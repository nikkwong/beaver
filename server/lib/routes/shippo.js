var nodemailer = require('nodemailer');
var shippo = require('shippo')('shippo_live_bb1807d062867e0764d144b01904ed377e25c0a2');
var confirmationMailer = require('./../email/confirmation');

function print(body) {

    var addressFrom = {
        "object_purpose": "PURCHASE",
        "name": "Shannon Wong",
        "street1": "9206 Interlake Ave N #B",
        "city": "Seattle",
        "state": "WA",
        "zip": "98103",
        "country": "US",
        "phone": "+1 510 309 9252",
        "email": "nikk@beaver.digital"
    };

    var addressTo = {
        "object_purpose": "PURCHASE",
        "name": body['first-name'] + ' ' + body['last-name'],
        "street1": body.address_1,
        "street2": body.address_2,
        "city": body.city,
        "state": body.state,
        "zip": body.zip,
        "country": body.country,
        "phone": body.phone,
        "email": body.email || 'nikk@beaver.digital'
    };

    // var addressMock = {
    //     "object_purpose": "PURCHASE",
    //     "name": "nikk wong",
    //     "street1": '1126 sw 168th st',
    //     "street2": '',
    //     "city": 'London',
    //     "state": '',
    //     "zip": "EC1A 1BB",
    //     "country": "GB",
    //     "phone": "+1 999 999 9999",
    //     "email": 'nikk@nikk.com'
    // };

    var parcel = {
        "length": "5",
        "width": "5",
        "height": "4",
        "distance_unit": "in",
        "weight": "32",
        "mass_unit": "oz"
    };

    shippo.shipment.create({
        "object_purpose": "PURCHASE",
        "address_from": addressFrom,
        "address_to": addressTo,
        // "c20ec5fa8d314ea28468a6df0fc137b9
        "customs_declaration": {
            "description": "Fractal Filters: Glass Prisms for Photography",
            "quantity": 1,
            "net_weight": 32,
            "mass_unit": "oz",
            "value_amount": 10,
            "value_currency": "USD",
            "origin_country": "US"
        },
        "extra": {
            "bypass_address_validation": true
        },
        "parcel": parcel,
        "async": false,
        // live  6c82cbec1a4a4d928104d44f4bd198e9
        // test ->b97137b739c242ac9430e5743557a78d
        "customs_declaration": "6c82cbec1a4a4d928104d44f4bd198e9"
    }, function(err, shipment) {

        var rate = shipment.rates_list[
            shipment.rates_list.map(function(rate) {
                return rate.servicelevel_token
            }).indexOf('usps_priority')];

        if (!rate) // shipment is INTL
            rate = shipment.rates_list[
            shipment.rates_list.map(function(rate) {
                return rate.servicelevel_token
            }).indexOf('usps_first_class_package_international_service')];

        // Purchase the desired rate.
        shippo.transaction.create({
                "rate": rate.object_id,
                "label_file_type": "PDF",
                "async": false
            },
            function(err, transaction) {

                confirmationMailer.send(body, body.email, transaction);
                // asynchronous callback
                var transporter = nodemailer.createTransport('smtps://nikk%40beaver.digital:S5t9hCXvmiHLWJuwAf@smtp.gmail.com');

                // setup e-mail data with unicode symbols
                var sendToCustomerOpts = {
                    from: '"Sun god ☀👥☀" <nikk@beaver.digital>', // sender address
                    to: 'nikk@beaver.digital, sbwong8@yahoo.com', // list of receivers
                    subject: 'LABEL', // Subject line
                    html: JSON.stringify(transaction)
                };

                transporter.sendMail(sendToCustomerOpts, function(error, info) {
                    debugger
                });

            }
        )
    });

}

label = {

    getPrint: function(body) {

        return print(body);

    }

}

module.exports = label;