'use strict';

var services = angular.module('services',[]);


services.factory("RappiMatrix",function(){

    var RappiMatrix=function(){
        this.matrix=null;
        this.size=0;
    }

    RappiMatrix.prototype.reconstructMatrix=function(n){
        this.size=n;
        this.matrix= new Array(n);
        for (var i = 0; i < n; i++) {
            this.matrix[i] = new Array(n);
            for (var j = 0; j < n; j++) {
                this.matrix[i][j] = new Array(n);
                for (var z = 0; z < n; z++) {
                    this.setValue(i,j,z,0);
                }
            }
        }
    }
    RappiMatrix.prototype.getValue=function(x,y,z){
        return this.matrix[x][y][z];
    }
    RappiMatrix.prototype.setValue=function(x,y,z,w){
        this.matrix[x][y][z]=w;
    }
    RappiMatrix.prototype.sumPoints=function(x1,y1,z1,x2,y2,z2){
        var sum=0;
        for ( var i=0; x1 <= x2; i++) {
            sum+=this.matrix[x1][y1][z1];
            x1++;
            y1++;
            z1++;
        };
        return sum;
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
