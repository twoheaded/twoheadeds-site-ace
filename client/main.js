//    Notifications setup
Notifications.settings.animationSpeed = 500;
Notifications.defaultOptions.timeout = 2000;

//routing
Router.configure({
    layoutTemplate: 'ApplicationLayout'
});

Router.route('/', function () {
    this.render('navbar', {
        to: 'navbar'
    });
    this.render('sites', {
        to: 'main'
    });
});
Router.route('/:_id', function () {
    var site = Websites.findOne({_id: this.params._id});
    this.render('navbar', {
        to: 'navbar'
    });
    this.render('site', {
        to: 'main',
        data: site
    });
});

Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_EMAIL'
});

Comments.ui.config({
    template: 'bootstrap'
});

// helper function that returns all available websites
Template.website_list.helpers({
    websites: function () {
        if (Session.get('searchFilter')) {
            var filter = new RegExp(Session.get('searchFilter'), "i");
            return Websites.find({$or: [{"title": {$regex: filter}}, {"description": {$regex: filter}}]}, {sort: {votes: -1}});
        } else {
            return Websites.find({}, {sort: {votes: -1}});
        }
    }
});

Template.navbar.events({
    "input #js-search": function (event) {
        Session.set('searchFilter', event.currentTarget.value);
    }
});

/////
// template events
/////

Template.website_item.events({
    "click .js-upvote": function (event) {

        var website_id = this._id;
        if (Meteor.user()) {
            if (!Websites.findOne({_id: website_id, votedBy: Meteor.user()._id})) {
                Websites.update({_id: website_id}, {$inc: {votes: 1}, $addToSet: {votedBy: Meteor.user()._id}});
            } else {
                Notifications.warn('You already voted on this site.');
            }
        } else {
            Notifications.warn('Please Log In.');
        }
        return false;
    },
    "click .js-downvote": function (event) {

        var website_id = this._id;
        if (Meteor.user()) {
            if (!Websites.findOne({_id: website_id, votedBy: Meteor.user()._id})) {
                Websites.update({_id: website_id}, {$inc: {votes: -1}, $addToSet: {votedBy: Meteor.user()._id}});
            } else {
                Notifications.warn('You already voted on this site.');
            }
        } else {
            Notifications.warn('Please Log In.');
        }
        return false;
    }
});

Template.sites.events({
    "click .js-toggle-website-form": function (event) {
        Modal.show('website_form')
    }
});

Template.website_form.events({
    "submit .js-save-website-form": function (event) {

        var url = event.target.url.value;
        if (url.indexOf('http:')==-1 && url.indexOf('https:')==-1){
            url = 'http://'+url;
        }
        var title = event.target.title.value;
        var description = event.target.description.value;
        var name = url.replace('https://', '');
        name = name.replace('http://', '');
        name = name.replace(/\//g, '');
        Websites.insert({
            title: title,
            url: url,
            description: description,
            createdBy: Meteor.user().username,
            createdOn: new Date(),
            votes: 0,
            img: 'http://api.screenshotmachine.com/?key=f6b285&size=L&url=' + url
        }, function () {
            //Meteor.call('dlAndSave', url, name);
            Modal.hide('website_form')
        });
        console.log("The url they entered is: " + url);

        return false;// stop the form submit from reloading the page
    },
    "change #url": function (event) {
        var url = event.target.value;
        if (url.indexOf('http:')==-1 && url.indexOf('https:')==-1){
            url = 'http://'+url;
        }

        Meteor.call('getSiteData', url, {}, function (err, result){
            if(!err){
                $('input#title').val(result.title);
                $('input#description').val(result.description);
            }
        });
    }
});
Template.site.events({
    "click .js-upvote": function (event) {

        var website_id = this._id;
        if (Meteor.user()) {
            if (!Websites.findOne({_id: website_id, votedBy: Meteor.user()._id})) {
                Websites.update({_id: website_id}, {$inc: {votes: 1}, $addToSet: {votedBy: Meteor.user()._id}});
            } else {
                Notifications.warn('You already voted on this site.');
            }
        } else {
            Notifications.warn('Please Log In.');
        }
        return false;
    },
    "click .js-downvote": function (event) {

        var website_id = this._id;
        if (Meteor.user()) {
            if (!Websites.findOne({_id: website_id, votedBy: Meteor.user()._id})) {
                Websites.update({_id: website_id}, {$inc: {votes: -1}, $addToSet: {votedBy: Meteor.user()._id}});
            } else {
                Notifications.warn('You already voted on this site.');
            }
        } else {
            Notifications.warn('Please Log In.');
        }
        return false;
    }
});