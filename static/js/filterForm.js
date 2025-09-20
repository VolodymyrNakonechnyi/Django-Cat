"use strict"

const theme = document.getElementById("theme-search");
const userLogin = document.getElementById("user-search");
const catBreed = document.getElementById("breed-search");
const dateFrom = document.getElementById("date-from-search");
const dateTo = document.getElementById("date-to-search");
const searchButton = document.getElementById("search-button");
const clearButton = document.getElementById("clear-input-button");
const allUserInput = document.querySelectorAll("input");
const userConfirm = document.getElementById("user-confirm");

if (userConfirm.checked) {
    searchButton.style.backgroundColor = "rgb(22, 160, 131)";
} else {
    searchButton.style.backgroundColor = "rgb(22, 160, 131, 0.2)";
}

userConfirm.addEventListener ("click", () => {
    if (userConfirm.checked) {
        searchButton.style.backgroundColor = "rgb(22, 160, 131)";
    } else {
        searchButton.style.backgroundColor = "rgb(22, 160, 131, 0.2)";
    }
});


clearButton.addEventListener ("click", () => {
    if(isLocalStorageAvailable()) { 
        localStorage.removeItem("userInput");
    }

    document.querySelectorAll("input").forEach( element => {
        element.value = "";
    });
});

searchButton.addEventListener ("click", () => {
    if(!userConfirm.checked) {
        return;
    }

    const subForum = document.querySelectorAll(".subforum");
    let userInputList = [];

    allUserInput.forEach(element => {
        userInputList.push(element.value);
    });

    if(isLocalStorageAvailable()) {
        localStorage.setItem("userInput", JSON.stringify(userInputList));
    }

    subForum.forEach(element => {
        element.style.display = "block";
    });

    subForum.forEach(element => {
        displayFilterData(element.children[0].innerText.trim(), element, theme.value);
        displayFilterData(element.children[1].children[3].children[0].innerText.trim(), element, userLogin.value);
        displayFilterData(element.children[1].children[3].children[2].innerText.trim(), element, catBreed.value);
        displayDateBetween(dateFrom.value, dateTo.value, element.children[1].children[3].children[3].innerText.trim(), element);
    });
});

function displayFilterData (data, element, filter) {
    if(filter === "") {
        return;
    }

    if(data != filter) {
        element.style.display = "none";
    } 
}

function displayDateBetween (time1, time2, questionDate, element) {
    if(time1 === "" && time2 === "") {
        return;
    }

    let dateTo = new Date(time2);
    let dateFrom = new Date(time1);
    let postDate = new Date(questionDate);

    if(postDate.getTime() > dateTo.getTime() && dateTo.getTime != NaN) {
        element.style.display = "none";
    }

    if(postDate.getTime() < dateFrom.getTime() && dateFrom.getTime != NaN) {
        element.style.display = "none";
    }
}





