const display = document.getElementById("display");
function appendValue(value){
    if(display.value =="0" || display.value =="Error"){
        display.value = value;
    }
    else{
        display.value += value;
    }
}
function clearDisplay(){
    display.value="0";
}
function backspace(){
    if(display.value.length > 1){
        display.value = display.value.slice(0,-1);
    }
    else{
        display.value ="0";
    }
}
function calculate(){
    try{
        let exp = display.value.replace(/÷/g,"/").replace(/x/g,"*");
        let result = eval(exp);
        if(result.toString().includes(".")){
            result = parseFloat(result.toFixed(4));
        }
        addHistory(exp,result);
        display.value = result;
    }
    catch{
         display.value = "Error";
    }
}
function addHistory(exp,result){
    let history = JSON.parse(localStorage.getItem("history")) || [];
    history.push(`${exp} = ${result}`);
    localStorage.setItem("history",JSON.stringify(history));
    showHistory();

}
function showHistory(){
    const list=document.getElementById("historyList");
    if(!list) return;
    list.innerHTML="";
    (JSON.parse(localStorage.getItem("history")) || [])
    .slice(-5).reverse().forEach(item=>{
        let li=document.createElement("li");
        li.innerText=item;
        list.appendChild(li);
    });
}
function clearHistory(){
    localStorage.removeItem("history");
    showHistory();
}
function toggleTheme(){
    document.body.classList.toggle("light");
}
document.addEventListener("keydown",e=>{
    if(!isNaN(e.key)||"+-*/.%".includes(e.key)) appendValue(e.key);
    if(e.key=="Enter") calculate();
    if(e.key=="Backspace") backspace();
});
showHistory();