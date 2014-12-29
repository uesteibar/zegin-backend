var zegin = angular.module("zegin", ['ngRoute']);

var options = {};
options.api = {};
options.api.base_url = "http://localhost:3000";


zegin.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider



        // nerds page that will use the NerdController
        .when('/zegin-dashboard', {
            templateUrl: 'views/events.html',
            controller: 'EventsCtrl'
        })
        .when('/zegin-new', {
            templateUrl: 'views/new_event.html',
            controller: 'NewEventCtrl'
        })


    .otherwise({ redirectTo: '/zegin-dashboard' });

    $locationProvider.html5Mode({
	  enabled: true,
	  requireBase: false
	});

}]);

