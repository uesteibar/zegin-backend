zegin.factory('EventsService',['$http', function($http){
    return{
        getAllEvents: function(){
            return $http.get(options.api.base_url + '/api/events');
        },
       saveEvent: function(event){
           return $http.post(options.api.base_url + '/api/events', event);
       },
       deleteEvent: function(event){
           return $http.delete(options.api.base_url + '/api/events/'+post._id, event);
       },
       updateEvent: function(event){
           return $http.put(options.api.base_url + '/api/events/'+post._id, event);
       },
       getEvent: function(id){
           return $http.get(options.api.base_url + '/api/events/'+id);
       }
    }
}]);