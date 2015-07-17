import Ember from 'ember';
import layout from '../templates/components/store-map';
import googleMapsApi from 'npm:google-maps-api';

/**
  To use this component in your app, add this to the template:
  ```{{store-map}}```
**/

export default Ember.Component.extend({
  layout: layout,

  didInsertElement: function() {
    googleMapsApi().then( function( maps ) {
      this.createMap();
      this.getLocationAndCenterMap();
    });
  },

  createMap: function() {
    this.infoWindow = new google.maps.InfoWindow();

    var center = new google.maps.LatLng(38.88,-121.016);

    this.map = new google.maps.Map(this.$("#map-canvas")[0],
      {
        center: center,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        panControl: true,
        panControlOptions: {
            position: google.maps.ControlPosition.RIGHT_BOTTOM
        },
        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.SMALL,
            position: google.maps.ControlPosition.RIGHT_BOTTOM
        },
      }
    );
  },

  getLocationAndCenterMap: function() {
    //we should start the geolocation call at the same time we start loading the map.
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        this.map.setCenter({lat: position.coords.latitude, lng: position.coords.longitude});

        this.set("params.lat", lat);
        this.set("params.lng", lng);
      }.bind(this));
    }
  },
});
