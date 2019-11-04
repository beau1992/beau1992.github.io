'use strict';

/* *************************************
*  Weather Site JavaScript Functions
************************************* */

// $ = document.querySeLector();
// $$ = document.querySeLectorALL();

// Listen for the DOM to finish building
/*document.addEventListener("DOMContentLoaded", function(){
    /*buildModDate();
    const menuButton = document.querySelector("#menuBtn");
  menuButton.addEventListener('click',toggleMenu);*/
//variables for wind chill
let temp = 31;
let speed = 5;
buildWC(speed,temp);


console.log('My javascript is being read.');



//displays the menu button//

function toggleMenu(event){
    const navList = document.querySelector('#navList');
    navList.classList.toggle("mobileNav");
    document.getElementById("primaryNav").classList.toggle("hide");
  }



//Function for showing the date//

(function() {
    

    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

    Date.prototype.getMonthName = function() {
        return months[ this.getMonth() ];
    };
    Date.prototype.getDayName = function() {
        return days[ this.getDay() ];
    };
    

    
})();

var now = new Date();

var day = now.getDayName();
var month = now.getMonthName();
var date = now.getDate();
var year = now.getFullYear();

document.getElementById("todaysdate").innerHTML=day + ", " + date + " " + month + " " +
    year;


console.log(day + month + date + year);

//Last Modified//
document.addEventListener("DOMContentLoaded", function(){
    let lastMod = document.lastModified;
    document.getElementById("modDate").innerHTML = lastMod;
    // The Time Indictor function
let hour="7";
timeBall(hour);

//Changing the background
let currCond= "clear";
changeSummaryBackground(currCond);
});
    /*WebFont.load({
        google: {
          families: [
             'Montserrat'
          ]
        }
      });*/

       // Calculate the Windchill
function buildWC(speed, temp) {
    let feelTemp = document.getElementById('feelTemp');
   
    // Compute the windchill
    let wc = 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16);
    console.log(wc);
   
    // Round the answer down to integer
    wc = Math.floor(wc);
   
    // If chill is greater than temp, return the temp
    wc = (wc > temp)?temp:wc;
   
    // Display the windchill
    console.log(wc);
    // wc = 'Feels like '+wc+'°F';
    feelTemp.innerHTML = wc;
    }

    // Time Indicator Function
    function timeBall(hour){
    // Find all "ball" classes and remove them
    let x = document.querySelectorAll(".ball");
    for (let item of x) {
        console.log(item);
        item.classList.remove("ball");
    }
    
    // Find all hours that match the parameter and add the "ball" class
    let hr = document.querySelectorAll(".i"+hour);
    for (let item of hr){
        item.classList.add("ball");
    }
}

//Changing the background function
function changeSummaryBackground(currCond) {
    console.log(`Value of currCond: ${currCond}`);
  let condition = (currCond.toLowerCase()).trim(); // standardize input
  console.log(`Value of condition: ${condition}`);
  let conditionIndex = 0; // set condition index to 0
  console.log(`Value of conditionIndex: ${conditionIndex}`);
  // determine available width
  let width = window.innerWidth;
  console.log(`Screen Width: ${width}`);
   // check if screen is tablet or desktop widths and adjust starting point for condition index
   if (width > 475 && width <= 800) {
    conditionIndex += 5;
    console.log(`Updated value of conditionIndex: ${conditionIndex}`);
  /*else if (width > 800) {
    conditionIndex += 10*/
  }

  // store paths to specific width images
  const imgURLS = ["/clear400.jpg", "/clouds400.jpg", "/fog400.jpg", "/rain400.jpg", "/snow400.jpg",
                  "/clear600.jpg", "/clouds600.jpg", "/fog600.jpg", "/rain600.jpg", "/snow600.jpg", 
                   ];
  // rest of directory structure
  const imgDirPrefix = "url(/weather/images";
  const imgDirPostfix = ")"

  // update condition index based on weather status
  switch (condition) {
    case "clear":
      conditionIndex += 0;
      break;
    case "cloudy":
      conditionIndex += 1;
      break;
    case "fog":
      conditionIndex += 2;
      break;
    case "rain":
      conditionIndex += 3;
      break;
    case "snow":
      conditionIndex += 4;
      break;
    default:
      console.log("Error: Weather type is invalid.")
      break;
  }
  console.log(`Value of conditionIndex: ${conditionIndex}`);
  
  // build image url() CSS variable
  let imageURL = imgDirPrefix + imgURLS[conditionIndex] + imgDirPostfix;
  console.log(`imageURL is: ${imageURL}`);

  // set background image
  const backgroundImg = document.body.style; // used to access css
  // console.log(`backgroundImg: ${backgroundImg}`);
  backgroundImg.setProperty("--dynamic-weather-background", `${imageURL}`); 
  console.log(`${imageURL} has been set as the background.`);
}

