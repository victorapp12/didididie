module.exports = function (app) {

    var playlists = app.models.playlists;

    var ratingController = {
        getPlaylist: function (req, res) {
            var state = generateRandomString(16);
            // your application requests authorization

            var access_token = req.query.access_token;
            var user_id = user.id;
            var options = {
                url: 'https://api.spotify.com/v1/users/' + user_id + '/playlists/',
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                json: true
            };

            // use the access token to access the Spotify Web API
            request.get(options, function (error, response, body) {
                for (var i = 0; i < Object.keys(body.items).length; i++) {
                    if (body.items[i].name == "Didididiê") {
                        playlists.list_id = body.items[i].id;
                        playlists.list_name = body.items[i].name;
                        playlists.list_owner = body.items[i].owner.display_name;
                    }
                }
                console.log(playlists);
            });

            request.get(){
                
            }

            // we can also pass the token to the browser to make requests from there
            res.redirect('/#' +
                querystring.stringify({
                    access_token: access_token
                }));
        }
    };

    var generateRandomString = function (length) {
        var text = '';
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    };

    var jsonObj = require("C:/Users/Aleson/Documents/GitHub/diddidie-form/didididie.json");

    readTextFile();

    function readTextFile() {

        console.log(Object.keys(jsonObj.tracks.items).length);
        for (var i = 0; i < 0; i++) {

            console.log(jsonObj.tracks.items[i].track.album.artists[0].name);
            console.log(jsonObj.tracks.items[i].track.name);
            console.log(jsonObj.tracks.items[i].track.album.images[0].url);
            console.log(jsonObj.tracks.items[i].added_by.id);
            console.log("\n\n");
            // var music = new Object();
            // music.owner = jsonObj.tracks.items[i].added_by.id;
            // music.image = jsonObj.tracks.items[i].track.album.images[0].url;
            // music.name = jsonObj.tracks.items[i].track.name;
            // music.artist = jsonObj.tracks.items[i].track.album.artists[0].name;

        }
    }
    return ratingController;
}
