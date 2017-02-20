
/*
 *
 *	Expanded accounts functions and methods
 *	Customise this to your preference
 *
 */

Accounts.onCreateUser(function(options, user) {	
	
	if(_.isUndefined(user.profile)){
		user.profile = {
			firstName : "Señor",
			lastName : "Admin",
		};
	}

	user.createdAt = new Date();
	user.lastLogin = new Date();
    
    return user;

});

/**
 *	Run a check against the user on login to make sure everything is as it should be
 */
Accounts.onLogin(function(user){

	Meteor.users.update({_id : user.user._id},{$set : {
		lastLogin : new Date()
	}});
	
	return true;

});
