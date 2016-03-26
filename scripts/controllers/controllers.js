'use strict';
var controllers = angular.module('controllers',['services']);


controllers.controller('MatrixCtrl',['$scope','RappiMatrixService',function($scope,RappiMatrixService){

  $scope.matrixInput="";
  $scope.matrixOutput="";

    $(".rappimatrixbutton").click(function(e){
      e.preventDefault;
      $scope.matrixInput=$(".matrix-input").val();
      $scope.executeInput($scope.matrixInput);
    });

    $scope.splitMatrixInitialInput=function(input){
      return input.split(/\r?\n/);
    }
    $scope.splitMatrixInputLine=function(line){
      return line.split(" ");
    }
    $scope.isAValidNumber=function(number){
      return !isNaN(number);
    }
    $scope.isValidCoord=function(x,y,z, n){
      if ($scope.isAValidNumber(x) && $scope.isAValidNumber (y) && $scope.isAValidNumber(z)) {
        var validX=(x >= 1) && (x <= n);
        var validY=(y >= 1) && (y <= n);
        var validZ=(z >= 1) && (z <= n);
        return validX && validY && validZ;
      };
      return false;
    }
    $scope.isValidQuery=function(x1,y1,z1,x2,y2,z2,n){
      if ($scope.isValidCoord(x1,y1,z1,n) && $scope.isValidCoord(x2,y2,z2,n)) {
        var validX=(x1 <= x2);
        var validY=(y1 <= y2);
        var validZ=(z1 <= z2);
        return validX && validY && validZ;
      };
      return false;
    }
    $scope.isValidNumberOfCases=function(t){
      if ($scope.isAValidNumber(t)) {
        return (t >= 1) && (t <= 50);
      };
      return false;
    }
    $scope.isValidMatrixDimension=function(n){
      if ($scope.isAValidNumber(n)) {
        return (n >= 1) && (n <= 100);
      };
      return false;
    }
    $scope.isValidNumberOfOperations=function(m){
      if ($scope.isAValidNumber(m)) {
        return (m >= 1) && (m <= 1000);
      };
      return false;
    }
    $scope.isValidValue=function(w){
      if ($scope.isAValidNumber(w)) {
        return (w >= -1000000000) && (w <= 1000000000);
      };
      return false;
    }
    $scope.executeInput=function(input){
      var lines=$scope.splitMatrixInitialInput(input);
      var lineParts=null;
      var x1=0;
      var y1=0;
      var z1=0;
      var x2=0;
      var y2=0;
      var z2=0;
      var w=0;
      var N= 0;
      var M=0;
      var T= $scope.isValidNumberOfCases(lines[0]) ? parseInt(lines[0]) : 0;
      if (T != 0) {

        for (var i =  1; i < lines.length; i++) {
        lineParts=$scope.splitMatrixInputLine(lines[i]);
        if (lineParts.length == 2) {
          if ($scope.isValidMatrixDimension(lineParts[0])) {
            N=parseInt(lineParts[0]);
            RappiMatrixService.RappiMatrix.reconstructMatrix(parseInt(lineParts[0]));
          }else{
            alert("Invalid Cube Dimensions");
          };
        }else{
          if (lineParts[0] == "UPDATE") {
            
            if ($scope.isValidCoord(lineParts[1],lineParts[2],lineParts[3],N) && $scope.isValidValue(lineParts[4])) {
              x1=parseInt(lineParts[1]) - 1;
              y1=parseInt(lineParts[2]) - 1;
              z1=parseInt(lineParts[3]) - 1;
              w=parseInt(lineParts[4]);

              RappiMatrixService.RappiMatrix.setValue(x1,y1,z1,w);
            } else{
              alert("Invalid UPDATE statement"+lines[i])
            };
            
          };
          if (lineParts[0] == "QUERY") {

            if ($scope.isValidCoord(lineParts[1],lineParts[2],lineParts[3],N) && $scope.isValidCoord(lineParts[4],lineParts[5],lineParts[6],N)) {
              x1=parseInt(lineParts[1]) - 1;
              y1=parseInt(lineParts[2]) - 1;
              z1=parseInt(lineParts[3]) - 1;
              x2=parseInt(lineParts[4]) - 1;
              y2=parseInt(lineParts[5]) - 1;
              z2=parseInt(lineParts[6]) - 1;
              $scope.matrixOutput+= (RappiMatrixService.RappiMatrix.sumPoints(x1,y1,z1,x2,y2,z2) + "\n" );
            }else{
              alert("Invalid QUERY statement"+lines[i]);
            };
            
          };
        };

      };

      } else{
        alert("Invalid number of test cases");
      };
      
      
    }
}]);

