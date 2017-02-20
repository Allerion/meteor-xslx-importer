
/**
 *	Enable/Disable a form
 *	Used when submitting forms to avoid double submissions
 */
formDisable = function($form,state){

	// get the basics
	let $submit = $form.find("button[type='submit']:first");
	let text = $submit.text();


	// We are disabling
	if(state){
		$form.addClass("disabled");
		$submit.prop('disabled',true).attr("data-text",text).html("<i class='fa fa-spinner fa-spin'></i>");

	}else{ // we are enabling
		$form.removeClass("disabled");
		$submit.prop('disabled',false).html($submit.attr("data-text")).attr("data-text","");

	}

};

/**
 *	Enable/Disable action button
 *	Used when clicking a button that submits a call to the server
 */
buttonDisable = function(button,state){

	let content = button.html();
	let id = false;

	if(state){
		id = Random.id(10);
		$("body").append("<div class='hidden' id='"+id+"'>"+content+"</div>");
		button.prop('disabled',true).attr("data-id",id).html("<i class='fa fa-spinner fa-spin'></i>");
	}else{
		id = button.attr("data-id");
		button.prop('disabled',false).html($("#"+id).html()).attr("data-id","");
		$("#"+id).remove();
	}

};

/**
 * Get the parent template instance
 * @param {Number} [levels] How many levels to go up. Default is 1
 * @returns {Blaze.TemplateInstance}
 */

Blaze.TemplateInstance.prototype.parentTemplate = function (levels) {
    var view = Blaze.currentView;
    if (typeof levels === "undefined") {
        levels = 1;
    }
    while (view) {
        if (view.name.substring(0, 9) === "Template." && !(levels--)) {
            return view.templateInstance();
        }
        view = view.parentView;
    }
};


Meteor.startup(function() {

  /** ---- GOOGLE FONTS ---- **/
  WebFontConfig = {
    google: { families: [ 'Heebo' ] }
  };
  (function() {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
      '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
  })();

  /** ---- CONNECTING ---- **/
  Status.setTemplate('skeleton');

});

