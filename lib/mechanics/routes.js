

/** ---- ROUTES ---- **/

FlowRouter.notFound = {
    action: function() {
    	if(Meteor.user()){
			BlazeLayout.render('InternalLayout', {content: 'NotFound'});
		}else{
			BlazeLayout.render('ExternalLayout', {content: 'NotFound'});
		}
    }
};

let exposedRoutes = FlowRouter.group({
  prefix: '',
  name: 'exposed'
});

exposedRoutes.route('/', {
	name: "Index",
	action: function () {
		BlazeLayout.render('ExternalLayout', {content: 'Index'});
	}
});

let loggedInRoutes = FlowRouter.group({
	prefix: '',
	name: 'loggedIn',
	triggersEnter: [function(context, redirect) {
		if(!Meteor.loggingIn() && !Meteor.userId()){
			let route = FlowRouter.current();
			if(route.route.name !== "Index"){
				Session.set("redirectAfterLogin",route.path);
				FlowRouter.go("Index");
			}
		}
	}]
});

loggedInRoutes.route('/dashboard', {
	name: "Dashboard",
	action: function () {
		BlazeLayout.render('InternalLayout', {content: 'Dashboard'});
	}
});

loggedInRoutes.route('/workbooks', {
	name: "Workbooks",
	action: function () {
		BlazeLayout.render('InternalLayout', {content: 'Workbooks'});
	}
});

