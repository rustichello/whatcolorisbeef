const words = require('an-array-of-english-words');

let regex = /^[a-f]+$/i; //norm
let regexLeet = /^[abcdefgiostz]+$/i; //leet
let regexH = /^h{1}[abcdefgiostz]+$/i; //leet starting with h
let regexNoNum = /^#[a-f]+$/i;//no numbers

function addZeros (arr) {
    return arr.map(x => {
        let o = '0000000';
        let i = 7 - x.length;
        return x + o.slice(0,i);
    });
};
function addHashtag (arr) {
    return arr.map(i => '#' + i);
};
function leet (arr) {
   return arr.map(i => i.replaceAll('h','#').replaceAll('i','1').replaceAll('o','0').replaceAll('g','9').replaceAll('s','5').replaceAll('t','7').replaceAll('z','2'));
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

export {allColors, leetColorsWShort, leetColorsStartingHWShort};