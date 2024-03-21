function ExtractDurations(part: string): { [key: string]: number } {
    let currentUnit = ''; // curr time being processed (H, M, etc)
    let currentValue = ''; // value of curr time unit
    const components: { [key: string]: number } = {};

    for (let i = 0; i < part.length; i++) {
        const char = part[i];

        if (!isNaN(Number(char)) || char === '.' || char === '-') { // checks if the character is a digit, decimal, or minus
            currentValue += char; // add if so
        } else {
            if (currentValue !== '') {  // if not, make obj entry n parse
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

function ConvertPartToSeconds(part: { [key: string]: number }, multipliers: { [key: string]: number }): number {
   
    let totalSeconds = 0; 
    
    for (const key in part) {
        let value = part[key];
        let multiplier = multipliers[key];
        totalSeconds = totalSeconds+(value*multiplier);
    }

    return totalSeconds;
}

export function ConvertGivenDuration(inputString:string):number
{
    // console.log(inputString)

    let totalSeconds = 0;
    let partP = inputString.substring(0, inputString.indexOf('T'));
    let partT = inputString.substring(inputString.indexOf('T'));
    
    let multiplierP = {
        Y: 31536000, 
        W: 604800,  
        D: 86400    
    };

    let multiplierT = {
        H: 3600, 
        M: 60,  
        S: 1     
    };


    let months;


    if(partP.indexOf("M") !== -1 && months !== 0){
        throw new Error("Month value is not supported")
    }

    let componentsT = ExtractDurations(partT);
    let componentsP = ExtractDurations(partP);
    
    if (Object.keys(componentsT).length === 0 && Object.keys(componentsP).length === 0) {
        console.log("Both duration components are empty");
    } else {    
        if (Object.keys(componentsT).length !== 0) {
            const secondsT = ConvertPartToSeconds(componentsT, multiplierT);
            totalSeconds += secondsT;
        }
        if (Object.keys(componentsP).length !== 0) {
            const secondsP = ConvertPartToSeconds(componentsP, multiplierP);
            totalSeconds += secondsP;
        }
    
    } 

    return totalSeconds;
}


// console.log(ConvertGivenDuration("PT1H1M1.2S"))

