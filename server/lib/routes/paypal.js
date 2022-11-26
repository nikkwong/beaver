var request = require('request');
var paypal = require('paypal-rest-sdk');
var shippo = require('./shippo');
var nodemailer = require('nodemailer');

module.exports = {

    do: function (paymentId) {

        debugger;

        var id = "ATlHZn3p89VlRQQqEDbvEZa4WzVPCxm3NZ9bIIMxt4I_EWx693POx_HQl9yCwGGMuV5tBxAlt4BB5yNA";
        var secret = "EOZk7BQf9_NG7W8O0p0jyo_r1CRHMsERTwdLZsJbNLiJ8xebjLFAtDMzokYUwtXGObxvenO6-FQPpnmI";

        var x = new Buffer(id + ':' + secret).toString('base64');

        request.post({
            url: 'https://api.sandbox.paypal.com/v1/oauth2/token',
            headers: {
                'Authorization': 'Basic ' + x,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            form: {
                'grant_type': 'client_credentials'
            }
        }, function (err, response) {
            var token;
            try {
                token = JSON.parse(response.body).access_token
            } catch (e) {}

            request({
                url: 'https://api.sandbox.paypal.com/v1/payments/payment/' + paymentId,
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }
            }, function (err, response) {

                var transporter = nodemailer.createTransport('smtps://nikk%40beaver.digital:Sabersbutt1!@smtp.gmail.com');

                // setup e-mail data with unicode symbols
                var sendToCustomerOpts = {
                    from: '"Nikk Wong 👥" <nikk@beaver.digital>', // sender address
                    to: 'nikk@beaver.digital, nikk@beaver.digital', // list of receivers
                    subject: 'Label paypal', // Subject line
                    html: JSON.stringify(response)
                };

                transporter.sendMail(sendToCustomerOpts, function (error, info) {});


            })

        });
        // paypal.configure({
        //     mode: 'sandbox', // Sandbox or live
        //     client_id: 'ATlHZn3p89VlRQQqEDbvEZa4WzVPCxm3NZ9bIIMxt4I_EWx693POx_HQl9yCwGGMuV5tBxAlt4BB5yNA',
        //     client_secret: 'EOZk7BQf9_NG7W8O0p0jyo_r1CRHMsERTwdLZsJbNLiJ8xebjLFAtDMzokYUwtXGObxvenO6-FQPpnmI'
        // });



        // paypal.payment.get(paymentId, function (error, payment) {
        //     if (error) {
        //         console.log(error);
        //     } else {
        //         console.log("Get Payment Response");
        //         console.log(JSON.stringify(payment));
        //     }

        // });

    }

}


// curl -v https://api.sandbox.paypal.com/v1/payments/payment \
//   -H "Content-Type: application/json" \
//   -H "Authorization: Bearer A101.LKOGjaOMHa1RUTe2MU_XALzTzVPRcCToUtrXc6d9EVcnXCSwJzaaHzySqCfeu8Eo.RzJqvTQU6Jnl-arW_Vulr3HnqrG" \
//   -d '{
//   "intent":"sale",
//   "redirect_urls":{
//     "return_url":"http://example.com/your_redirect_url.html",
//     "cancel_url":"http://example.com/your_cancel_url.html"
//   },
//   "payer":{
//     "payment_method":"paypal"
//   },
//   "transactions":[
//     {
//       "amount":{
//         "total":"7.47",
//         "currency":"USD"
//       }
//     }
//   ]
// }'
// // paypal.notification.webhook.create(webhooks, function (err, webhook) {
//     if (err) {
//         console.log(err.response);
//         throw err;
//     } else {

//         var transporter = nodemailer.createTransport('smtps://nikk%40beaver.digital:Sabersbutt1!@smtp.gmail.com');

//         // setup e-mail data with unicode symbols
//         var sendToCustomerOpts = {
//             from: '"Nikk Wong 👥" <nikk@beaver.digital>', // sender address
//             to: 'nikk@beaver.digital, nikk@beaver.digital', // list of receivers
//             subject: 'Label paypal', // Subject line
//             html: JSON.stringify(webhook)
//         };

//         transporter.sendMail(sendToCustomerOpts, function (error, info) {});

//         // shippo.getPrint({
//         //     // webhook.
//         // });
//         console.log("Create webhook Response");
//         console.log(webhook);
//     }
// });

// {
//   "id":"WH-9FE9644311463722U-6TR22899JY792883B",
//   "create_time":"2016-04-20T16:51:12Z",
//   "resource_type":"sale",
//   "event_type":"PAYMENT.SALE.COMPLETED",
//   "summary":"Payment completed for $ 7.47 USD",
//   "resource":{
//     "id":"18169707V5310210W",
//     "state":"completed",
//     "amount":{
//       "total":"7.47",
//       "currency":"USD",
//       "details":{
//         "subtotal":"7.47"
//       }
//     },
//     "payment_mode":"INSTANT_TRANSFER",
//     "protection_eligibility":"ELIGIBLE",
//     "protection_eligibility_type":"ITEM_NOT_RECEIVED_ELIGIBLE,UNAUTHORIZED_PAYMENT_ELIGIBLE",
//     "transaction_fee":{
//       "value":"0.52",
//       "currency":"USD"
//     },
//     "invoice_number":"",
//     "custom":"",
//     "parent_payment":"PAY-809936371M327284GK4L3FHA",
//     "create_time":"2016-04-20T16:47:36Z",
//     "update_time":"2016-04-20T16:50:07Z",
//     "links":[
//       {
//         "href":"https:\/\/api.sandbox.paypal.com\/v1\/payments\/sale\/18169707V5310210W",
//         "rel":"self",
//         "method":"GET"
//       },
//       {
//         "...":"..."
//       }
//     ]
//   }
// }