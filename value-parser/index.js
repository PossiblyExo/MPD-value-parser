"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConvertGivenDuration = void 0;
function ExtractDurations(part) {
    var currentUnit = ''; // curr time being processed (H, M, etc)
    var currentValue = ''; // value of curr time unit
    var components = {};
    for (var i = 0; i < part.length; i++) {
        var char = part[i];
        if (!isNaN(Number(char)) || char === '.' || char === '-') { // checks if the character is a digit, decimal, or minus
            currentValue += char; // add if so
        }
        else {
            if (currentValue !== '') { // if not, make obj entry n parse
                components[part[i]] = parseFloat(currentValue);
                currentValue = '';
            }
            currentUnit = char;
        }
    }
    // if currentValue is not empty after the loop, it contains the value of the last time unit. thus, parse
    if (currentValue !== '') {
        components[part[part.length - 1]] = parseFloat(currentValue);
    }
    return components;
}
function ConvertPartToSeconds(part, multipliers) {
    var totalSeconds = 0;
    for (var key in part) {
        var value = part[key];
        var multiplier = multipliers[key];
        totalSeconds = totalSeconds + (value * multiplier);
    }
    return totalSeconds;
}
function ConvertGivenDuration(inputString) {
    // console.log(inputString)
    var totalSeconds = 0;
    var partP = inputString.substring(0, inputString.indexOf('T'));
    var partT = inputString.substring(inputString.indexOf('T'));
    var multiplierP = {
        Y: 31536000,
        W: 604800,
        D: 86400
    };
    var multiplierT = {
        H: 3600,
        M: 60,
        S: 1
    };
    var months;
    if (partP.indexOf("M") !== -1 && months !== 0) {
        throw new Error("Month value is not supported");
    }
    var componentsT = ExtractDurations(partT);
    var componentsP = ExtractDurations(partP);
    if (Object.keys(componentsT).length === 0 && Object.keys(componentsP).length === 0) {
        console.log("Both duration components are empty");
    }
    else {
        if (Object.keys(componentsT).length !== 0) {
            var secondsT = ConvertPartToSeconds(componentsT, multiplierT);
            totalSeconds += secondsT;
        }
        if (Object.keys(componentsP).length !== 0) {
            var secondsP = ConvertPartToSeconds(componentsP, multiplierP);
            totalSeconds += secondsP;
        }
    }
    return totalSeconds;
}
exports.ConvertGivenDuration = ConvertGivenDuration;
// console.log(ConvertGivenDuration("PT1H1M1.2S"))
