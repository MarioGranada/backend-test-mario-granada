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
    $scope.executeInput=function(input){
      var lines=$scope.splitMatrixInitialInput(input);
      var operationsQty=parseInt(lines[0]);
      var lineParts=null;
      var x1=0;
      var y1=0;
      var z1=0;
      var x2=0;
      var y2=0;
      var z2=0;
      var w=0;
      for (var i =  1; i < lines.length; i++) {
        lineParts=$scope.splitMatrixInputLine(lines[i]);
        if (lineParts.length == 2) {
          RappiMatrixService.RappiMatrix.reconstructMatrix(parseInt(lineParts[0]));
        }else{
          if (lineParts[0] == "UPDATE") {
            x1=parseInt(lineParts[1]) - 1;
            y1=parseInt(lineParts[2]) - 1;
            z1=parseInt(lineParts[3]) - 1;
            w=parseInt(lineParts[4]);
            RappiMatrixService.RappiMatrix.setValue(x1,y1,z1,w);
          };
          if (lineParts[0] == "QUERY") {
            x1=parseInt(lineParts[1]) - 1;
            y1=parseInt(lineParts[2]) - 1;
            z1=parseInt(lineParts[3]) - 1;
            x2=parseInt(lineParts[4]) - 1;
            y2=parseInt(lineParts[5]) - 1;
            z2=parseInt(lineParts[6]) - 1;
            $scope.matrixOutput+= (RappiMatrixService.RappiMatrix.sumPoints(x1,y1,z1,x2,y2,z2) + "\n" );
          };
        };

      };
    }
}]);

