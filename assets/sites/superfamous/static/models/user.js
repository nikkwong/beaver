const Comment = require('./comment');

module.exports = class User {

    constructor(user) {

        this.notifications = user && user.notifications || [{ message: 'Account created! Welcome.', type: 'success', t: new Date() }];
        this.pro = user && typeof user.pro !== 'undefined' ? user.pro : false;
        this.currentPeriodEnd = user && user.currentPeriodEnd || new Date();
        this.subscriptionId = user && user.subscriptionId || '';
        this.referredBy = user && user.referredBy || '';
        this.customerId = user && user.customerId || '';
        this.invoiceId = user && user.invoiceId || '';
        this.password = user && user.password || '';
        this.email = user && user.email || '';
        this.ig = {

            speed: user && user.ig && user.ig.speed || 7,
            hashtags: user && user.ig && user.ig.hashtags || [],
            profileImg: user && user.ig && user.ig.profileImg || '',
            period: user && user.ig && user.ig.period || [720, 1260],
            maxFollowCount: user && user.ig && user.ig.maxFollowCount || 5000,
            comments: user && user.ig && user.ig.comments || [new Comment({ text: 'Hello!' })],
            hasChanges: user && user.ig && user.hasChanges && typeof user.ig.hasChanges !== 'undefined' ? user.ig.hasChanges : true,
            actions: {

                like: user && user.ig && user.ig.actions && typeof user.ig.actions.like !== 'undefined' ? user.ig.actions.like : true,
                follow: user && user.ig && user.ig.actions && typeof user.ig.actions.follow !== 'undefined' ? user.ig.actions.follow : true,
                comment: user && user.ig && user.ig.actions && typeof user.ig.actions.comment !== 'undefined' ? user.ig.actions.comment : false,
                unfollow: user && user.ig && user.ig.actions && typeof user.ig.actions.unfollow !== 'undefined' ? user.ig.actions.unfollow : true,
                unfollowDuration: user && user.ig && user.ig.actions && user.ig.actions.unfollowDuration || 432000000

            },
            // from other users.
            ownTotals: {

                like: user && user.ig && user.ig.totals && user.ig.totals.like || 0,
                follow: user && user.ig && user.ig.totals && user.ig.totals.follow || 0,
                unfollow: user && user.ig && user.ig.totals && user.ig.totals.unfollow || 0,
                comment: user && user.ig && user.ig.totals && user.ig.totals.comment || 0

            },
            totals: {

                like: user && user.ig && user.ig.totals && user.ig.totals.like || 0,
                follow: user && user.ig && user.ig.totals && user.ig.totals.follow || 0,
                unfollow: user && user.ig && user.ig.totals && user.ig.totals.unfollow || 0,
                toUnfollow: user && user.ig && user.ig.totals && user.ig.totals.toUnfollow || 0,
                comment: user && user.ig && user.ig.totals && user.ig.totals.comment || 0

            },
            snapshot: [],
            u: user && user.ig && user.ig.u || '',
            p: user && user.ig && user.ig.p || '',
            following: user && user.ig && user.ig.following || [],
            stoppedMsg: user && user.ig && user.ig.stoppedMsg || '',
            status: user && user.ig && user.ig.status || 'STOPPED'

        }

    }

}