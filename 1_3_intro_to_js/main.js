console.log("hello")

const string = "string";
const number = 0;
const someBoolean = true; 
const array = [ "one", "two", "three" ];
const obj = {
  key: 'value',
  name: 'Burger joints',
  city: "New York City",
  zip: 11236
  };

const data = [
  { key: "value" },
  { key: "value" },
];



let changeableGlobal = true;
const constantGlobal = true;
var something = true;

changeableGlobal = false;
var something = false;

function changeEmUp() {
 
  changeableGlobal = false;
  
}
changeEmUp();


const testOne = array.map(d => {
  
  return `${d} thing`
})
const testTwo = array.forEach(d => {
  
  return d
})



const label = document.getElementById("name-label");
const input = document.getElementById("name-input")
const button = document.getElementById("name-submit")
console.log(label)
console.log(input)
console.log(button)

let userName = 0;

function updateName() {
  console.log("clicked")
  console.log(input.value);

  userName = userName + 1;
  
  console.log(userName)
  



  // ternarie
  const stringToSay = userName === "Savys Bar and Bristro" 
    ? `Welcome to a burger spot in New York`
    : `welcome to a burger spot outside of New York`

  window.alert(userName)
  window.alert(stringToSay)

  label.innerHTML = "The Burger Joint you entered is" + userName + ". You can change it here if you would like to as well: "

}