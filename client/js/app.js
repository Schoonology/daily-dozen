(function (global) {
  'use strict';
  var App = global.App = new global.Marionette.Application();

  App.addRegions({
    'mainRegion': '#main-region'
  });

  App.module('DailyDozen', function (Module, App, Backbone, Marionette, $, _) {
    Module.addInitializer(function () {
      var Models = App.module('DailyDozen.Models');
      var Controllers = App.module('DailyDozen.Controllers');
      var Views = App.module('DailyDozen.Views');

      Module.controller = new Controllers.MainController({
        mainRegion: App.mainRegion
      });

      Module.router = new Backbone.Marionette.AppRouter({
        controller: Module.controller,
        appRoutes: {
          '': 'showMainView',
          'eat': 'showEatMenu'
        },
        routes: {}
      });

      Backbone.history.start();
    });
  });
}(this));
