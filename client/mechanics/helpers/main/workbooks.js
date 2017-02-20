


Template.Workbooks.helpers({
	workbooks: function () {
        return Template.instance().workbooks();
    },
    hasMoreWorkbooks: function () {
        return Template.instance().workbooks().count() >= Template.instance().workbooksLimit.get();
    },
});

Template.Workbooks.onCreated(function () {

    const instance = this;

    instance.workbooksLoaded = new ReactiveVar(0);
    instance.workbooksLimit = new ReactiveVar(20);
    
    instance.autorun(function () {
        let workbooksLimit = instance.workbooksLimit.get();
        let workbooksSubscription = instance.subscribe('workbooks', workbooksLimit);
        if (workbooksSubscription.ready()) {
            instance.workbooksLoaded.set(workbooksLimit);
        }

    });

    instance.workbooks = function() { 
        return Workbooks.find({}, {limit: instance.workbooksLoaded.get(), sort: {date_created: -1}});
    }
        
});
