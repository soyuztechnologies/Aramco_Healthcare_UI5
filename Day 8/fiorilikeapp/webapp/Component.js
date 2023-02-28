sap.ui.define([
    'sap/ui/core/UIComponent'
], function(UIComponent) {
    'use strict';
    return UIComponent.extend("emc2.sd.products.Component",{
        metadata: {
            manifest: "json"
        },
        init: function(){
            //call the base class constructor to get free benefits from super class
            //super->constructor()
            //Baseclass.prototype.constructorname.apply(this)
            UIComponent.prototype.init.apply(this);

            //Step 1: get the router object from base class
            var oRouter = this.getRouter();
            //Step 2: initialize the router - SAPUI5 will scan manifest to check routing config
            oRouter.initialize();
        },
        destroy: function(){

        }
    });
});