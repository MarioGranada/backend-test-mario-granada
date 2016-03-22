/**
 * Main AngularJS Web Application
 */
'use strict';

var app = angular.module('grabilityBackendTestApp',['ngRoute','controllers']);

/**
 * Configure the Routes
 */
app.config(['$routeProvider', function($routeProvider){
  $routeProvider.
    when("/matrix",{
      templateUrl:'views/home.html',
      controller: 'MatrixCtrl'
    }).
    otherwise({
      redirectTo: "/matrix"
    });
}]);