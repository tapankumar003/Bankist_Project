'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////

const displayMovements = function(movements){

  containerMovements.innerHTML = ""
  movements.forEach(function(mov,i){
    // Ternary operator
    const type = mov>0 ? 'deposit' : 'withdrawal'
  
    const html = `
    <div class="movements">
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
      <div class="movements__value">${mov}€</div>
    </div>`
    containerMovements.insertAdjacentHTML('afterbegin',html)
  })
  
}

displayMovements(account1.movements)


const createUsernames = function(accs){

  accs.forEach(function(acc){
    // console.log(acc)
    acc.username = acc.owner
  .toLowerCase()
  .split(" ")
  .map(name => name[0])
  .join("")
  })
  
}

createUsernames(accounts) //prerna gupta -> ['prerna','gupta'] -> ['p','g'] -> 'pg'

const calcDissplayBalance = function(movements){
  let balance = movements.reduce((acc,mov)=> acc+mov, 0);
  labelBalance.textContent = `${balance}€`
}
// calcDissplayBalance(account1.movements)


btnTransfer.addEventListener("click",(e)=>{
  e.preventDefault();
  const amount = Number(inputTransferAmount.value)
  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value)
  // console.log(amount, receiverAcc)
  var balance = 0
  for(let i=0; i<receiverAcc.movements.length;i++){
    balance+=receiverAcc.movements[i]
  }

  if(amount>0 && balance>=amount && receiverAcc !== currentAccount.username && receiverAcc){
    console.log("Transfer valid")
  }


})

// Event Handlers
let currentAccount;
btnLogin.addEventListener("click",(event)=>{
  event.preventDefault()
  // console.log("LOGIN!!")
  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value)
  // console.log(currentAccount)
  if(currentAccount && currentAccount.pin === Number(inputLoginPin.value)){

    // Display the UI
    containerApp.style.opacity = 100

    // Display the message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(" ")[0]}` //Jonas Schmedtmann -> [Jonas Schmedtmann] -> Jonas

    //Display Balance
    calcDissplayBalance(currentAccount.movements)
  }
})



// console.log(account1.username)
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);


// ARRAY METHODS
/*

console.log(movements[2],movements[0])
movements[2] = -450
console.log(movements)
console.log(movements.pop()) // remove the last element of the array
console.log(movements)
movements.push(23) //adds an element to the end of the array
console.log(movements)
console.log(movements.includes(200)) // Booleans -> True or False
console.log(movements.includes(20))
//slice - returns a new array
let arr = ['a','b','c','d','e','f']
console.log(arr.slice(2))
console.log(arr)
console.log(arr.slice(2,4))
console.log(arr.slice(-3))
// splice - changes the existing array
console.log(arr.splice(1,2))
console.log(arr)
console.log(arr.reverse())
// JOIN
console.log(arr.join("&&"))

// Objects
const prerna = {
  firstName: "Prerna", 
  LastName: "Gupta",
  birthYear: 1999,
  job: "Teacher",
  hasDriverLicense: true,
  //Object Methods
  calcAge: function(){
    console.log(this)
    return 2022 - this.birthYear
  }
}
const nameKey = 'Name'
console.log(prerna['first'+ nameKey])
//  console.log(prerna.first+ nameKey)
console.log(prerna.calcAge())

//FOR OF

for(let m of movements){
  if(m>0){
    console.log(`Deposit of amount ${m}`)
  }else{
    console.log(`Withdrawal of amount ${m}`)
  }
}

// FOR EACH 
movements.forEach(function(m, i){
  if(m>0){
    console.log(`User number ${i+1} :Deposit of amount ${m} `)
  }else{
    console.log(`User number ${i+1} : Withdrawal of amount ${m}`)
  }

})
// Maps
const euroToUSD = 1.1
const movementsUSD = movements.map((mov)=>mov*euroToUSD)
console.log(movementsUSD)

//Maps
const movementsDescription = movements.map((current_element, index)=>{
  if(current_element>0){
    return `Movement ${index} : You deposited ${current_element}`
  }
  else{
    return `Movement ${index} : You withdrew ${current_element}`
  }
})
console.log(movementsDescription)

// FIND Method
function checkFirstNegative(num){
  return num<0
}

console.log(movements.find(checkFirstNegative))
// REDUCE

const balance = movements.reduce(function(acc, curr, i, arr){
  return acc+curr
},0)
*/




// for(let i=0; i< movements.length;i++){
//   console.log(movements[i])
// }


/////////////////////////////////////////////////

// document.querySelector(".remove").addEventListener("click",(event)=>{
//   console.log(event)


// })


const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];



