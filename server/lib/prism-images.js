// var uuid = require('uuid');
// var mongoose = require('mongoose');

// var imageSchema = new mongoose.Schema({
//   name: { type: String, default: '' },
//   created: {type: String, default: new Date() },
//   prettyDate: {type: String, default: new Date().toDateString()},
//   src: { type: String, default: '' },
//   author: { type: String, default: '' },
//   authorImage: { type: String, default: '' },
//   authorWebsite: { type: String, default: '' },
//   likes: { type: Number, default: 0 },
//   uid: {type: String, default: uuid.v4() },
//   description: {type: String, default: ''},
//   url: {type: String, default: ''}
// })



// module.exports = {
// 	schema: mongoose.model('Image', imageSchema),
// 	instantiate: function (req, res) {
//     console.log(req.body);
// 		var model = mongoose.model('Image', imageSchema);
// 		  var m = new model({
//       src: req.body.src,
//       name: req.body.name,
//       author: req.body.author,
//       description: req.body.description,
//       authorImage: req.body.authorImage,
//       url: encodeURIComponent(req.body.name).replace(/%20/g,'+').toLowerCase()
// 		  });
//       return m;
// 	}
// };

// // var images = [

// // 	{

// // 	name: 'Donovan and Nat Prism Photography',
// // 	src: 'https://s3-us-west-2.amazonaws.com/fractal-filters/prism-photography-creative-3.jpg',
// // 	date: 'Thu Sep 10 2015 01:18:52 GMT-0700 (PDT)',
// // 	author: 'nikk wong',
// // 	authorImage: '#',
// // 	likes: 0,
// // 	uid: 0
// // }
// // ]
// // module.exports = images;