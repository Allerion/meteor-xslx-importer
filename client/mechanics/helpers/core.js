

// userPanel
Template.userPanel.helpers({
    name: function(){
        return this.firstname + " " + this.lastname;
    }
});


Template.thouCount.helpers({
    count : function(){
        return nFormatter(Template.currentData(),0);
    }
});

Template.switch.helpers({
    id : function(){
        return ((_.isUndefined(this.id)) ? Template.instance().input_id : this.id);
    },
    checked : function(){
        return ((_.isUndefined(this.checked) || this.checked == false) ? {checked: false} : {checked: ""});
    },
});

Template.switch.onCreated(function(){

    this.input_id = "a_" + Random.id(5);

});

/**
 *
 *  Utility helpers to make life easier
 *
 **/

// Check if a equals b
Template.registerHelper("equals", function (a, b) {
    return (a == b);
});

// Check if a doesn't equal b
Template.registerHelper("no_equals", function (a, b) {
    return (a !== b);
});

// Check if a is in array
// b can be a comma-separated string
Template.registerHelper("inArray",function(a,b){
    b = ((_.isArray(b)) ? b : b.split(","));
    return ((b.indexOf(a) > -1) ? true : false);
});






