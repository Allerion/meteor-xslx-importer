
/*
 *
 *	Things to do when the system starts up
 *	Customise this to your preference
 *
 */

Meteor.startup(() => {
  

	// Ensure indexes
  	Items._ensureIndex({ _id: 1, workbook : 1, sheet : 1});

  	// Create a user if none exists
  	let user = Meteor.users.findOne({});

  	if(_.isUndefined(user)){

  		let data = {
  			email : "callum1014@gmail.com",
  			username : "admin",
  			password : "admin",
  			profile : {
  				firstName : "Señor",
  				lastName : "Admin",

  			}
  		};

  		Accounts.createUser(data);

  	}

});
