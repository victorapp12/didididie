module.exports = function (app) {

    var playlists = app.models.playlists;
    var track = app.models.track;
    var rate = app.models.rate;

    var ratingController = {

        loadPlaylist: function (req, res) {
            getPlayList(req, res);
        },

        rateTrack: function (req, res) {
            console.log("Sesison");
            console.log(req.session);
            rateTrack(req, res, req.body);
        },

        teste: function(req, res){
            res.send("wow");
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
                                    sendPlayList(req, res);
                                }
                            });
                        }
                        else {
                            if (trackRateResponse.track_rates[0].rate_value != body.rate_value) {
                                trackRateResponse.track_rates[0].rate_value = body.rate_value
                                trackRateResponse.save(function (error, trackRateResponse) {
                                    if (error) {
                                        console.log("Error - resave rate - step 2" + error);
                                        res.send("Falhou");
                                    }
                                    else {
                                        console.log("resaved");
                                        sendPlayList(req, res);
                                    }
                                });
                            }
                            else {
                                console.log("Opiniao computada");
                                sendPlayList(req, res);
                            }
                        }
                    });
                }
            }
        });
    }

    function sendPlayList(req, res) {
        track.find({}).select({}).exec(function (error, callback) {
            if (error) {
                console.log("Error" + error);
            }
            else {
                res.render('rate/rate', { 'user_id': req.session.user.user_id, 'list': callback });
            }
        });
    }

    function getPlayList(req, res) {
        track.find({}).select({}).exec(function (error, callback) {
            if (error) {
                console.log("Error" + error);
            }
            else {
                res.render('rate/rate', { 'user_id': req.session.user.user_id, 'list': callback });
            }
        });
    }

    return ratingController;
}
