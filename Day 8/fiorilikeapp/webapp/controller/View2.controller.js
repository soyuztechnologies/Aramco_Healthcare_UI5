sap.ui.define([
    'emc2/sd/products/controller/BaseController',
    'sap/m/MessageBox',
    'sap/m/MessageToast',
    'sap/ui/core/Fragment'
], function(BaseController, MessageBox, MessageToast, Fragment) {
    'use strict';
    return BaseController.extend("emc2.sd.products.controller.View2",{
        //This is the constructor of the class
        //where we can put all the initialization code
        onInit: function(){

            this.oRouter = this.getOwnerComponent().getRouter();
            //I need a function which gets triggered every time the end point changes
            //Route changes, Hash Tag changes
            //Whenever the route changes to loadMyV2, an Event matched will gets triggered
            //whenever its triggered we are calling a function herculis
            //also pass the controller object to this function
            this.oRouter.getRoute("loadMyV2").attachMatched(this.herculis, this);
        },
        herculis : function(oEvent){
            //Extract the Fruit id from the route of the router
            var sFruitId = oEvent.getParameter("arguments").fruitId;
            //Build the path for element binding- /fruits/2
            var sPath = '/fruits/' + sFruitId;
            //Bind the current view 2 object directly
            this.getView().bindElement(sPath);
        },
        oSupplierPopup: null,
        onFilter: function(){
            //Step 1: load our fragment
            //create a copy of controller object
            var that = this;
            //its similar to abap - IF lo_alv IS NOT BOUND
            if(!this.oSupplierPopup){
                Fragment.load({
                    name:"emc2.sd.products.fragments.popup",
                    type:"XML",
                    id:"supplier",
                    controller: this
                })
                    //Step 2: promise which will be called when the fragment loads
                .then(function(oFragment){
                    that.oSupplierPopup = oFragment;
                    that.oSupplierPopup.setTitle("Suppliers");
                    that.getView().addDependent(that.oSupplierPopup);
                    that.oSupplierPopup.bindAggregation("items",{
                        path: '/suppliers',
                        template: new sap.m.DisplayListItem({
                            label: '{name}',
                            value: '{sinceWhen}'
                        })
                    });
                    that.oSupplierPopup.open();
                });
            }else{
                this.oSupplierPopup.open();
            }
            
        },
        oCityPopup: null,
        onConfirm: function(oEvent){
            var sId = oEvent.getSource().getId();
            if(sId.indexOf('supplier') !== -1){
                //Step 1: get the selected item object
                var oSelectedItem = oEvent.getParameter("selectedItem");
                //Step 2: get the label of selected item
                var sLabel = oSelectedItem.getLabel();
                //Build a filter to inject in table
                var oFilter = new sap.ui.model.Filter("name", "EQ", sLabel);
                //Inject in table
                this.getView().byId("idTab").getBinding("items").filter(oFilter);
            }else{
                //Step 1: get the selected item object
                var oSelectedItem = oEvent.getParameter("selectedItem");
                //Step 2: get the label of selected item
                var sLabel = oSelectedItem.getLabel();
                //Step 3: set this to our field
                this.oField.setValue(sLabel);
            }
            
        },
        oField: null,
        onF4Help: function(oEvent){
            //take a snapshop of the field inside the table 
            //on which F4 was pressed
            this.oField = oEvent.getSource();
            //Step 1: load our fragment
            //create a copy of controller object
            var that = this;
            //its similar to abap - IF lo_alv IS NOT BOUND
            if(!this.oCityPopup){
                Fragment.load({
                    name:"emc2.sd.products.fragments.popup",
                    type:"XML",
                    id:"cities",
                    controller: this
                })
                    //Step 2: promise which will be called when the fragment loads
                .then(function(oFragment){
                    that.oCityPopup = oFragment;
                    that.oCityPopup.setTitle("Cities");
                    that.getView().addDependent(that.oCityPopup);
                    that.oCityPopup.bindAggregation("items",{
                        path: '/cities',
                        template: new sap.m.DisplayListItem({
                            label: '{name}',
                            value: '{population}'
                        })
                    });
                    that.oCityPopup.open();
                });
                
            }else{
                this.oCityPopup.open();
            }
        },
        onSave: function(){
            MessageBox.confirm("Would you like to save?",{
                title: "Confirm",
                onClose: this.closePopup.bind(this)
            });
        },
        closePopup: function(status){
            //here we will not be allowed to access this pointer 
            //we have to explicitly pass the 'this' pointer to the controller object
            if(status === "OK"){
                MessageToast.show("The order has been created successfully");
            }else{
                MessageBox.error("Action was cancelled");
            }
        },
        onBack: function(){
            //nav to view 1
            this.getView().getParent().to("idView1");
        },
        onSupplierSelect: function(oEvent){
            var oSelected = oEvent.getParameter("listItem");
            var sPath = oSelected.getBindingContextPath();
            var sId = sPath.split("/")[sPath.split("/").length - 1];
            this.oRouter.navTo("supplier",{
                supplierId : sId
            });
            //alert(sPath);
        },
        onAddNewCol: function(){
            var oColumn = new sap.m.Column({header: new sap.m.Text({text: "Dynamite"})
                                            });
            var oTable = this.getView().byId("idTab");
            oTable.addColumn(oColumn);
            oTable.bindAggregation("items",{
                path : '/suppliers',
                template: new sap.m.ColumnListItem({
                    cells: [
                        new sap.m.Text({text: "{name}"}),
                        new sap.m.Input({value: "{city}"}),
                        new sap.m.Text({text: "{sinceWhen}"}),
                        new sap.m.Text({text: "{contactPerson}"}),
                        new sap.m.Text({text: "{email}"})
                    ]
                })
            });
        }
    });
});