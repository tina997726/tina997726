// word = ["Word name", "Hint"]
var word = [
    ["Hangman", "此時此刻"],
    ["ME", "me"],
    ["Valentine", "2/14"],
    ["Christmas", "12/25"],
    ["Hermes", "水星"],
    ["Venus", "金星"],
    ["Earth", "地球"],
    ["Mars", "火星"],
    ["Jupiter", " 木星"],
    ["Saturn", "土星"],
    ["Uranus", "天王星"],
    ["Neptune", "海王星"],
    ["Aries", "牡羊"],
    ["Taurus", "金牛"],
    ["Gemini", "雙子"],
    ["Cancer", "巨蟹"],
    ["Leo", "獅子"],
    ["Virgo", "處女"],
    ["Libra", "天秤"],
    ["Scorpio", "天蠍"],
    ["Sagittarius", "射手"],
    ["Capricorn", "摩羯"],
    ["Aquarius", "水瓶"],
    ["Pisces", "雙魚"]
]

// 鍵盤
var tastatur = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

//記憶
var select = 0
var wordLeft = []
var fail = 0

//onload 
//.addEventListener當...就觸發...
//.onload 當網頁開好就...
window.onload = function() {
    gId("moveKeybord").addEventListener('touchmove', function(e) {
        wH = window.innerHeight
        tY = e.touches[0].clientY
        eL = gId("tastatur")
        resY = wH - tY - eL.offsetHeight
        if (resY < 0) {
            resY = 0
        } else if (resY > wH / 2) {
            resY = wH / 2
        }
        eL.style.bottom = resY + "px"   
    }, false)
    createTastur()
}

// Start .className=class
function startGame() {
    gId("home").className = "h"
    gId("result").className = "h"
    newGame()
}

// New
function newGame() {
    clearTastatur()
    clearPlayer()
    createWord()
}

// Clear
function clearTastatur() {
    var e = document.getElementsByClassName("b")
    for (a = 0; a < e.length; a++) {
        e[a].setAttribute("data", "")
    }
}

// Clear player
// setAttribute(“class”, value)中class是指改變”class”這個屬性，所以要帶引號。
function clearPlayer() {
    fail = 0
    wordLeft = []
    gId("g0").setAttribute("data", "false")
    gId("g1").setAttribute("data", "false")
    gId("g2").setAttribute("data", "false")
    gId("g3").setAttribute("data", "false")
    gId("g4").setAttribute("data", "false")
    gId("g5").setAttribute("data", "false")
    gId("g5").setAttribute("r", "false")
    gId("g5").setAttribute("l", "false")
    gId("g6").setAttribute("data", "false")
    gId("g6").setAttribute("l", "false")
    gId("g6").setAttribute("r", "false")
    gId("hintButton").setAttribute("data", "false")
    gId("hint").style.display = "none"
}

// new word
function createWord() {
    var d = gId("letter")
    d.innerHTML = ""
    select = Math.floor(Math.random() * word.length)
    for (a = 0; a < word[select][0].length; a++) {
        var x = word[select][0][a].toUpperCase()
        var b = document.createElement("span")
        b.className = "l" + (x == " " ? " ls" : "")
        b.innerHTML = "&nbsp"
        b.id = "l" + a;
        d.appendChild(b)

        if (x != " ") {
            if (wordLeft.indexOf(x) == -1) {
                wordLeft.push(x)
            }
        }
    }
}

// Create keyboard
function createTastur() {
    var tas = gId("keybord")
    tas.innerHTML = ""
    for (a = 0; a < tastatur.length; a++) {
        var b = document.createElement("span")
        b.className = "b"
        b.innerText = tastatur[a]
        b.setAttribute("data", "")
        b.onclick = function() {
            bTas(this)
        }
        tas.appendChild(b)
    }
}

// Game check
function bTas(a) {
    if (a.getAttribute("data") == "") {
        var x = isExist(a.innerText)
        a.setAttribute("data", x)
        if (x) {
            if (wordLeft.length == 0) {
                gameEnd(true)
            }
        } else {
            showNextFail()
        }
    }
}

// If letter  exist
function isExist(e) {
    e = e.toUpperCase()
    var x = wordLeft.indexOf(e)
    if (x != -1) {
        wordLeft.splice(x, 1)
        typeWord(e)
        return true
    }
    return false
}

// Show next fail drawing
function showNextFail() {
    fail++
    switch (fail) {
        case 1:
            gId("g0").setAttribute("data", "true")
            break;

        case 2:
            gId("g1").setAttribute("data", "true")
            break;

        case 3:
            gId("g2").setAttribute("data", "true")
            break;

        case 4:
            gId("g3").setAttribute("data", "true")
            gId("hintButton").setAttribute("data", "true")
            break;

        case 5:
            gId("g4").setAttribute("data", "true")
            break;

        case 6:
            gId("g5").setAttribute("data", "true")
            break;

        case 7:
            gId("g5").setAttribute("l", "true")
            break;

        case 8:
            gId("g5").setAttribute("r", "true")
            break;

        case 9:
            gId("g6").setAttribute("data", "true")
            gId("g6").setAttribute("l", "true")
            break;

        case 10:
            gId("g6").setAttribute("r", "true")
            gameEnd(false)
            break;
    }
}

function typeWord(e) {
    for (a = 0; a < word[select][0].length; a++) {
        if (word[select][0][a].toUpperCase() == e) {
            gId("l" + a).innerText = e
        }
    }
}

// result
function gameEnd(e) {
    var d = gId("result")
    d.setAttribute("data", e)
    if (e) {
        gId("rT").innerText = "恭喜"
        gId("rM").innerHTML = "好厲害!"

    } else {
        gId("rT").innerText = "SORRY!"
        gId("rM").innerHTML = "The word was <br/><br/>\"" + word[select][0].toUpperCase() + "\"<br/><br/>多背書好嗎"
    }
    d.className = ""
}

// hint
function hint() {
    gId("hintText").innerText = word[select][1]
    gId("hint").style.display = "block"
}

// Exit hint
function hintExit() {
    gId("hint").style.display = "none"
}

// Get HTML ID element by name
function gId(a) {
    return document.getElementById(a)
}