(function (global) {
  global.App.module('DailyDozen.Models', function (Module, App, Backbone, Marionette, $, _) {
    var FOODS = [
      'Calories',
      'Protein',
      'Vitamin C',
      'Calcium',
      'Green Leafy & Yellow Veggies, Yellow Fruit',
      'Other Fruits & Veggies',
      'Whole Grains & Legumes',
      'Iron-Rich Food',
      'Fat & High-Fat Food',
      'Salty Food',
      'Fluids',
      'Prenatal Vitamins'
    ];

    Module.MomModel = Backbone.Model.extend({
      defaults: function () {
        return {
          foods: ['Calories']
        };
      }
    });

    Module.MomCollection = Backbone.Collection.extend({
      url: '/moms',
      model: Module.MomModel
    });

    Module.EatModel = function (mom) {
      var foods = mom.get('foods');
      return new Backbone.Model(FOODS.map(function (name) {
        return {
          name: name,
          eaten: foods.indexOf(name) !== -1
        };
      }));
    };
  });
}(this));
