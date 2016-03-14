/**
 * Main AngularJS Web Application
 */
'use strict';

var app = angular.module('grabilityTestApp',['ngRoute','controllers']);

/**
 * Configure the Routes
 */
app.config(['$routeProvider', function($routeProvider){
  $routeProvider.
    when("/news_feed",{
      templateUrl:'views/home.html',
      controller: 'NewsFeedCtrl'
    }).
    otherwise({
      redirectTo: "/news_feed"
    });
}]);