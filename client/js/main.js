(function (global) {
  'use strict';
  var DailyDozenApp = global.DailyDozenApp = new global.Marionette.Application();

  DailyDozenApp.addRegions({
    'mainRegion': '#main-region'
  });

  DailyDozenApp.module('DailyDozen', function (Module, App, Backbone, Marionette, $, _) {
    var MomModel = Backbone.Model.extend({
      urlRoot: '/moms',
      defaults: {
      }
    });

    var MainView = Marionette.ItemView.extend({
      template: '#main-view-template',
      triggers: {
        'click .sleep': 'sleep'
      }
    });

    var EatView = Marionette.ItemView.extend({
      template: '#eat-view-template',
      triggers: {
      }
    });

    var DozenModel = Backbone.Model.extend({
      defaults: {
        'Protein': false,
        'Vitamin C': false
      }
    })

    var MainController = Marionette.Controller.extend({
      initialize: function(options) {
        this.mainRegion = options.mainRegion;
        this.mom = new MomModel();
      },
      showMainView: function () {
        var view = new MainView({
          model: this.mom
        })
        this.mainRegion.show(view);

        view.on('sleep', function (args) {
          App.vent.trigger('toggleSleep');
        });
      },
      showEatMenu: function () {
        var view = new EatView({
          model: new DozenModel()
        });
        this.mainRegion.show(view);

        view.on('eat', function (args) {
        });
      }
    });

    Module.addInitializer(function () {
      Module.controller = new MainController({
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

  DailyDozenApp.start();
}(this));
