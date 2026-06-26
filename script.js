// function appendValue(value){
//     const display = document.getElementById("display");
//     if(display.value ==='0' || display.value ==='Error'){
//         display.value = value;
//     }
//         else{
//             display.value += value;
//         }
//     }
// function clearDisplay(){
//     document.getElementById("display").value = '0';
// }    
// //Ek ek karke piche se number hatane ke liye (Backspace Button)
// function backspace(){
//     const display = document.getElementById("display");
//     if(display.value.length>1 && display.value !== 'Error'){
//         display.value=display.value.slice(0,-1);
//     }else{
//         display.value = '0'
//     }
// }
// function calculate(){
//     const display = document.getElementById("display");
//     let expression = display.value;
//     try{
//         expression = expression.replace(/x/g,'*').replace(/÷/g, '/');
//         let result =eval(expression);
//         // Agar result bhot lamba decimal hai toh use fix karein
//         if(result.toString().includes('.')){
//             result = parseFloat(result.toFixed(4));
//         }
//         display.value = result;
//     }catch(e){
//         display.value = 'Error';
//     }
// }






const display = document.getElementById("display");


// Button value add
function appendValue(value){

    if(display.value === "0" || display.value === "Error"){
        display.value = value;
    }
    else{
        display.value += value;
    }
}


// Clear screen
function clearDisplay(){
    display.value = "0";
}


// Backspace
function backspace(){

    if(display.value.length > 1 && display.value !== "Error"){
        display.value = display.value.slice(0,-1);
    }
    else{
        display.value = "0";
    }
}


// Calculate
function calculate(){

    let expression = display.value;

    try{

        expression = expression
        .replace(/÷/g,"/")
        .replace(/x/g,"*");


        let result = eval(expression);


        if(result.toString().includes(".")){
            result = result.toFixed(4);
        }


        addHistory(expression,result);

        display.value = result;

    }
    catch{

        display.value="Error";
    }
}



// History
function addHistory(exp,result){

    let history = JSON.parse(localStorage.getItem("history")) || [];

    history.push(`${exp} = ${result}`);

    localStorage.setItem(
        "history",
        JSON.stringify(history)
    );

    showHistory();
}



function showHistory(){

    let list = document.getElementById("historyList");

    list.innerHTML="";

    let history = JSON.parse(localStorage.getItem("history")) || [];


    history.slice(-5).reverse().forEach(item=>{

        let li=document.createElement("li");

        li.innerText=item;

        list.appendChild(li);

    });

}


function clearHistory(){

    localStorage.removeItem("history");

    showHistory();
}



// Dark / Light mode

function toggleTheme(){

    document.body.classList.toggle("light");

}



// Keyboard support

document.addEventListener("keydown",function(e){


    if(!isNaN(e.key) || "+-*/.%".includes(e.key)){

        appendValue(e.key);

    }


    if(e.key==="Enter"){

        calculate();

    }


    if(e.key==="Backspace"){

        backspace();

    }


});


// page load history

showHistory();
