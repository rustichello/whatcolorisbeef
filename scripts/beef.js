import {words} from "./words.js";

let regex = /^[a-f]+$/i; //norm
let regexLeet = /^[abcdefgiostz]+$/i; //leet
let regexH = /^h{1}[abcdefgiostz]+$/i; //leet starting with h
let regexNoNum = /^#[a-f]+$/i;//no numbers

function leet (arr) {
   return arr.map(i => i.replaceAll('h','#').replaceAll('i','1').replaceAll('o','0').replaceAll('g','9').replaceAll('s','5').replaceAll('t','7').replaceAll('z','2'));
};
function addHashtag (arr) {
    return arr.map(i => '#' + i);
};
function addZeros (arr) {
    return arr.map(x => {
        let o = '0000000';
        let i = 7 - x.length;
        return x + o.slice(0,i);
    });
};
function getRandomColor(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}
function showShades (str) {
let numOfZeros = str.replace(/[^0-9]/g, '').length;
let arr1 = [];
let arr2 = [];
let arr3 = [];
str = str.replace(/[0-9]/g, '') + 0;
if (numOfZeros === 1) {
    for (let i = 0; i < 10; i++) {
        str = str.replace(/[0-9]$/, i);
        arr1.push(str);
    }
    arr1 = arr1.filter(w => !w.includes('0'));
    return arr1;
} 
else if (numOfZeros === 2) {
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
    arr2 = arr2.filter(w => !w.includes('00'));
    return arr2;
}
else {
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
    arr3 = arr3.filter(w => !w.includes('000'));
    return arr3;
}
};
function showSubtitle (str) {
let ttl = document.createElement('h2');
ttl.innerHTML = str;
shd.appendChild(ttl);
};
function unLeet (str) {
return str.replaceAll('1','i').replaceAll('0','o').replaceAll('9','g').replaceAll('5','s').replaceAll('7','t').replaceAll('2','z').replaceAll('#','');
};


let dic = words.filter(w => w.length > 2 && w.length < 7 && regex.test(w));
dic = addHashtag(dic);
let dic1 = dic.filter(w => w.length === 4);
dic = addZeros(dic);

let allColors = dic.concat(dic1);

let leetColors = words.filter(w => w.length === 6 && regexLeet.test(w));
leetColors = leet(leetColors);
leetColors = leetColors.filter(w => /[0-9]/.test(w));
leetColors = addHashtag(leetColors);

let leetColorsStartingH = words.filter(w => w.length === 7 && regexH.test(w));//Leet starting H
leetColorsStartingH = leet(leetColorsStartingH);
//leet shorthands
let dic2 = words.filter(w => w.length === 3 && regexLeet.test(w));//leet short
dic2 = leet(dic2);
dic2 = addHashtag(dic2);
dic2 = dic2.filter(w => /[0-9]/.test(w));
//leet short starting h
let dic3 = words.filter(w => w.length === 4 && regexH.test(w));
dic3 = leet(dic3);

let leetColorsWShort = leetColors.concat(dic2);
let leetColorsStartingHWShort = leetColorsStartingH.concat(dic3);
let colors = allColors.filter(w => w.length === 7);
let colorsShorthands = allColors;
let colorsLettersOnly = allColors.filter(w => regexNoNum.test(w) && w.length === 7);
let colorsLettersAndShorthands = allColors.filter(w => regexNoNum.test(w));

let box = document.querySelector(".demo");

            let btn = document.getElementById('btn');
            let clr = document.querySelector(".clr");
            let shd = document.querySelector(".shd");

            let radNorm = document.getElementById('rad-norm');//radio norm
            let radLeet = document.getElementById('rad-leet');//radio leet

            let chk = document.getElementById('norm-letters-only');//letters-only checkbox
            let chk1 = document.getElementById('norm-short');//shorthands checkbox
            let chk2 = document.getElementById('leet-h');//# as h checkbox
            
            document.getElementById('leet-h').disabled = true;//initial state
            document.getElementById("leet-h-label").style.color = "gray";//initial state

            radNorm.onclick = function() {
                if (this.checked) {
                    chk2.checked = false;
                    chk2.disabled = true;
                    document.getElementById("leet-h-label").style.color = "gray";
                    chk.disabled = false;
                    document.getElementById("letters-only-label").style.color = "black";
                }
            };
            radLeet.onclick = function() {
                if (this.checked) {
                    chk2.disabled = false;
                    document.getElementById("leet-h-label").style.color = "black";
                    chk.checked = false;
                    chk.disabled = true;
                    document.getElementById("letters-only-label").style.color = "gray";
                }
            };

            btn.addEventListener('click', ()=>{
                function changeColor (arr) {
                    i = getRandomColor(0, arr.length);
                    box.style.background = arr[i];
                    clr.innerHTML = arr[i];
                    if (radNorm.checked === true && arr[i].includes('0')) {
                        shd.innerHTML = "";
                        let allShades = showShades(arr[i]);
                        showSubtitle(allShades.length + " shades of " + arr[i] + ":" + "<br />");
                        let shades = document.createElement('div');
                        shades.className = 'shades';
                        shd.appendChild(shades);

                        function createDiv() {
                            let newDiv = document.createElement("div");
                            newDiv.className = "block";
                            return newDiv;
                        };
                            
                        let myDivs = [];
                        for (i = 0; i < allShades.length; i++) {
                            myDivs.push(createDiv());
                            shades.appendChild(myDivs[i]);
                            myDivs[i].innerHTML = allShades[i];
                            myDivs[i].style.background = allShades[i]; 
                        }
                    }
                    else if (radLeet.checked === true && chk2.checked === false) {
                        shd.innerHTML = "";
                        let decode = unLeet(arr[i]);
                        showSubtitle("Meaning: " + decode + "<br />" + "<br />");
                    }
                    else if (radLeet.checked === true && chk2.checked === true) {
                        shd.innerHTML = "";
                        let decode = unLeet(arr[i]);
                        showSubtitle("Meaning: " + "h" + decode + "<br />" + "<br />");
                    }
                    else {
                        shd.innerHTML = "";
                    }
                };
                    if (radNorm.checked === true && chk.checked === false && chk1.checked === true) {
                        changeColor(colorsShorthands);
                    }
                    else if (radNorm.checked === true && chk.checked === true && chk1.checked === false) {
                        changeColor(colorsLettersOnly);
                    }
                    else if (radNorm.checked === true && chk.checked === true && chk1.checked === true) {
                        changeColor(colorsLettersAndShorthands);
                    }
                    else if (radLeet.checked === true && chk1.checked === false && chk2.checked === false) {
                        changeColor(leetColors);
                    }
                    else if (radLeet.checked === true && chk1.checked === false && chk2.checked === true) {
                        changeColor(leetColorsStartingH);
                    }
                    else if (radLeet.checked === true && chk1.checked === true && chk2.checked === true) {
                        changeColor(leetColorsStartingHWShort);
                    }
                    else if (radLeet.checked === true && chk1.checked === true && chk2.checked === false) {
                        changeColor(leetColorsWShort);
                    }
                    else {
                        changeColor(colors);
                    }
            });
