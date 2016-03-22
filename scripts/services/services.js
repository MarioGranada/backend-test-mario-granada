'use strict';

var services = angular.module('services',[]);


services.factory("RappiMatrix",function(){

    var RappiMatrix=function(){
        this.matrix=null;
    }

    return RappiMatrix;

});


services.service('RappiMatrixService',function(RappiMatrix) {
    
    var RappiMatrix=new RappiMatrix();
    return {
        RappiMatrix: RappiMatrix
    }
    
});
