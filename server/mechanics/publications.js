

/*
 *  Return all items for logged-in users
 */
Meteor.publish("items", function (limit) {
	if (this.userId) {
		return Items.find({}, {limit: limit, sort: {date_created: -1}});
	} else {
		this.ready();
	}
});

/*
 *  Return all sheets for logged-in users
 */
Meteor.publish("sheets", function (limit) {
	if (this.userId) {
		return Sheets.find({}, {limit: limit, sort: {date_created: -1}});
	} else {
		this.ready();
	}
});

/*
 *  Return all workbooks for logged-in users
 */
Meteor.publish("workbooks", function (limit) {
	if (this.userId) {
		return Workbooks.find({}, {limit: limit, sort: {date_created: -1}});
	} else {
		this.ready();
	}
});