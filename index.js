const userInput = document.querySelector('.birth');
const checkBtn = document.querySelector('.check-btn');
const outputDiv = document.querySelector('#output');

checkBtn.addEventListener('click', realPalindrome)

function realPalindrome() {
    var bDate = userInput.value;

    if (bDate !== '') {
        var listofDate = bDate.split('-');

        var date = {
            day: Number(listofDate[2]),
            month: Number(listofDate[1]),
            year: Number(listofDate[0])
        };

        var isPalindrome = checkPalindrome(date);



        if (isPalindrome) {
            outputDiv.innerHTML = `Your birthday is a palindrome number🎉🎉🎉`;
        } else {
            var [count, nextDate] = getNextPalindromeDate(date);
            outputDiv.innerHTML = `It's not a palindrome date😔😔, the next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year} and you missed it by ${count} days!!!😒`;
        }

    }
}


function reverseStr(str) {
    var listOfChars = str.split('');
    var reverseChars = listOfChars.reverse();
    var reversedStr = reverseChars.join('');
    return reversedStr;
}

function isPalindrome(str) {
    var reverse = reverseStr(str);

    if (str === reverse) {
        return true;
    }
    return false;
}

function dateToString(date) {
    var dateStr = {
        day: '',
        month: '',
        year: ''
    };

    if (date.day < 10) {
        dateStr.day = '0' + date.day;
    } else {
        dateStr.day = date.day.toString();
    }

    if (date.month < 10) {
        dateStr.month = '0' + date.month;
    } else {
        dateStr.month = date.month.toString();
    }

    dateStr.year = date.year.toString();

    return dateStr;
}

function getDateFormats(date) {
    var dateStr = dateToString(date);

    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindrome(date) {
    var listOfPalindrome = getDateFormats(date);

    var flag = false;
    for (i = 0; i < listOfPalindrome.length; i++) {
        if (isPalindrome(listOfPalindrome[i])) {
            flag = true;
            break;
        }
    }
    return flag;
}

function isLeap(year) {
    if (year % 400 === 0) {
        return true;
    }
    if (year % 100 === 0) {
        return false;
    }
    if (year % 4 === 0) {
        return true;
    }
    return false;
}

function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 2) {
        if (isLeap(year)) {
            if (day > 29) {
                day = 1;
                month++;
            }
        } else {
            if (day > 28) {
                day = 1;
                month++;
            }
        }

    } else {
        if (day > daysInMonth[month - 1]) {
            day = 1;
            month++;
        }
    }
    if (month > 12) {
        month = 1;
        year++;
    }


    return {
        day: day,
        month: month,
        year: year
    };
}

function getNextPalindromeDate(date) {
    var count = 0;
    var nextDate = getNextDate(date);

    while (1) {
        count++;
        var isPalindrome = checkPalindrome(nextDate);
        if (isPalindrome) {
            break;
        }
        nextDate = getNextDate(nextDate);
    }
    return [count, nextDate];
}