export const formatCurrency = (num) => {
    var numStr = '';
    
    // Verify if input is string or number and format accordingly
    if(isNaN(num)){
        var number = parseInt(num);
        if(!isNaN(number)){
            numStr = `${number}`;
        }
    }
    else {
        numStr = `${num}`;
    }

    const integer = numStr.substring(0, numStr.length - 2);
    const fraction = numStr.substring(numStr.length - 2, numStr.length);

    const integerStr = fillLeftZeroes(
        integer.toLocaleString('pt', {minimumFractionDigits: 0}), 2);
    const fractionStr = fillLeftZeroes(fraction, 2);

    return `R$ ${integerStr},${fractionStr}`;
}

export const fillLeftZeroes = (num, length) => {
	let diff = length - num.length;
	let numStr = '';

	while(0 < diff--) {
		numStr += '0';
	}
	return numStr + num;
}

// Parses string into a number if it represents an integer
export const parseIntString = (text) => {
    let parsed = parseInt(text);
    if(!isNaN(parsed) && isFinite(parsed)){
        return parsed;
    }

    return '';
}