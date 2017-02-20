
/**
 *
 *	Determine if an element exists in the database
 *	@param type | string - name of an object type
 *	@param source | string/object - id of the object to search for
 *	@param aux | object - target object to search within (used for campaigns)
 *	
 */
elementExists = function(type,source,aux){

	id = ((_.isObject(source)) ? source._id : source); // in case we get an object coming through
	type = type.toLowerCase();
	element = false;

	switch(type){
		case "user":
			element = Meteor.users.findOne({_id:id});
			if(!element || _.isUndefined(element)){
				throw new Meteor.Error("100", "The user doesn't exist.");
			}
		break;
		case "workbook":
			element = Workbooks.findOne({_id:id});
			if(!element || _.isUndefined(element)){
				throw new Meteor.Error("200", "The workbook doesn't exist.");
			}
		break;
		default:
			throw new Meteor.Error("098", "The element doesn't exist.");
		break;
	}

	return element;

};