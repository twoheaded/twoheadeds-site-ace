Websites = new Mongo.Collection("websites");

Websites.allow({
    insert: function (userId, doc) {
        return !!Meteor.user();
    },
    update:function (userId, doc) {
        return !!Meteor.user();
    }
});