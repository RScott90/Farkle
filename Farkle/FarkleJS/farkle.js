var player1 = {};
var player2 = {};
var player3 = {};
var player4 = {};
player1.turn = true;
player2.turn = false;
player1.score = 0;
player2.score = 0;
var roundScore = 0;
var rollScore = 0;
var tempScore = 0;
var tempRoundScore = 0;
var totalScore = 0;
var diceArray = [];


$(document).ready(function() {
    selectDice();
    for (i=0; i<6; i++) {
        diceArray[i] = {};
        diceArray[i].id = "#die" + (i+1);
        diceArray[i].value = i + 1;
        diceArray[i].state = 0;
    }
$("#rollDice").on("click", rollDice);
$("#bankPoints").on("click", bankScore);
});

function rollDice() {
    console.log("some text");
    roundScore = tempRoundScore;
    checkHotDice();
    tempScore = 0;
    for (let i=0; i<6; i++) {
        if (diceArray[i].state === 1) {
            diceArray[i].state = -1;
        }
        else if (diceArray[i].state === 0) {
        diceArray[i].value = Math.floor((Math.random() * 6) + 1);
        }
    }
    updateImage();
    $("img").css("pointer-events","all");
}

function checkHotDice() {
    let counter = 0;
    for (let i = 0; i < 6; i++) {
        if (diceArray[i].state === -1 || diceArray[i].state === 1) {
            counter++;
        }
    }
    if (counter === 6 && tempScore !== 0) {
        for (let i = 0; i < 6; i++) {
            diceArray[i].state = 0;
            $(diceArray[i].id).removeClass("faded");
        }
    }
}

function bankScore() {
    $("img").css("pointer-events","none");
    if (player1.turn === true) {
        if (tempScore === 0) {
            $("#player1-roll").text("0");
            $("#player1-round").text("Farkle!");
        }
        else {
            player1.score = player1.score + tempRoundScore;
            $("#player1-total").text(player1.score);
            $("#player1-roll").text("0");
            $("#player1-round").text("0");
        }
    }
    else {
        if (tempScore === 0) {
            $("#player2-roll").text("0");
            $("#player2-round").text("Farkle!");
        }
        else {
            player2.score = player2.score + tempRoundScore;
            $("#player2-total").text(player2.score);
            $("#player2-roll").text("0");
            $("#player2-round").text("0");
        }
    }
    for (let i = 0; i < 6; i++) {
        diceArray[i].state = 0;
        $(diceArray[i].id).removeClass("faded");
    }
    tempScore = 0;
    tempRoundScore = 0;
    checkWin();
    switchPlayers();

}

function switchPlayers() {
    if (player1.turn === true) {
        player1.turn = false;
        player2.turn = true;
        $("#player2-roll").text("0");
        $("#player2-round").text("0");
    }
    else {
        player1.turn = true;
        player2.turn = false;
        $("#player1-roll").text("0");
        $("#player1-round").text("0");
    }
}

function updateImage() {
    let dieImage;
    for (let i = 0; i < 6; i++) {
        switch (diceArray[i].value) {
            case 1: dieImage = "die1.png";
            break;
            case 2: dieImage = "die2.png";
            break;
            case 3: dieImage = "die3.png";
            break;
            case 4: dieImage = "die4.png";
            break;
            case 5: dieImage = "die5.png";
            break;
            case 6: dieImage = "die6.png";
            break;
        }
        $(diceArray[i].id).attr("src", dieImage);
    }
}

function selectDice() {
    $("img").on("click", saveDice)
}

function saveDice() {
    let i = $(this).data("number");
    console.log(i);
    if (diceArray[i].state === 0 || diceArray[i].state === 1) {
        $(this).toggleClass("faded");
        if (diceArray[i].state === 0) {
            diceArray[i].state = 1;
            
        }
        else if (diceArray[i].state=== 1){
            diceArray[i].state = 0
        }   
    }
    calcRollScore();
}

