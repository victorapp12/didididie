module.exports = function (app) {

    var playlists = app.models.playlists;
    var track = app.models.track;
    var rate = app.models.rate;

    var ratingController = {

        loadPlaylist: function (req, res) {
            getPlayList(res);
        },

        rateTrack: function (req, res) {
            console.log("Sesison");
            console.log(req.session);
            rateTrack(req, res, req.body);
        }

    }

    function rateTrack(req, res, body) {
        console.log("Body");
        console.log(body);
        var query = track.findOne({ "track_id": body.track_id });
        query.select({});
        query.exec(function (error, trackResponse) {
            if (error) {
                console.log("Error - rate - step 1 " + error);
            }
            else {
                if (trackResponse != null) {

                    track.findOne({ 'track_id': body.track_id, 'track_rates.rate_user_id': req.session.user.user_id }).select({}).exec(function (error, trackRateResponse) {
                        if (trackRateResponse == null) {
                            var rate = Object();
                            var rates = trackResponse.track_rates;
                            rate.rate_user_id = req.session.user.user_id;
                            rate.rate_track_id = body.track_id;
                            rate.rate_value = body.rate_value;
                            rates.push(rate);
                            trackResponse.save(function (error, trackResponse) {
                                if (error) {
                                    console.log("Error - save rate - step 2" + error);
                                    res.send("Falhou");
                                }
                                else {
                                    console.log("saved");
                                    getPlayList(res);
                                }
                            });
                        }
                        else {
                            if (trackRateResponse.track_rates[0].rate_value == 1) {
                                trackRateResponse.track_rates[0].rate_value = -1;
                            }
                            else {
                                trackRateResponse.track_rates[0].rate_value = -1;
                            }
                            trackRateResponse.save(function (error, trackRateResponse) {
                                if (error) {
                                    console.log("Error - resave rate - step 2" + error);
                                    res.send("Falhou");
                                }
                                else {
                                    console.log("resaved");
                                    getPlayList(res);
                                }
                            });
                        }
                    });
                }
            }
        });
    }

    function getPlayList(res) {
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
                res.render('rate/rate', { 'list': callback });
            }
        });
    }

    return ratingController;
}
