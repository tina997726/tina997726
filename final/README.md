期末專題主題:Hangman
簡介:
hangman應該算是大家小時候都玩過的遊戲，不過因為我覺得單只有猜英文有點無聊，所以改成了關於節慶/行星/星座主題的版本
然後加了提示，因為其中星座大部分都是拉丁文所以給大家提示比較好猜
玩法:
點了【遊戲開始】的button後會進入遊戲主頁面，在遊戲主頁面中會看到一個含有26英單的簡易鍵盤跟一個紫色的框框，裏頭會顯示這次要猜的單字有多少字母
開始猜單字的時候點螢幕上的單字鍵盤就可以了，如果對了的話，會顯示該字母，且鍵盤上該字母按鍵的背景顏色會變綠色
;如果猜錯了，不會顯示該字母，但該字母鍵盤的背景顏色會變成灰色，然後hangman的圖會顯示一畫，如果累計猜錯了5次，提示按鈕會出現
最後猜對會顯示【恭喜】;猜錯會顯示【多背書好嗎】
運用:
我覺得的這次作業，我的css跟html都運用的蠻基本的，都是上課有教到的
只是我css用很多就是了(調配色調很久XD)
然後有放了我很喜歡的圖當背景
不過js跟java的部分的確花了很多時間，所以會著重這部分介紹
1.宣告word = ["Word name", "Hint"]並把資料庫的單字跟提示都打上去
2.設置鍵盤var tastatur = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
3.宣告會用到的變數
var select = 0
var wordLeft = []
var fail = 0
4.確定onload再執行
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
5.設定function 分別是【startgame】【newgame】【clearTastatur】跟【clearPlayer】
(詳細code請直接開檔案)
不過關於【clearPlayer】用了不錯的方式(如下舉例)
    gId("g0").setAttribute("data", "false")
6.設定隨機抓單字，然後顯示相對應的底線數在紫色框框裡
function 【createWord】
7.設定鍵盤
function 【createTastur】
8.game check!
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
8.設定鍵盤猜單字對跟錯之後的結果
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
9.Show next fail drawing
function 【showNextFail】
10.game result
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
11.about hint!
【hint】
function hint() {
    gId("hintText").innerText = word[select][1]
    gId("hint").style.display = "block"
}

【Exit hint】
function hintExit() {
    gId("hint").style.display = "none"
}
辛苦助教了~~
-------------------------------------END---------------------------------------------
