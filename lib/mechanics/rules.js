
/*
 *
 *	Range of allow/deny rules
 *
 */

Meteor.users.allow({
	update: function(userId, user, fields,modifer) {
		if (user._id !== userId){
			return false;
		}

		// handle user.profile.name
		if(!_.isUndefined(user.profile.name) && user.profile.name == ""){
			user.profile.name = user.profile.firstName + " " + user.profile.lastName;
		}

		return true;
	}
});