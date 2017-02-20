
Template.Workbooks.events({
	'change #fileInput': function (e, template) {
		var func = this;
		var file = e.currentTarget.files[0];
		var reader = new FileReader();

		$form = $(e.currentTarget).closest("form");
        if($form.hasClass("disabled")){return false;};
        formDisable($form,true);

        let data = {
        	title : file.name,
        	size : file.size,
        	type : file.type
        };

		reader.onload = function(fileLoadEvent) {

			new Confirmation({
				message: "Do you want to import this workbook into the database?",
	            title: "Import into database",
				cancelText: "No",
				okText: "Yes",
				success: true, // whether the button should be green or red
				focus: "ok" // which button to autofocus, "cancel" (default) or "ok", or "none"
				}, function (ok) {
					if(ok){
						Meteor.call('runImport', {info : data, data : reader.result},function(err,result){
							if (err){
				                Bert.alert( err.reason + " ["+err.error+"]", 'danger', 'fixed-top', 'fa-frown-o' );
				            }else{
				            	Bert.alert("The workbook was imported into the database.", 'success', 'fixed-top', 'fa-thumbs-o-up' );
				            }
				            $form.trigger("reset");
				            formDisable($form,false);
						});
					}else{
						$form.trigger("reset");
						formDisable($form,false);
					}
			});

						
		};

		reader.readAsBinaryString(file);
		
	},
	'click .load-more': function (e, instance) {
        e.preventDefault();
        var limit = instance.workbooksLimit.get();
        limit += 20;
        instance.workbooksLimit.set(limit);
    }
});

Template.Dashboard.events({
    
});

Template.workbookListing.events({
	'click .workbook-delete':function(e){
		e.preventDefault();

		let data = {
			workbook : this._id
		};

		if($(e.target).hasClass("disabled")){return false;};
        buttonDisable($(e.target),true);

        new Confirmation({
			message: "Are you sure you want to delete this workbook and all of its corresponding data?",
            title: "Delete workbook?",
			cancelText: "No",
			okText: "Yes",
			success: false, // whether the button should be green or red
			focus: "none" // which button to autofocus, "cancel" (default) or "ok", or "none"
			}, function (ok) {
				if(ok){
					Meteor.call('workbookDelete', data,function(err,result){
						if (err){
			                Bert.alert( err.reason + " ["+err.error+"]", 'danger', 'fixed-top', 'fa-frown-o' );
			            }else{
			            	Bert.alert("The workbook was deleted.", 'success', 'fixed-top', 'fa-thumbs-o-up' );
			            }
			            buttonDisable($(e.target),false);
					});
				}else{
					buttonDisable($(e.target),false);
				}
		});

	}
});