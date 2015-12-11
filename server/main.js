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
        //dlAndSave: function (url, name) {
        //    var fileUrl = 'http://api.screenshotmachine.com/?key=f6b285&size=L&url=' + url;
        //    var filename = '../../../../../public/images/' + name + '.png';
        //
        //    HTTP.call("GET", fileUrl, {npmRequestOptions: {encoding: null}}, function (err, result) {
        //        if (!err) {
        //            var fstream = Npm.require('fs');
        //
        //            fstream.writeFile(filename, result.content, function (err) {
        //                if (!err) {
        //                    console.log('writing file ok');
        //                } else {
        //                    console.log('error during writing file', err);
        //                }
        //            });
        //        }
        //    });
        //},
        getSiteData: function (url) {
            return extractMeta(url);
        }
    });

});