import Ember from 'ember';
import layout from '../templates/components/store-search';
var _ = require('lodash');

export default Ember.Component.extend({
  layout: layout,

  keyUp: function(e) {
    var arrowUp = 38;
    var arrowDown = 40;
    var location = this.get("focus_location");

    if(e.keyCode === arrowUp || e.keyCode === arrowDown) {
      e.preventDefault();
      if (!location) {
        this.set("queryPredictions", []);
        this.set("autocompleteIndex", -1);
        return;
      }
      return this.moveAutocompleteHighlight(e.keyCode === arrowUp ? 'up' : 'down');
    }

    Ember.run(function() {
      var service = new google.maps.places.AutocompleteService();
      service.getPlacePredictions({
        input: location,
        types: ["geocode"],
      },
      function(predictions, status) {
        Ember.run(function() {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            var emberWrappedPredictions = _.map(predictions, function(prediction) {
              return Ember.Object.create(prediction);
            });

            this.set("queryPredictions", emberWrappedPredictions);
            this.moveAutocompleteHighlight("up");
          } else {
            this.set("queryPredictions", []);
          }
        }.bind(this));
      }.bind(this));
    }.bind(this));
  }
});
