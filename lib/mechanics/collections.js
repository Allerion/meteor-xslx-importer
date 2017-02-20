
/**
 *	MongoDB/Meteor collections to work with
 */

Workbooks = new Meteor.Collection("workbooks", {
  transform: function (doc) {
    return new Workbook(doc);
  }
});

Sheets = new Meteor.Collection("sheets", {
  transform: function (doc) {
    return new Sheet(doc);
  }
});

Items = new Meteor.Collection("items");