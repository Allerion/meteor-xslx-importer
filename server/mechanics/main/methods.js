
if(typeof require !== 'undefined') XLSX = require('xlsx');

Meteor.methods({
	
	'wipeSystem' : function(){

		if(!this.userId){
			throw new Meteor.Error("101", "You need to be logged in to do this.");
		}

		Workbooks.remove({});
		Sheets.remove({});
		Items.remove({});

	},

	'runImport' : function(file){

		if(!this.userId){
			throw new Meteor.Error("101", "You need to be logged in to do this.");
		}

		// Needs to be a valid excel spreadsheet
		let validMimeTypes = [
			"application/vnd.ms-excel",
			"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
		];

		if(validMimeTypes.indexOf(file.info.type) < 0){
			throw new Meteor.Error("298", "This is not a valid excel spreadsheet.");
		}

		var returnedJSON = {};
		var book = XLSX.read(file.data, {type:"binary"});
		var sheet_name_list = book.SheetNames;
		
		sheet_name_list.forEach(function(y) { /* iterate through sheets */
		  
		  var worksheet = book.Sheets[y];
		  returnedJSON[y] = XLSX.utils.sheet_to_json(worksheet,{}); // Use an empty object for options so that column headers are used as data keys
		
		});

		if(_.isEmpty(returnedJSON)){

			throw new Meteor.Error("299", "The workbook has no sheets to import.");
		
		}

		// We have sheets so let's create the workbook and then the sheets
		let workbook = new Workbook();
		let attempt = workbook.create(file.info,this.userId);

		// Now create the sheets
		workbook.createSheets(returnedJSON,this.userId);

		return true;

	},

	'workbookDelete' : function(data){

		if(!this.userId){
			throw new Meteor.Error("101", "You need to be logged in to do this.");
		}

		let workbook = elementExists("workbook",data.workbook);

		let attempt = workbook.delete(this.userId);

	}

});









