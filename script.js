// when the dom is loaded it will check if it's width is less than 620px then call support.html
window.addEventListener("DOMContentLoaded", function (e) {
    if (window.innerWidth < 620) {
        location.href = "support.html";
    }
});

// cursor blinking code
let cursor = true;
let speed = 300;
setInterval(() => {
    if (cursor) {
        document.getElementById('cursor').style.opacity = 0;
        cursor = false;
    } else {
        document.getElementById('cursor').style.opacity = 1;
        cursor = true;
    }
}, speed);

// handles the click 
const evaluateClick = (e) => {
    let btnclicked = e.target.classList[0]
    if (btnclicked != "board" && btnclicked != "rows") {
        let btnText = e.target.innerText
        action(btnText)
    }
}

// use as backspace
function backspace() {
    let textBoard = document.getElementsByClassName("text")[0]
    textBoard.innerText = textBoard.innerText.slice(0, textBoard.innerText.length - 1)
}

// use to add space
function spacebar(isTab) {
    let textBoard = document.getElementsByClassName("text")[0]
    isTab ? textBoard.innerHTML += "&nbsp;&nbsp;&nbsp;" : textBoard.innerHTML += "&nbsp;";
}

// handles the enter button
function enter() {
    let textBoard = document.getElementsByClassName("text")[0]
    textBoard.innerHTML += "<br>"
}

let changesht = ["~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "{", "}", "|",
    "A", "S", "D", "F", "G", "H", "J", "K", "L", ":", '"', "Z", "X", "C", "V", "B", "N", "M", "<", ">", "?"]

let originalsht = ["`", 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "-", "=", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", '"\"', "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/"]

// handling the shift if turn on or off
function shift() {
    let shiftbtn = document.getElementById("shifter")
    if (shiftbtn.classList.contains("noshift")) {
        shifton(changesht)
    } else {
        shifton(originalsht)
    }
}

// turns on or off the shift
function shifton(change) {
    let shiftbtn = document.getElementById("shifter")
    shiftbtn.classList.toggle("noshift")
    let btnchng = document.querySelectorAll(".cng")
    Array.from(btnchng).forEach((value, index) => {
        value.innerText = change[index]
    })
}

// takes the action according to clicked keyboard button
const action = (btnText) => {
    switch (btnText) {
        case "␈": backspace()
            break
        case "space_bar": spacebar(false)
            break
        case "enter": enter()
            break
        case "tab": spacebar(true)
            break
        case "shift": shift()
            break
        case "caps": shift()
            break
        default:
            setText(btnText)
    }
}



// sets the text in the text field
const setText = (text) => {
    let textBoard = document.getElementsByClassName("text")[0]
    textBoard.innerText += text
}

// applying click listener when any button of keyboard is pressed the evaluate click function will work
let board = document.querySelector(".board")
board.addEventListener("click", evaluateClick)

// copies the text written in the text field into to the clipboard

const copy = (e) => {
    let textBoard = document.getElementsByClassName("text")[0].textContent
    async function copytoclip() {
        try {
            await navigator.clipboard.writeText(textBoard)
            // used to call the copied text toast
            const toastTrigger = document.getElementById('liveToastBtn')
            const toastLiveExample = document.getElementById('liveToast')
            if (toastTrigger) {
                const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
                toastTrigger.addEventListener('click', () => {
                    toastBootstrap.show()
                })
            }
        }
        catch (e) {
            console.error(e)
        }
    }
    copytoclip()
}
let copybtn = document.getElementsByClassName("clip")[0]
copybtn.addEventListener("click", copy)



