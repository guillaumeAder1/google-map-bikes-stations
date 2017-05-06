'use strict';

/**
 * @ngdoc service
 * @name testControllerViewsApp.getBikes
 * @description
 * # getBikes
 * Factory in the testControllerViewsApp.
 */
angular.module('testControllerViewsApp')
    .factory('getBikes', function($http) {
        var APIkeyDublinBike = "cd68da53009a674d943220ef0a67623682aa00ce";
        return {
            getListBike: function() {
                return $http.get("https://api.jcdecaux.com/vls/v1/stations?contract=dublin&apiKey=" + APIkeyDublinBike);
            },

            getCityList: function() {
                return $http.get("https://api.jcdecaux.com/vls/v1/contracts?&apiKey=" + APIkeyDublinBike)
            },

            getCityBike: function(station) {
                return $http.get("https://api.jcdecaux.com/vls/v1/stations?contract=" + station + "&apiKey=" + APIkeyDublinBike);

            }
        };

    });