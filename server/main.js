// start up function that creates entries in the Websites databases.
Meteor.startup(function () {
    // code to run on server at startup
    if (!Websites.findOne()) {
        console.log("No websites yet. Creating starter data.");
        Websites.insert({
            title: "Coursera",
            url: "http://www.coursera.org",
            description: "Universal access to the world’s best education.",
            createdBy: 'admin',
            createdOn: new Date(),
            img: "/images/S8adZdhtdNoNPasyQ-coursera.org.png",
            votes: 0
        });
        Websites.insert({
            title: "Meteor",
            url: "https://www.meteor.com",
            description: "Meteor is a complete platform for building web and mobile apps in pure JavaScript.",
            createdBy: 'admin',
            createdOn: new Date(),
            img: "/images/KxkYd3ZLCjubsYWCc-meteor.com.png",
            votes: 0
        });
        Websites.insert({
            title: "Google",
            url: "http://www.google.com",
            description: "Popular search engine.",
            createdBy: 'admin',
            createdOn: new Date(),
            img: "/images/mAkemjzvo6QoBXDxJ-www.google.com.png",
            votes: 0
        });
        Websites.insert({
            title: "Github",
            url: "https://github.com",
            description: "GitHub is where people build software. More than 11 million people use GitHub to discover, fork, and contribute to over 30 million projects.",
            createdBy: 'admin',
            createdOn: new Date(),
            img: "/images/GC885rH7ovYdFs6Ns-github.com.png",
            votes: 0
        });
    }

    Meteor.methods({
        getSiteData: function (url) {
            return extractMeta(url);
        }
    });

});