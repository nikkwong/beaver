const mongoose = require('mongoose');
const Feedback = require('static/models/feedback');
const schemaGenerator = require('./schema-generator');

module.exports = mongoose.model('Feedback', schemaGenerator.createSchema(schemaGenerator.createSchemaObj(new Feedback())));