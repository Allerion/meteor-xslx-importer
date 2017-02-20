
/**
 *	The Workbook class which represents an Excel file in its entirety
 */

Workbook = class Workbook {
	
	constructor(doc) {
		_.extend(this,doc);

	}

	// Create a new sheet using the data coming through
	create(data,user) {

		let date = new Date();

		this._id = Random.id();
		this.creator = user;
		this.title = data.title;
		this.date_created = date;
		this.last_updated = {
			date : date,
			user : user
		};

		let attempt = this.save(user);

		// Because we are creating we expect an insertedId back
		if(!_.isUndefined(attempt.insertedId)){

			return attempt.insertedId;

		}else{
			throw new Meteor.Error("201", "Failed to import workbook into database.");
		}

	}

	// Save the course into the system (insert/update)
	save(user) {

		// Make sure we have everything we're supposed to have
		let range = ["_id","title","creator","date_created","last_updated"];
		_.each(range,function(elem){
			if(_.isUndefined(this[elem])){
				throw new Meteor.Error("097", TAPi18n.__("errorCodes.097.reason"));
			}

			switch(elem){
				case "_id":
					check(this[elem],String);
				break;
				case "title":
					check(this[elem],String); // Make sure it is a string
					let title = s(this[elem]).trim().stripTags().capitalize().value();
					if(title == ""){
						throw new Meteor.Error("210", "The workbook requires a valid title to be saved");
					}
					this[elem] = title;
				break;
				case "creator":
					check(this[elem],String);
					elementExists("user",this[elem]);
				break;
				case "date_created":
					check(this[elem],Date); // Make sure it is a date
				break;
				case "last_updated":
					check(this[elem],Object); // Make sure it is an object
					if(_.isUndefined(this[elem].date)){
						this[elem].date = new Date();
					}else{
						check(this[elem].date,Date);
					}
					if(_.isUndefined(this[elem].user)){
						this[elem].user = user;
					}else{
						check(this[elem].user,String);
					}
				break;
			};

		},this); // pass the Workbook into the _.each otherwise we can't use this

		// Checks done so let's update

		let attempt = Workbooks.upsert({_id : this._id},{$set : {
			creator : this.creator,
			title : this.title,
			date_created : this.date_created,
			last_updated : {
				date : new Date(),
				user : user
			},
		}});

		return attempt;

	}

	/**
	 *	Delete the sheet from the system
	 */
	delete(user) {

		let attempt = Workbooks.remove({_id : this._id});

		// Now delete all sheets belonging to the workbook
		let sheets = this.getSheets();
		if(sheets.length > 0){
			_.each(sheets,function(sheet){
				sheet.delete(user);
			});
		}

		return true;

	}

	/**
	 *	Get all sheets belonging to this workbook
	 */
	getSheets() {
		return Sheets.find({workbook : this._id}).fetch();
	}

	/**
	 *	Create sheets from incoming data
	 */
	createSheets(sheets,user) {

		if(sheets.length === 0){
			return true;
		}

		let workbook = this;

		// Run through each sheet in the workbook
		_.each(sheets,function(items,sheetName){

			// Only import if the sheet has items (rows with data)
			if(items.length > 1){
				
				let sheet = new Sheet();
				
				let data = {
					title : sheetName,
					workbook : workbook._id,
				};

				// Create the sheet in the db
				let attempt = sheet.create(data,user);

				// Import the items from the sheet into the db
				sheet.createItems(items,user);

			}

		});

	}
};

