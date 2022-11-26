module.exports = class Notification {

    constructor(notification) {

        this.t = new Date();
        this.meta = notification && notification.meta || {};
        this.subtype = notification && notification.subtype || '';
        this.type = notification && notification.type || 'message';
        this.message = notification && notification.message || 'An event happened';

    }

}