(function (global) {
  global.App.module('DailyDozen.Controllers', function (Module, App, Backbone, Marionette, $, _) {
    var Models = App.module('DailyDozen.Models');
    var Views = App.module('DailyDozen.Views');

    Module.MainController = Marionette.Controller.extend({
      initialize: function(options) {
        this.mainRegion = options.mainRegion;
        this.mom = new Models.MomModel();
      },
      showMainView: function () {
        var view = new Views.MainView({
          model: this.mom
        });
        this.mainRegion.show(view);

        view.on('sleep', function (args) {
          App.vent.trigger('toggleSleep');
        });
      },
      showEatMenu: function () {
        var view = new Views.EatView({
          collection: new Models.EatModel(this.mom)
        });
        this.mainRegion.show(view);
      }
    });
  });
}(this));
