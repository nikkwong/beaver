const mongoose = require('mongoose');

class HookService {

    constructor() {


    }

    registerCallback(method, callback, ctx) {

        if (!ctx) throw new Error('Did not pass context');
        HookService.callbacks[method].push(callback.bind(ctx));

    };

    registerSchema(schema) {

        console.log(`Registering hooks for schema`);

        schema.pre('find', () => {

            console.log('Hooks -> preFind');
            return schema;

        }).pre('save', (next) => {

            console.log('Hooks -> save');
            next();

        }).post('find', (results) => {

            console.log('Hooks -> postFind');
            if (!Array.isArray(results)) throw new Error('Posthook on .find was not an array, though an array was expected');
            HookService.callbacks.find.forEach(cb => cb(doc));

        /**
         * @desc NOTE! This covers findByIdAndUpdate
         */
        }).post('findOneAndUpdate', (doc) => {

            console.log('Hooks -> findOneAndUpdate');
            HookService.callbacks.findByIdAndUpdate.forEach(cb => cb(doc));

        }).post('save', (doc) => {

            console.log('Hooks -> save');
            HookService.callbacks.save.forEach(cb => cb(doc));

        }).post('update', (error, res, next) => {

            console.log('Hooks -> update');
            HookService.callbacks.update.forEach(cb => cb(doc));
            next();

        });

    }

}

HookService.callbacks = {

    findByIdAndUpdate: [],
    update: [],
    find: [],
    save: []

}

module.exports = new HookService();