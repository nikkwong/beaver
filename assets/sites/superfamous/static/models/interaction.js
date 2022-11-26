module.exports = class Interaction {

    constructor(interaction) {

        this.t = new Date();
        this.un = interaction.un || '';
        this.url = interaction.url || '';
        this.type = interaction.type || 'activity_interaction'; // activity_stopped
        this.message = interaction.message || '';
        this.likeSuccess = interaction.likeSuccess || false;
        this.followSuccess = interaction.followSuccess || false;
        this.commentFailure = interaction.commentFailure || false;
        this.commentSuccess = interaction.commentSuccess ? interaction.commentSuccess : false;

    }

}
