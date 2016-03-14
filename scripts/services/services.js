'use strict';

var services = angular.module('services',[]);



services.factory("Sailing",function($scope,$http){
    var Sailing=function(id,name,cruise_line_id,main_image,sailing_options) {
        this.id=id;
        this.name=name;
        this.cruise_line_id=cruise_line_id;
        this.main_image=main_image;
        this.sailing_options=sailing_options;
    };

    var Sailing=function(sailing_options) {
        this.sailing_options=sailing_options;
    };
    return Sailing;
});

services.factory("CruiseLine",function($scope,$http){
    var CruiseLine=function(id,name,ship_name) {
        this.id=id;
        this.name=name;
        this.ship_name=ship_name;
    };



    return CruiseLine;
});

services.factory("Checkout",function(){
    var Checkout=function(){
        this.cruiseLinesList=[];
        this.sailingsList=[];
        this.total=0.0;
    }
    Checkout.prototype.addCruiseLine = function(item) {
        this.cruiseLinesList.push(item);
    };
    Checkout.prototype.addSailing = function(item) {
        this.sailingsList.push(item);
    };
    Checkout.prototype.setCruiseLinesList=function(itemsList){
        this.cruiseLinesList=[];//Reseting the Checkout List in order to avoid duplicates
        this.cruiseLinesList=itemsList;
    }
    Checkout.prototype.setSailingsList=function(itemsList){
        this.sailingsList=[];//Reseting the Checkout List in order to avoid duplicates
        this.sailingsList=itemsList;
        // console.log("set sailings");
    }
    Checkout.prototype.getCruiseLines=function(){
        return this.cruiseLinesList;
    };
    Checkout.prototype.getSailings=function(){
        return this.sailingsList;
    };
    Checkout.prototype.updateTotal=function(addValue){
        this.total=parseFloat(addValue);
        return this.total;
    };
    Checkout.prototype.getCruiseLine=function(CruiseLineId){
        var cl=_.find(this.cruiseLinesList, function(chr) {
            return chr.cruise_line_id == CruiseLineId;
        });
        return cl;
    }
    Checkout.prototype.getCruiseLineInfo=function(CruiseLine){
        return CruiseLine.cruise_line_name+"-"+CruiseLine.cruise_ship_name;
    }
    Checkout.prototype.getTotal=function(){
        return this.total;
    };
    Checkout.prototype.getCruiseLinesLength=function(){
        return this.cruiseLinesList.length;
    };
    Checkout.prototype.getSailingsLength=function(){
        return this.sailingsList.length;
    };
    Checkout.prototype.findStartingPriceforSailing=function(sailing){
        var start_price=0;
        var sailing_options=sailing.sailing_options;
        if (sailing_options.length > 0) {
            start_price=sailing_options[0].sailing_price;
            for (var i = 0; i < sailing_options.length; i++) {
                if (sailing_options[i].sailing_price < start_price) {
                    start_price=sailing_options[i].sailing_price;
                };
            };
        }
        return start_price;

    }
    return Checkout;
});



services.service('CheckoutService',function(Checkout) {
    
    var Checkout=new Checkout();
    return {
        Checkout: Checkout
    }
    
});
