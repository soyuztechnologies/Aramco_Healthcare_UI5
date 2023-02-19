// Internal Java Script
function chandra(){
    //example 1: output function
    alert('Hey SAP consultants, how are you?');
}
function onLogin(){
    //example 2: output function
    console.log("now system trigger login code");
    //Step 1: get the object of the field
    var oUser = document.getElementById("idUsr");
    var oPassword = document.getElementById("idPwd");
    //Step 2: get the value from object of field
    var sUser = oUser.value;
    var sPwd = oPassword.value;
    //Step 3: Compare user and password
    if(sUser === sPwd){
        //Step 4: if they are same, change the whole DOM - Example 3 - output function
        //Exmaple 3: change the whole dom
        document.write("Login success");
    }else{
        //Step 5: else, show error message inside a label                
        var oMsg = document.getElementById("idMsg");
        //Output function 4
        oMsg.innerText = "Login failed, please try again!";
    }
}
function shaji(){
    //Step 1: get all the elements object for the given class name
    var aElements = document.getElementsByClassName("box-content");
    //Step 2: Loop each element one by one
    for (let i = 0; i < aElements.length; i++) {
        const element = aElements[i];
        //Step 3: inside loop, we will change color at runtime
        element.style.backgroundColor = "black";
    }
    
}

function addContent(){

    //Step 1: create a brand new element of type h4 tag
    var newElement = document.createElement("h4");
    //Step 2: Create a text node
    var oTextNode = document.createTextNode("Hello Aramco");
    //Step 3: add the text node inside the newly created element 
    newElement.appendChild(oTextNode);
    //Step 4: get a empty div object - canvas
    var oCanvas = document.getElementById("canvas");
    //Step 5: finally add the element below the canvas
    oCanvas.appendChild(newElement);

}

function async(){
    var msg = document.getElementById("idMsg");
    msg.innerText = "came to code";
    //JS is not going to wait here, it is asynchrnous
    setTimeout(
    //callback function    
        function(){  
            msg.innerText = msg.innerText + "<br> we are done";
        }, 
        5000);   
   
}