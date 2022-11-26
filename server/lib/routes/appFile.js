var images = require('../prism-images'),
    fs = require('fs'),
    signupMailer = require('./../email/signup'),
    shippo = require('./shippo'),
    json = require('body-parser').json(),
    urlencoded = require('body-parser').urlencoded(),
    sheets = require('./sheets'),
    stripe = require('stripe')(process.env.NODE_ENV === 'production' ? 'sk_live_5F24cxm1gmhbMQPoMpX7oJsW' : 'sk_test_XTTMjnzdCXmP1ziALwP82o8R'),
    paypal = require('./paypal');

exports.addRoutes = function(app, config) {

    app.get('/api/mobile/vote', function(req, res) {
        var vote = require('./../models/Vote');
        vote.find({}, function(err, votes) {
            res.send(votes);
        });
    });


    app.post('/api/test',
        urlencoded,
        function(req, res) {
            // sheets.post(req.body);

            shippo.getPrint(req.body);
        });


    app.post('/api/paypal',
        json,
        function(req, res) {
            paypal.do(req.body.resource.parent_payment);
        });

    /**
     * Test
     */

    // app.post('/sheets', function (req, res) {

    //     sheets.update();

    // });

    app.post('/api/mobile/vote', function(req, res) {
        var vote = require('./../models/Vote');
        var v = new vote({
            vote: true
        });
        v.save(function(err) {
            vote.find({}, function(err, votes) {
                res.send(votes);
            });
        });
    });

    app.post('/api/mobile/color', function(req, res) {
        var color = require('./../models/Color');
        var c = new color({
            option: req.body.color
        });
        c.save(function(err) {
            if (err) throw new Error('Problem saving vote');
            res.send(200);
        });
    });

    app.post('/api/mobile/price', function(req, res) {
        var price = require('./../models/Price');
        var p = new price({
            option: req.body.price
        });
        p.save(function(err) {
            if (err) throw new Error('Problem saving vote');
            res.send(200);
        });
    });

    app.post('/api/coupons', function(req, res) {

        var code;

        try {
            code = JSON.parse(req.body);
        } catch (e) {
            return res.send({
                data: "Invalid coupon"
            });
        }

        var coupon = require('./../coupon/coupon');
        coupon.attemptToRedeem(code.coupon).then(function(result) {
            res.send(result);
        });

    });

    app.get('/api/reviews', function(req, res) {
        var review = require('./../models/Review');
        review.find({}, function(err, reviews) {
            console.log('reviews fond + ' + JSON.stringify(reviews));
            res.send(reviews);
        });
    });

    app.post('/api/reviews', function(req, res) {
        var review = require('./../models/Review');
        var variables = JSON.parse(req.body);
        var r = new review({
            review: variables.review,
            name: variables.name,
            email: variables.email
        });
        r.save(function(err) {
            if (err) throw new Error('Problem saving vote');
            res.send(200);
        });
    });

    app.post('/api/shippo', function(req, res) {
        console.log(req);
    });

    app.post('/api/newsletter', json, function(req, res) {
        var formData = JSON.parse(req.body);
        console.log(formData);
        signupMailer.send(formData);
        res.sendStatus(200)
        // TODO: Google spreadsheets.
    });

    app.post('/api/charge', urlencoded, function(req, res) {

        var email = req.body.email;
        var charge = stripe.charges.create({
            source: req.body.stripeToken,
            receipt_email: email,
            currency: 'usd',
            amount: req.body.amount,
            description: "Fractals 3 Pack"
        }, function(err, charge) {
            if (err) {
                return res.send(err);
            }
            shippo.getPrint(req.body);
            sheets.post(req.body);
            res.redirect('/thank-you');
        });
    });

    app.all('/*', function(req, res) {

        if (req.path == '/') {
            res.sendfile('templates/index.html', {
                root: config.server.distFolder
            })
        } else {
            switch (req.params[0]) {
                case 'gallery':
                    res.sendfile('templates/gallery.html', {
                        root: config.server.distFolder
                    });
                    break;
                case 'purchase':
                    res.sendfile('templates/purchase.html', {
                        root: config.server.distFolder
                    });
                    break;
                case 'specifications':
                    res.sendfile('templates/specifications.html', {
                        root: config.server.distFolder
                    });
                    break;
                case 'blog':
                    res.sendfile('templates/blog.html', {
                        root: config.server.distFolder
                    });
                    break;
                case 'about':
                    res.sendfile('templates/about.html', {
                        root: config.server.distFolder
                    });
                    break;
                case 'the-worlds-best-photo-prism':
                    res.sendfile('templates/the-worlds-best-photo-prism.html', {
                        root: config.server.distFolder
                    });
                    break;
                case 'ultimate-guide-to-prism-photography':
                    res.sendfile('templates/ultimate-guide-to-prism-photography.html', {
                        root: config.server.distFolder
                    });
                    break;
                case 'thank-you':
                    res.sendfile('templates/thank-you.html', {
                        root: config.server.distFolder
                    });
                    break;
                case 'fractal-filters-mobile':
                    res.sendfile('templates/fractal-filters-mobile.html', {
                        root: config.server.distFolder
                    });
                    break;
                case 'terms-and-privacy':
                    res.sendfile('templates/terms-and-privacy.html', {
                        root: config.server.distFolder
                    });
                    break;
                case 'taking-stock':
                    res.sendfile('templates/taking-stock.html', {
                        root: config.server.distFolder
                    });
                    break;
                case 'fractals-featured-blog':
                    res.sendfile('templates/fractals-featured-blog.html', {
                        root: config.server.distFolder
                    });
                    break;
                case 'sitemap':
                case 'sitemap.txt':
                    res.sendfile('templates/sitemap.txt', {
                        root: config.server.distFolder
                    });
                    break;
                default:
                    res.sendfile('templates/404.html', {
                        root: config.server.distFolder
                    });
                    break;
            }
        }


    })

};