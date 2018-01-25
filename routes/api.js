module.exports = function (app) {

    var ratingController = app.controllers.rating;
    var authController = app.controllers.auth;
    var serviceController = app.controllers.service;
    app.get('/', serviceController.index);
    app.get('/login', authController.login);  
    app.get('/callback', authController.callback);  
    app.get('/refresh_token', authController.refresh_token);  
    app.get('/rate', ratingController.getPlaylist);
  }