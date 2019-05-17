var myclubApp = angular.module('myclubApp', ['ngRoute']);

myclubApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){

  $locationProvider.html5Mode(true);

  $routeProvider
    .when('/home', {
      templateUrl: 'views/home.html',
      controller: 'clubController'
    })
    .when('/contact', {
      templateUrl: 'views/contact.html',
      controller: 'ContactController'
    })
    .when('/contact-success', {
      templateUrl: 'views/contact-success.html',
      controller: 'ContactController'
    })
    .when('/directory', {
      templateUrl: 'views/directory.html',
      controller: 'clubController'
    }).otherwise({
      redirectTo: '/home'
    });

}]);

myclubApp.directive('randomClub', [function(){

  return {
    restrict: 'E',
    scope: {
      clubs: '=',
      title: '='
    },
    templateUrl: 'views/random.html',
    transclude: true,
    replace: true,
    controller: function($scope){
    $scope.random = Math.floor(Math.random() * 4);
    }
  };
}]);

myclubApp.controller('clubController', ['$scope', '$http', function($scope, $http){

  $scope.removeclub = function(club){
    var removedclub = $scope.clubs.indexOf(club);
    $scope.clubs.splice(removedclub, 1);
  };

  $scope.addclub = function(){
    $scope.clubs.push({
      name: $scope.newclub.name,
      jersey: $scope.newclub.jersey,
      country: $scope.newclub.country,
      available: true
    });

    $scope.newclub.name = "";
    $scope.newclub.jersey = "";
    $scope.newclub.country = "";

  };

  $http.get('data/clubs.Json').success(function(data){
    $scope.clubs = data;
  });

}]);

myclubApp.controller('ContactController', ['$scope', '$location', function($scope, $location){

  $scope.sendMessage = function(){
    $location.path('/contact-success');
  };

}]);
