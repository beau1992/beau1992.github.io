'use strict';

/* *************************************
*  Weather Site JavaScript Functions
************************************* */

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
  }

/*function toggleMenu() {

    document.getElementById("primaryNav").classList.toggle("hide");
}*/

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