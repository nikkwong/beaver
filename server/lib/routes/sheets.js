var fs = require('fs');
var request = require('request');
var readline = require('readline');
// var google = require('googleapis');
// var googleAuth = require('google-auth-library');

var readline = require('readline');
// var OAuth2Client = google.auth.OAuth2;
// var plus = google.plus('v1');

// Client ID and client secret are available at
// https://code.google.com/apis/console
var CLIENT_ID = '384216743396-mbvirthjembt56qid51de1g73k3tjton.apps.googleusercontent.com';
var CLIENT_SECRET = 'xc1pi4vPirwCQ2IzTkNrFudP';
var REDIRECT_URL = 'http://localhost:1337/api/sheetaccessuri';

// var oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

// var rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// function getAccessToken(oauth2Client, callback) {
//     // generate consent page url
//     var url = oauth2Client.generateAuthUrl({
//         access_type: 'offline', // will return a refresh token
//         scope: ['https://www.googleapis.com/auth/spreadsheets'] // can be a space-delimited string or an array of scopes
//     });

//     console.log('Visit the url: ', url);
//     rl.question('Enter the code here:', function (code) {
//         // request access token
//         debugger;
//     });
// }

//             [
//                 new Date()
//             ],
//             [
//                 body['first-name']
//             ],
//             [
//                 body['last-name']
//             ],
//             [
//                 body['email']
//             ],
//             [
//                 body['address_1']
//             ],
//             [
//                 body['address_2']
//             ],
//             [
//                 body['city']
//             ],
//             [
//                 body['state']
//             ],
//             [
//                 body['country']
//             ],
//             [
//                 body['zip']
//             ]

var mongoose = require('mongoose');

var user = new mongoose.Schema({
    date: String,
    first: String,
    last: String,
    email: String,
    address_1: String,
    address_2: String,
    city: String,
    state: String,
    country: String,
    zip: String
})

var mod = mongoose.model('FractalsUser', user);

sheets = {
    post: function(body) {

            var v = new mod({
                date: new Date().toString(),
                first: body['first-name'],
                last: body['last-name'],
                address_1: body['address_1'],
                address_2: body['address_2'],
                city: body['city'],
                state: body['state'],
                country: body['country'],
                zip: body['zip']
            });
            v.save(function(err) {

                console.log(err);

            });

            // debugger;

            // process.env['GOOGLE_APPLICATION_CREDENTIALS'] = __dirname + '/../../gae.json';


            // google.auth.getApplicationDefault(function (err, authClient) {

            //     debugger;
            //     if (err) {
            //         console.log('Authentication failed because of ', err);
            //         return;
            //     }
            //     // if (authClient.createScopedRequired && authClient.createScopedRequired()) {
            //     var scopes = ['https://www.googleapis.com/auth/spreadsheets'];
            //     authClient = authClient.createScoped(scopes);
            //     // }

            //     var googlesheets = google.sheets({
            //         version: 'v4',
            //         auth: authClient
            //     });


            //     googlesheets.spreadsheets.values.append({
            //         spreadsheetId: '13O1_5EyFyqcApNMqfK_QaQoPEqtC2hg9ch9AMhzsl8g',
            //         range: "A2:K2",
            //         valueInputOption: "RAW",
            //         resource: {
            //             values: new Array(9).map(x => '123')
            //         }
            //         // googlesheets.spreadsheets.values.get({
            //         //     spreadsheetId: '13O1_5EyFyqcApNMqfK_QaQoPEqtC2hg9ch9AMhzsl8g',
            //         //     range: 'Current Orders!A1:E',
            //     }, function (err, response) {

            //         debugger;

            //     });
            //     debugger;

            //     if (err) {
            //         console.log('The API returned an error: ' + err);
            //         return;
            //     }
            //     var numrows = response.values.length;

            // googlesheets.spreadsheets.values.append({
            //     // auth: authClient,
            //     // auth: 'AIzaSyCobLyT2DKl7gq8WYkdi5-oE7Q2bVwujhA',
            //     spreadsheetId: '13O1_5EyFyqcApNMqfK_QaQoPEqtC2hg9ch9AMhzsl8g',
            //     // range: 'A' + (numrows + 1) + ':K' + (numrows + 1),
            //     range: 'A2:K2',
            //     valueInputOption: 'RAW',
            //     resource: {
            //         // resource: {
            //         //     requests: [{
            //         //         valueInputOption: 'RAW',
            //         //         data: [{
            //         //             // range: "A" + rows.length + ':' + 'V' + rows.length,
            //         //             range: 'A14:A16',
            //         values: [
            //             [
            //                 new Date()
            //             ],
            //             [
            //                 body['first-name']
            //             ],
            //             [
            //                 body['last-name']
            //             ],
            //             [
            //                 body['email']
            //             ],
            //             [
            //                 body['address_1']
            //             ],
            //             [
            //                 body['address_2']
            //             ],
            //             [
            //                 body['city']
            //             ],
            //             [
            //                 body['state']
            //             ],
            //             [
            //                 body['country']
            //             ],
            //             [
            //                 body['zip']
            //             ]
            //         ]
            //     }

            // }, function (err, data) {

            //     console.log(err, data);

            // });

            // var request = {
            //     projectId: '<your-project-id>',
            //     datasetId: '<your-dataset-id>',

            //     // This is a "request-level" option
            //     auth: authClient
            // };

            // bigquery.datasets.delete(request, function (err, result) {
            //     if (err) {
            //         console.log(err);
            //     } else {
            //         console.log(result);
            //     }
            // });
        }
        // }

};

module.exports = sheets;