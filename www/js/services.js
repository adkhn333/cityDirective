app
.service('Location', function($q) {
    var obj = {};
    obj = {
        selectCity: function() {
            var defer = $q.defer();
            var cityData = firebase.database().ref('city');
            cityData.on('value', function(data) {
                defer.resolve(data.val());
                // $timeout(function() {
                //     $scope.cities = data.val();
                // }, 100);
            });
            return defer.promise;
        },
        selectZoneByCity: function(cityId) {
            var defer = $q.defer();
            var zoneData = firebase.database().ref('zone/' + cityId);
            zoneData.on('value', function(data) {
                defer.resolve(data.val());
                // $timeout(function() {
                //     $scope.zones = data.val();
                //     console.log($scope.zones);
                // }, 100);
            });
            return defer.promise;
        },
        selectLocationByZone: function(cityId, zoneId) {
            var defer = $q.defer();
            var locationData = firebase.database().ref('location/' + cityId);
            locationData.orderByChild("zoneId").equalTo(zoneId).on('value', function(data) {
                defer.resolve(data.val());
                // $timeout(function() {
                //     $scope.locations = data.val();
                //     console.log($scope.locations);
                // }, 100);
            });
            return defer.promise;
        },
        selectLocationByCity: function(cityId) {
            var defer = $q.defer();
            var locationData = firebase.database().ref('location/' + cityId);
            locationData.on('value', function(data) {
                console.log(data.val());
                defer.resolve(data.val());
                // $timeout(function() {
                //     $scope.locations = data.val();
                //     console.log($scope.locations);
                // }, 100);
            });
            return defer.promise;
        }
    };
    return obj;
});