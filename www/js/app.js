// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic'])

app.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

            // Don't remove this line unless you know what you are doing. It stops the viewport
            // from snapping when text inputs are focused. Ionic handles this internally for
            // a much nicer keyboard experience.
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})

app.controller('mainCtrl', function($scope, $timeout) {



    // Get a key for a new Post.
    // var newPostKey = firebase.database().ref().child('city').push().key;

    //   var cityData = {
    //   cityName: 'bangalore',
    //   lat: 77.877474,
    //   lng: 67.87676,
    //   country: 'india',
    //   state: 'karnataka',
    //   cityId:  newPostKey
    // };
    //   var updates = {};
    //   updates['/city/' + newPostKey] = cityData;
    //   firebase.database().ref().update(updates);


    //   var newPostKey = firebase.database().ref().child('zone').push().key;

    // var zoneData = {
    //     zoneName: 'Sohna Road',
    //     lat: 77.877474,
    //     lng: 67.87676,
    //     cityName: 'Gurgaon',
    //     cityId:  '-KKwFI52ZEHYVeLcSRyi',
    //     zoneId: newPostKey
    //   };

    //     var updates = {};
    //     updates['/zone/-KKwFI52ZEHYVeLcSRyi/' + newPostKey] = zoneData;
    //     firebase.database().ref().update(updates);


    //   var newPostKey = firebase.database().ref().child('location').push().key;

    // var locationData = {
    //     locationName: 'sector 48',
    //     lat: 77.877474,
    //     lng: 67.87676,
    //     cityName: 'Gurgaon',
    //     cityId:  '-KKwFI52ZEHYVeLcSRyi',
    //     zoneName: 'Sohna Road',
    //     zoneId: '-KKwJ-VYTZlRmrhavJvR',
    //     locationId: newPostKey
    //   };

    //       var updates = {};
    //     updates['/location/-KKwFI52ZEHYVeLcSRyi/' + newPostKey] = locationData;
    //     firebase.database().ref().update(updates);

    // 
    $scope.cityDetails = {
        selectedCity: ""
    }

    $scope.zoneDetails = {
        selectedZone: ""
    }

    $scope.locationDetails = {
        selectedLocation: ""
    }
    $scope.selectCity = function() {

        //console.log($scope.cityDetails.selectedCity);
        var zoneData = firebase.database().ref('zone/' + $scope.cityDetails.selectedCity);
        zoneData.on('value', function(data) {
            $timeout(function() {
                $scope.zones = data.val();
                console.log($scope.zones);
            }, 100);

        });

    }


    $scope.selectZone = function() {
        console.log($scope.zoneDetails.selectedZone);
        var locationData = firebase.database().ref('location/' + $scope.cityDetails.selectedCity);
        locationData.orderByChild("zoneId").equalTo($scope.zoneDetails.selectedZone).on('value', function(data) {
            $timeout(function() {
                $scope.locations = data.val();
                console.log($scope.locations);
            }, 100);

        });
    }

    var cityData = firebase.database().ref('city');
    cityData.on('value', function(data) {
        $timeout(function() {
            $scope.cities = data.val();
        }, 100);

    });

});