module.exports = function (app) {

    var schema = require('mongoose').Schema;

    var playlists = schema({
        list_id: { type: String, unique: true, riquered: true },
        list_name: { type: String, required: true },
        list_owner: { type: String, required: true },
        list_owner_id: { type: String, required: true },
        list_description: { type: String, required: false }
    });

    return db.model('playlists', playlists);
}

