'use strict';
var controllers = angular.module('controllers',['services']);


controllers.controller('NewsFeedCtrl',['$scope','$http',function($scope,$http){

    $scope.currentNewTitle="";
    $scope.$parent.displayElementsOnList=false;
    $http({method: 'GET', url:'api/news_mock.json'}).success(function(data, status, headers, config){
      $scope.newsList=data;

      $scope.setCurrentNewTitle=function(active_new){
        $scope.currentNewTitle=active_new;
      }
      $scope.removeCurrentNewTitle=function(){
        $scope.currentNewTitle="";
      }
      $scope.displayCurrentElement=function($event){

        var currentTarget=$($($event.currentTarget).siblings(".item-info-container"));
       
        if ($(currentTarget).hasClass("active-item-info-container")) {
          $scope.removeCurrentNewTitle();
        }else{
          $scope.hideAllNewsMainContent();
          $scope.setCurrentNewTitle($($event.currentTarget).attr("value"));
        }
        $(currentTarget).toggleClass("active-item-info-container");
        
      }
      $scope.displayElementsList=function(){
        $(".item-box").toggleClass("display-element");
        $scope.removeCurrentNewTitle();
        $scope.hideAllNewsMainContent();
      }
      $scope.hideAllNewsMainContent=function(){
        $(".item-info-container").removeClass("active-item-info-container");
      }
    }).error(function(data, status, headers, config){
      console.log("Error loading Sailings");
    });
}]);