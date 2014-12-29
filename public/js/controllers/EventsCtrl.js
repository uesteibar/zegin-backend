zegin.controller('EventsCtrl', function($scope, EventsService) {
	$scope.events = [];
    $scope.refreshEvents = function(){
        EventsService.getAllEvents().then(function (res) {
            $scope.events = res.data;
            console.log($scope.events);
        }, function (err) {
            $window.alert(err);
        });
    };
    
    $scope.refreshEvents();
});