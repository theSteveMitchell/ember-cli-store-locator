import Ember from 'ember';
import layout from '../templates/components/store-search';
import StoreMap from './store-map';

export default Ember.Component.extend({
  layout: layout,
  queryPredictions: [],

  didInsertElement: function() {
    this.element.focus();
    debugger;
  },

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
            var emberWrappedPredictions = predictions.map(function(prediction){
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
  },

  moveAutocompleteHighlight: function(direction) {
    var currentIndex = this.get("autocompleteIndex") || 0;
    var queryPredictions = this.get("queryPredictions");

    var newIndex;
    if(direction === "up") {
      newIndex = Math.max(0, currentIndex - 1);
    } else {
      newIndex = Math.min(this.get("queryPredictions").length - 1, currentIndex + 1);
    }

    queryPredictions[currentIndex].set("isHighlighted", false);
    queryPredictions[newIndex].set("isHighlighted", true);

    this.set("autocompleteIndex", newIndex);
  }, 

  actions: {
    // submitSearch handles enter key in the search box.
    // If no autocomplete suggestion is highlighted, we select the first.
    submitSearch: function(e, c) {
      var predictions = this.get("queryPredictions");
      var autocompleteIndex = this.get("autocompleteIndex");
      //this.send("selectPlacePrediction", predictions[autocompleteIndex]);
      //place_id = predictions[autocompleteIndex].get("place_id");
      debugger;
      Ember.$(evt.target).trigger(didPickAutocompleteSuggestion, place_id);
    },

    // pickSuggestion handles mouse click on an autocomplete suggestion
    PickSuggestion: function(google_place) {
      debugger;
    }


  }

  //

});
