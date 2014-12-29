var zegin = angular.module("zegin", ['ngRoute']);

// public/js/appRoutes.js
zegin.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider



        // nerds page that will use the NerdController
        .when('/events', {
            templateUrl: 'views/events.html',
            controller: 'EventsCtrl'
        })


    .otherwise({ redirectTo: '/events' });

    $locationProvider.html5Mode({
	  enabled: true,
	  requireBase: false
	});

}]);

