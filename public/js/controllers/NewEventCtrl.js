zegin.controller('NewEventCtrl', function($scope, EventsService) {
	$scope.event = {
        name: "",
        date: 0
    };


    $scope.saveEvent = function(){

        $scope.event.locationData = $scope.placeRaw.geometry.location;

        EventsService.saveEvent($scope.event).then(function () {
            console.log($scope.event);
            $scope.event = {
                name: "",
                date: 0
            };
            // toastr.success("Email saved");
        }, function (err) {
            console.log(err);
            // toastr.error("Email couldn't be saved");
        });
    };
});