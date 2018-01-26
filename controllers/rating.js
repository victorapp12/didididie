module.exports = function (app) {

    var playlists = app.models.playlists;
    var track = app.models.track;

    var ratingController = {

        loadPlaylist: function (req, res) {

            getTopRated();

            function getTopRated() {
                track.find({}).select({
                    track_id: 1,
                    track_name: 1,
                    track_artist: 1,
                    track_image: 1,
                    track_add_by: 1,
                    track_like: 1,
                    track_dislike: 1
                }).exec(function (error, callback) {
                    if (error) {
                        console.log("Error" + error);
                    }
                    else {
                        res.render('rate/rate',{'list': callback});
                    }
                });
            }
        }

    }
    return ratingController;
}
