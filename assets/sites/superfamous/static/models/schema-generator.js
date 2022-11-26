const mongoose = require('mongoose');
const HooksService = require('../utils/hooks');

schemaGenerator = {

    createSchema: (obj) => applyHooks(new mongoose.Schema(obj)),
    createSchemaObj: (obj) => {

        Object.keys(obj).forEach(key => {

            if (obj[key] === null) throw new Error(`Don't instantiate with a null.`);

            if ((obj[key]).constructor === Object)

                schemaGenerator.createSchemaObj(obj[key])

            else obj[key] = { type: (obj[key]).constructor, required: false, default: setDefault((obj[key]).constructor) }; // If this is not passed, saves will fail silently. 

        });

        return obj;

    }

}

function applyHooks(schema) {

    HooksService.registerSchema(schema);
    return schema;

}

const setDefault = (ctr) => {

    switch (ctr) {

        case String:

            return '';

        case Boolean:

            return false;

        case Array:

            return [];

        case Number:

            return 0;

    }

};

module.exports = schemaGenerator