function calcRollScore() {
    tempScore = 0;
    tempRoundScore = 0;
    let ones = [];
    let twos = [];
    let threes = [];
    let fours = [];
    let fives = [];
    let sixes = [];
    let scoreArray =[];
    for (let i = 0; i < 6; i++) {
        if (diceArray[i].state === 1) {
            switch (diceArray[i].value) {
                case 1: ones.push(1);
                break;
                case 2: twos.push(2);
                break;
                case 3: threes.push(3);
                break;
                case 4: fours.push(4);
                break;
                case 5: fives.push(5);
                break;
                case 6: sixes.push(6);
                break;
            }
        }
    }
    let pairs = 0;
    let triplets = 0;
    let straight = 0;

    switch (ones.length) {
        case 1: scoreArray[0] = 100; 
            straight++;
        break;
        case 2: scoreArray[0] = 200; 
            pairs++;
        break;
        case 3: scoreArray[0] = 1000;
            triplets++;
        break;
        case 4: scoreArray[0] = 1500; break;
        case 5: scoreArray[0] = 2000; break;
        case 6: scoreArray[0] = 3000; break;
        default: scoreArray[0] = 0;
    }
    switch (twos.length) {
        case 1: scoreArray[1] = 0; 
            straight++;
        break;
        case 2: scoreArray[1] = 0;
            pairs++;
        break;
        case 3: scoreArray[1] = 200; 
            triplets++;
        break;
        case 4: scoreArray[1] = 1500; break;
        case 5: scoreArray[1] = 2000; break;
        case 6: scoreArray[1] = 3000; break;
        default: scoreArray[1] = 0;
    }
    switch (threes.length) {
        case 1: scoreArray[2] = 0; 
            straight++;
        break;
        case 2: scoreArray[2] = 0;
            pairs++;
        break;
        case 3: scoreArray[2] = 300; 
            triplets++;
        break;
        case 4: scoreArray[2] = 1500; break;
        case 5: scoreArray[2] = 2000; break;
        case 6: scoreArray[2] = 3000; break;
        default: scoreArray[2] = 0;
    }
    switch (fours.length) {
        case 1: scoreArray[3] = 0; 
            straight++;
        break;
        case 2: scoreArray[3] = 0;
            pairs++;
        break;
        case 3: scoreArray[3] = 400; 
            triplets++;
        break;
        case 4: scoreArray[3] = 1500; break;
        case 5: scoreArray[3] = 2000; break;
        case 6: scoreArray[3] = 3000; break;
        default: scoreArray[3] = 0;
    }
    switch (fives.length) {
        case 1: scoreArray[4] = 50; 
            straight++;
        break;
        case 2: scoreArray[4] = 100; 
            pairs++;
        break;
        case 3: scoreArray[4] = 500; 
            triplets++;
        break;
        case 4: scoreArray[4] = 1500; break;
        case 5: scoreArray[4] = 2000; break;
        case 6: scoreArray[4] = 3000; break;
        default: scoreArray[4] = 0;
    }
    switch (sixes.length) {
        case 1: scoreArray[5] = 0; 
            straight++;
        break;
        case 2: scoreArray[5] = 0;
            pairs++;
        break;
        case 3: scoreArray[5] = 600; 
            triplets++;
        break;
        case 4: scoreArray[5] = 1500; break;
        case 5: scoreArray[5] = 2000; break;
        case 6: scoreArray[5] = 3000; break;
        default: scoreArray[5] = 0;
    }
    console.log("pairs " + pairs);
    console.log("triplets " + triplets);
    if (pairs === 3) {
        tempScore = 1500;
    }
    else if (triplets === 2) {
        tempScore = 2000;
    }
    else if (straight === 6) {
        tempScore = 2500;
    }
    else {
        tempScore = scoreArray[0] + scoreArray[1] + scoreArray[2] + scoreArray[3] + scoreArray[4] + scoreArray[5];
    }
    console.log("CalcRollScore " + tempScore);
    
    if(player1.turn === true) {
        console.log("enter here");
        $("#player1-roll").text(tempScore);
        tempRoundScore = roundScore + tempScore;
        $("#player1-round").text(tempRoundScore);
    }
    else {
        $("#player2-roll").text(tempScore);
        tempRoundScore = roundScore + tempScore;
        $("#player2-round").text(tempRoundScore);
    }
    console.log("roundscore " + roundScore);
    console.log("temproundscore " + tempRoundScore);
}

function checkWin() {
    if (player1.turn === true && player1.score > 5000) {
        alert("Player 2 you have one last roll!");
    
    }
    else if (player2.turn === true && player2.score > 5000 && player2.score > player1.score) {
        alert("Player 2 wins!");
    }
    else if (player2.turn === true && player1.score > 5000) {
        alert("Player 1 wins");
    }
}
