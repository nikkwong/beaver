var couponModel = require('./../models/Coupon');

function Coupon () {};

Coupon.prototype.isRedeemable = function (couponId) {

	return new Promise(function(resolve, reject) {
		couponModel.findOne({code: couponId}).then(function (coupon, err) {
			if (coupon) {
				if (!coupon.used)
					return resolve(true);
				if (coupon.used)
					reject('Coupon has already been used');
			}
			return reject('Unable to find coupon. Please try again or email nikk@beaver.digital');
		});

	});

};

Coupon.prototype.redeem = function (couponId) {

	return new Promise(function (resolve, reject) {

		couponModel.findOneAndUpdate({code: couponId}, {$set: {used: true}}, {new: true}, function (err, doc) {

			if (err) reject(err);
			resolve(doc);

		});

	});

};

Coupon.prototype.attemptToRedeem = function (couponId) {

	var that = this;

	return this.isRedeemable(couponId).then(function(isRedeemableResult) {
		if (isRedeemableResult)
			return that.redeem(couponId).then(function (redeemResult) {
				
				return redeemResult;
			
			}, function (error) { 

				return {body: 'There was an Error resolving your coupon. Please email nikk@beaver.digital'};

			});

		return {body: 'There was an Error resolving your coupon. Please email nikk@beaver.digital'};

	}, function (error) {
		return {body: error};

	});

}

module.exports = new Coupon();