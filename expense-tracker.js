let blaance= document.querySelector("#Balance");    //bal
let inc_amt=document.querySelector("#inc-amt");     //inc amt
let exp_amt= document.querySelector("#exp-amt");    //exp amt
let trans= document.querySelector("#trans");        //ul
let form= document.querySelector("#form");          //form
let description= document.querySelector("#desc");   //desc
let amount= document.querySelector("#amount");      //amt
/*
const dummyData=[
    { id:1,description:"food",amount:-150},
    { id:2,description:"salary",amount:25000},
    { id:3,description:"petrol",amount:250},
    { id:4,description:"flower",amount:-100},
    { id:5,description:"mobile",amount:-10000},
];
let transactions =dummyData;
*/

//    localStorage
const localstoragetrans = JSON.parse(localStorage.getItem("trans"))

let transactions = localStorage.getItem("trans") !== null ? localstoragetrans :[];

// left side load trans details
function loadTransDetails(transaction){
     const sign  = transaction.amount < 0 ? "-":"+"; 
    //  console.log(sign);
     const item = document.createElement("li");
     item.classList.add(transaction.amount < 0 ? "exp":"inc");
     item.innerHTML=`
       ${transaction.description}
       <span>${sign} ${Math.abs(transaction.amount)}</span>
       <button class="btn-del" onclick="removeTrans(${transaction.id})">X</button> 
     `
        trans.appendChild(item);

// console.log(transaction);
}

// remove transaction
function removeTrans(id){
    // console.log(id );
    if(confirm( "Are you sure you want to delete this transcation?"))
    {
        transactions=transactions.filter((transaction) =>
        transaction.id != id);
        config();
        updatelocalstorage();
    }
    else{
        return;
    }
}

//Amount update => total ,income, expense.
function updateAmount(){
const amounts=transactions.map((transaction) =>transaction.amount);
// console.log(amounts);
//readuce-->fun() : using 2 perametter 1 accumulatter,2 item

//total
const total=amounts.reduce((acc,item)  =>(acc += item),0).toFixed(2);
blaance.innerHTML=`₹ ${total}`

//income total
const income=amounts.filter((item) => item > 0)
.reduce((acc,item) =>(acc += item),0)
.toFixed(2);
inc_amt.innerHTML=`₹ ${income}`

//expense total
const expense=amounts.filter((item) => item < 0)
.reduce((acc,item) =>(acc += item),0) 
.toFixed(2);
exp_amt.innerHTML=`₹ ${expense}` //math.abs(expense)    =>(-)

}

function config(){
     trans.innerHTML="";
     transactions.forEach(loadTransDetails);
     updateAmount();
}

//Add transaction R to L
function addTrans(e){
    e.preventDefault();
    if(description.value=="" && amount.value=="")
    {
        alert("Enter the description and amount ")
    }  
    else{
        const transactionss={
            id:uniqueid(),
            description:description.value,
            amount:+amount.value,       
        };
        transactions.push(transactionss);
        loadTransDetails(transactionss);
        description.value="";
        amount.value="";
        updateAmount();
        updatelocalstorage();
    }
}
form.addEventListener("submit",addTrans);

window.addEventListener("load",function(){
    config();
})


function updatelocalstorage(){
    localStorage.setItem("trans",JSON.stringify(transactions));
}

function uniqueid(){
    return Math.floor(Math.random()*1000000)
}