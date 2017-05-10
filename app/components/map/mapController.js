'use strict';

/**
 * @ngdoc function
 * @name testControllerViewsApp.controller:MapCtrl
 * @description
 * # MapCtrl
 * Controller of the testControllerViewsApp
 */
angular.module('testControllerViewsApp')
    .controller('MapCtrl', function($scope) {

        var mapOptions = {
            zoom: 12,
            center: new google.maps.LatLng(53.3498, -6.2603),
            mapTypeId: google.maps.MapTypeId.TERRAIN
        };

        $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
        $scope.bounds = new google.maps.LatLngBounds();
        $scope.markers = [];
        var infoWindow = new google.maps.InfoWindow();

        // on data received
        $scope.$on("_displayStations::send", function(e, results) {
            $scope.clearMarker();
            // use boud to stock the position of the point and get extent later
            $scope.bounds = new google.maps.LatLngBounds();
            for (var i in results) {
                createMarker(returnData(results[i]));
            }
            $scope.map.fitBounds($scope.bounds);

        });

        // format data to use (title/address/coordinates)
        var returnData = function(data) {
            return {
                lng: data.position.lng,
                lat: data.position.lat,
                name: data.name,
                status: data.status,
                address: data.address
            };
        };

        // remove previsou markers
        $scope.clearMarker = function(val) {
            for (var i in $scope.markers) {
                $scope.markers[i].setMap(null);
            }
            $scope.markers = [];
        };

        // create marker and infowindow
        var createMarker = function(info) {
            var marker = new google.maps.Marker({
                map: $scope.map,
                position: new google.maps.LatLng(info.lat, info.lng),
                title: info.name
            });
            marker.content = '<div class="infoWindowContent">' + info.address + '</div>';
            google.maps.event.addListener(marker, 'click', function() {
                infoWindow.setContent('<h4>' + marker.title + '</h4>' + marker.content);
                infoWindow.open($scope.map, marker);
            });
            $scope.markers.push(marker);
            $scope.bounds.extend(marker.getPosition());
        };


        // $scope.openInfoWindow = function(e, selectedMarker) {
        //     e.preventDefault();
        //     google.maps.event.trigger(selectedMarker, 'click');
        // };

        // DEBUG::helper (get boundarBx event) 
        var initEvent = function() {
            var initialBounds;
            google.maps.event.addListener($scope.map, 'bounds_changed', function() {
                console.log($scope.map.getBounds());
            });
        };
        //initEvent();
    });