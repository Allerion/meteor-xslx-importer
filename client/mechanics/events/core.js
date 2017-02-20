
/* 
 *
 *	Core events for the userSystem
 *	@requires gwendall:body-events
 *
 */

Template.body.events({

    'submit form.login-form' : function(e){
        e.preventDefault();
        
        // retrieve the input field values
        let username = $(e.target).find('#login-username').val();
        let password = $(e.target).find('#login-password').val();

        $form = $(e.target).closest("form");
        if($form.hasClass("disabled")){return false;};
        formDisable($form,true);

        Meteor.loginWithPassword(username, password, function(err){
            if (err){
                Bert.alert( err.reason + " ["+err.error+"]", 'danger', 'fixed-top', 'fa-frown-o' );
            }else{
                Bert.alert("You're logged in!", 'success', 'fixed-top', 'fa-thumbs-o-up' );
                setTimeout(function(){return formDisable($form,false);},5000);
                return FlowRouter.go("Dashboard");
            }
        });         
    },
    'click #logoutButton' : function(e){
        e.preventDefault();

        if($(e.target).hasClass("disabled")){return false;};
        buttonDisable($(e.target),true);

        Accounts.logout(function(err){
            if (err) {
                Bert.alert( err.reason + " ["+err.error+"]", 'danger', 'fixed-top', 'fa-frown-o' );
                buttonDisable($(e.target),false);
            } else {
                Bert.alert("You're logged out!", 'success', 'fixed-top', 'fa-thumbs-o-up' );
                buttonDisable($(e.target),false);
                FlowRouter.go("Index");
            }
        });
    },
    'click .summaryReadMore': function(e){
        $(e.target).siblings(".summaryShort").andSelf().hide();
        $(e.target).siblings(".summaryFull").show();
    },
    'click .summaryReadLess': function(e){
        $(e.target).parent().hide().siblings(".summaryShort,.summaryReadMore").show();
    },
    'click .wipe-system': function(e){
        e.preventDefault();

        if($(e.target).hasClass("disabled")){return false;};
        buttonDisable($(e.target),true);
        
        Meteor.call('wipeSystem', {},function(err,result){
            if (err){
                Bert.alert( err.reason + " ["+err.error+"]", 'danger', 'fixed-top', 'fa-frown-o' );
            }else{
                Bert.alert("The database has been wiped of all sheets and items.", 'success', 'fixed-top', 'fa-thumbs-o-up' );
            }
            buttonDisable($(e.target),false);
        });

    },
});


