## Meteor .xls/.xlsx Importer

**Demo** : https://meteor-xlsx-importer.herokuapp.com/

This uses Meteor.js running on top of Node.js and deployed on Heroku.
It allows you to upload an Excel file (workbook) and import it into a database. All rows (items) are added from all sheets
inside the workbook and can then be interrogated via the *Items* page/route, which is reachable from the side-menu.

Database interrogation makes use of jQuery DataTables on the client.
