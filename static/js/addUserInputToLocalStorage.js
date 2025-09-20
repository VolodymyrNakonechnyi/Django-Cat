"use strict"
const arrFromLocaleStorage = JSON.parse(localStorage.getItem("userInput"));

function fillUserInput() {
    if(arrFromLocaleStorage !== null) {
        allUserInput.forEach((element, indx) => {
            element.value = arrFromLocaleStorage[indx];
        });
    }
}
function isLocalStorageAvailable() {
    try {
        let x = '__storage_test__';
        localStorage.setItem(x, x);
        localStorage.removeItem(x);
        return true;
    }
    catch(e) {
        return false;
    }
}

if (isLocalStorageAvailable()) {
    fillUserInput();
} else {
    console.log("local storage isn`t avaliable");
}

