module.exports = function (app) {

    var ratingController = {

    };

    var jsonObj = require("C:/Users/Aleson/Documents/GitHub/diddidie-form/didididie.json");

    readTextFile();

    function readTextFile() {

        console.log(Object.keys(jsonObj.tracks.items).length);
        for(var i = 0; i< 0; i++){

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
