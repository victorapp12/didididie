module.exports = function (app) {

    var ratingController = app.controllers.rating;
    var updateController = app.controllers.update;
    var authController = app.controllers.auth;
    var serviceController = app.controllers.service;
    app.get('/', serviceController.index);
    app.get('/login', authController.login);  
    app.get('/logout', authController.logout);
    app.get('/callback', authController.callback);  
    app.get('/refresh_token', authController.refresh_token);  
    app.get('/update', updateController.getPlaylist);
    app.get('/load_list', ratingController.loadPlaylist);
    app.post('/rate', ratingController.rateTrack);
    app.get('/teste', ratingController.teste);
    app.get('/getteste', ratingController.getTeste);
  }