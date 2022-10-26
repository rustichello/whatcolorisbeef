const words = require('an-array-of-english-words')
let regex = /^[a-f]+$/i; //
let regexLeet = /^[abcdefgiostz]+$/i; //leet
let regexH = /^h{1}[abcdefgiostz]+$/i; //leet starting with h
let regexNoNum = /^#[a-f]+$/i;

function leet (arr) {
   return arr.map(i => i.replaceAll('i','1').replaceAll('o','0').replaceAll('g','9').replaceAll('s','5').replaceAll('t','7').replaceAll('z','2'));
};
function addHashtag (arr) {
    return arr.map(i => '#' + i);
};
function addZeros (arr) {
    return arr.map(x => {
        if (x.length === 4) {
            return x + "000";
        }
        if (x.length === 5) {
            return x + "00";
        }
        if (x.length === 6) {
            return x + "0";
        }
        else {
            return x;
        }
    }
    );
};
function showShades (str) {
    let numOfZeros = str.replace(/[^0-9]/g, '').length;
    let arr1 = [];
    let arr2 = [];
    let arr3 = [];
    str = str.replace(/[0-9]/g, '') + 0;
        for (let i = 0; i < 10; i++) {
            str = str.replace(/[0-9]$/, i);
            arr1.push(str);
        }
        for (let str of arr1) {
            str = str + 0;
            for (let i = 0; i < 10; i++) {
                str = str.replace(/[0-9]$/, i);
                arr2.push(str);
            }
        }
        for (let str of arr2) {
            str = str + 0;
            for (let i = 0; i < 10; i++) {
                str = str.replace(/[0-9]$/, i);
                arr3.push(str);
            }
        }
        if (numOfZeros === 1) {
            arr1 = arr1.filter(w => !w.includes('0'));
            return arr1;
        } 
        else if (numOfZeros === 2) {
            arr2 = arr2.filter(w => !w.includes('00'));
            return arr2;
        }
        else {
            arr3 = arr3.filter(w => !w.includes('000'));
            return arr3;
        }
};

let dic = words.filter(w => w.length > 2 && w.length < 7 && regex.test(w));
dic = addHashtag(dic);

let dic1 = dic.filter(w => w.length === 4);
dic = addZeros(dic);

let allColors = dic.concat(dic1);
let colors = allColors.filter(w => w.length === 7);
let colorsShorthands = allColors;
let colorsLettersOnly = allColors.filter(w => regexNoNum.test(w) && w.length === 7);
let colorsLettersAndShorthands = allColors.filter(w => regexNoNum.test(w));
/* 
//Leet color codes
let colorsLeet = words.filter(w => w.length === 6 && regexPlus.test(w));
colorsLeet = leet(colorsLeet);
colorsLeet = addHashtag(colorsLeet);

//Leet color codes starting with h = #
let colorsH = words.filter(w => w.length === 7 && regexH.test(w));
colorsH = leet(colorsH);
colorsH = addHashtag(colorsH);
*/
            
let btn = document.getElementById('btn');
let clr = document.querySelector(".clr");
let shd = document.querySelector(".shd");
            
let chk = false;
document.getElementById('shorthand-plain').onclick = function() {
    if (this.checked) {
        chk = true;
    }
    else {
        chk = false;
    }
};
            
let chk1 = false;
document.getElementById('nonumbers-plain').onclick = function() {
    if (this.checked) {
        chk1 = true;
    }
    else {
        chk1 = false;
    }
};
            
btn.addEventListener('click', ()=>{
    let box = document.querySelector(".demo");
    function getRandomColor(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
    }
 
    function changeColor (arr) {
        i = getRandomColor(0, arr.length);
        box.style.background = arr[i];
        clr.innerHTML = arr[i];
                    
        if (arr[i].includes('0')) {
            shd.innerHTML = "";
            let allShades = showShades(arr[i]);
            let ttl = document.createElement('h2');
            ttl.innerHTML = allShades.length + " shades of " + arr[i] + ":" + "<br />";
            shd.appendChild(ttl);

            let shades = document.createElement('div');
            shades.className = 'shades';
            shd.appendChild(shades);

            function createDiv() {
                let iDiv = document.createElement("div");
                iDiv.className = "block";
                return iDiv;
            }
                            
            let myDivs = [];
            for (i = 0; i < allShades.length; i++) {
                myDivs.push(createDiv());
                shades.appendChild(myDivs[i]);
                myDivs[i].innerHTML = allShades[i];
                myDivs[i].style.background = allShades[i]; 
            }
        }
        else {
            shd.innerHTML = "";
        }
    };

    if (chk === true && chk1 === false) {
        changeColor(colorsShorthands);
    }
    else if (chk === false && chk1 === true) {
        changeColor(colorsLettersOnly);
    }
    else if (chk === true && chk1 === true) {
        changeColor(colorsLettersAndShorthands);
    }
    else {
        changeColor(colors);
    };
});