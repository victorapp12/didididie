module.exports = function (app) {

    var schema = require('mongoose').Schema;

    var track = schema({
        track_id: { type: String, unique: true, riquered: true },
        track_name: { type: String, required: false },
        track_artist: { type: String, riquered: true },
        track_image: { type: String, required: true },
        track_add_by: { type: String, required: false },
        track_like: { type: Number, required: true },
        track_dislike: { type: Number, required: true }
    });

    return db.model('track', track);
}

