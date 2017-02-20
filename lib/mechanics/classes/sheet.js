
/**
 *	The Sheet class which represents a single sheet within an Excel file
 */

Sheet = class Sheet {
	
	constructor(doc) {
		_.extend(this,doc);

	}

	// Create a new sheet using the data coming through
	create(data,user) {

		let date = new Date();

		this._id = Random.id();
		this.creator = user;
		this.title = data.title;
		this.workbook = data.workbook;
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
			throw new Meteor.Error("201", "Failed to import workbook sheet into database.");
		}

	}

	// Save the course into the system (insert/update)
	save(user) {

		// Make sure we have everything we're supposed to have
		let range = ["_id","title","workbook","creator","date_created","last_updated"];
		_.each(range,function(elem){
			if(_.isUndefined(this[elem])){
				throw new Meteor.Error("097", TAPi18n.__("errorCodes.097.reason") + " " + elem);
			}

			switch(elem){
				case "_id":
					check(this[elem],String);
				break;
				case "title":
					check(this[elem],String); // Make sure it is a string
					let title = s(this[elem]).trim().stripTags().capitalize().value();
					if(title == ""){
						throw new Meteor.Error("210", "The sheet requires a valid title to be saved");
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

		},this); // pass the Scope into the _.each otherwise we can't use this

		// Checks done so let's update

		let attempt = Sheets.upsert({_id : this._id},{$set : {
			creator : this.creator,
			title : this.title,
			workbook : this.workbook,
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

		let attempt = Sheets.remove({_id : this._id});

		// If attempt succeeds we need to remove all items belonging to the sheet
		Items.remove({sheet : this._id});

		return true;

	}
 
	/**
	 *	Get all items belonging to this sheet
	 */
	getItems() {
		return Items.find({workbook : this.workbook, sheet : this._id}).fetch();
	}

	/**
	 *	Create a batch of items belonging to the sheet
	 */
	createItems(items,user) {

		if(_.isEmpty(items)){
			return true;
		}

		let date = new Date();
		let sheet = this;

		let defaults = {
			creator : user,
			sheet : this._id,
			workbook : this.workbook,
			date_created : date,
			last_updated : {
				date : date,
				user : user
			},
			data : null,
			_id : null
		};

		let itemKeys = {
			"category" : "category",
			"sub category" : "sub_category",
			"part_number" : "part_number",
			"description" : "description"
		};

		// Populate the items with required data to tie them to sheets & workbooks
		let finalItems = [];
		_.each(items,function(item,key){
			let newItem = _.defaults({},defaults);
			newItem._id = Random.id(20);

			// Map item's data using hard-coded keys. This strips out any property that doesn't match one of the itemKeys
			// listed above so that item documents don't have mismatching data to work against
			let data = {};
			_.each(item,function(value,key){
				if(!_.isUndefined(itemKeys[key])){
					data[itemKeys[key]] = value;
				}
			});
			newItem.data = data;

			finalItems.push(newItem);
		});

		// Run a batch insert if more than one item to reduce server strain
		if(finalItems.length > 1){
			Items.batchInsert(finalItems);
		}else{
			Items.insert(finalItems[0]);
		}

		return true;

	}
};

