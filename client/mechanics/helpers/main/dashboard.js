
Template.Dashboard.helpers({
    reactiveDataFunction: function () {
        return function(){
            return Items.find({},{sort : {"data.category" : 1}}).fetch();
        };
    },
    optionsObject: function(){
        return {
            columns: [
                {
                    title: 'Category',
                    data: 'data.category',
                    className: 'nameColumn'
                }, 
                {
                    title: 'Sub-category',
                    data: 'data.sub_category',
                    className: 'nameColumn'
                },
                {
                    title: 'Part Number',
                    data: 'data.part_number',
                    className: 'nameColumn'
                },
                {
                    title: 'Description',
                    data: 'data.description',
                    className: 'nameColumn',
                },
                {
                    title : "Workbook",
                    data : 'workbook',
                    className : "nameColumn"
                }
            ],
        }
    },
});
