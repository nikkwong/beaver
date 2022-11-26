module.exports = class Comment {

    constructor(comment) {

        this.text = comment && comment.text || '';

    }

}