(function (global) {
  global.App.module('DailyDozen.Views', function (Module, App, Backbone, Marionette, $, _) {
    Module.MainView = Marionette.ItemView.extend({
      template: '#main-view-template',
      triggers: {
        'click .sleep': 'sleep',
        'click .eat': 'eat',
        'click .sick': 'sick'
      }
    });

    Module.EatView = Marionette.ItemView.extend({
      template: '#eat-view-template',
      triggers: {}
    });
  });
}(this));
