'use strict';

var services = angular.module('services',[]);


services.factory("RappiMatrix",function(){

    var RappiMatrix=function(){
        this.matrix=null;
        this.size=0;
    }

    RappiMatrix.prototype.reconstructMatrix=function(n){
        this.size=n;
    }
    RappiMatrix.prototype.getValue=function(x,y,z){

    }
    RappiMatrix.prototype.setValue=function(x,y,z,w){

    }
    RappiMatrix.prototype.sumPoints=function(x1,y1,z1,x2,y2,z2){

    }
    RappiMatrix.prototype.size=function(){
        return this.size;
    }
    return RappiMatrix;

});


services.service('RappiMatrixService',function(RappiMatrix) {
    
    var RappiMatrix=new RappiMatrix();
    return {
        RappiMatrix: RappiMatrix
    }
    
});
