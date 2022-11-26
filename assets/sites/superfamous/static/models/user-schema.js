const mongoose = require('mongoose');
const User = require('static/models/user');
const schemaGenerator = require('./schema-generator');

const obj = schemaGenerator.createSchemaObj(new User())

obj.ig.following.select = false

const schema = schemaGenerator.createSchema(obj)

module.exports = mongoose.model('User', schema);