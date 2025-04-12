let boxes = document.querySelectorAll('.box');   // getting access of all the boxes. returns a NodeList
let resetBtn = document.querySelector('#reset-btn');   // getting access of the reset button
let msgContainer = document.querySelector('.msg-container');   // getting access of the winner message container div
let winnerMsg = document.querySelector('#winner-msg');   // getting access of the winner message paragraph
let newGameBtn = document.querySelector('#newGame-btn');   // getting access of the new game button

let turnO = true;   // playerX, playerY. if true then O will be displayed, if false then X will be displayed

const winPatterns = [   // storing the winning patterns in 2d array (arrays within an array)
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

boxes.forEach(function (box) {    // using forEach to add event listener on each box
    box.addEventListener('click', function () {
        if (turnO === true) {    // checking weather it's playerO's turn to play.
            box.innerText = 'O';    // O will be displayed in the box clicked as turnO is true
            turnO = false;    // changinf turnO to false which means now it's playerX's turn to play
        } else {    // playerX's turn
            box.innerText = 'X';
            turnO = true;    // again changing turnO to true as now playerO will play
        }
        box.disabled = true;    // disabling the box after clicking so innerText can't be changed

        checkWinner();    // calling the function everytime a button is clicked to check winner   
    });
});


function checkWinner() {   // declaring a function to check winner conditions
    for (const pattern of winPatterns) {   // Loops through each pattern in winPatterns. checking each winning pattern
        let pos1Val = boxes[pattern[0]].innerText   // pattern[0] pattern[1] pattern[2] represent the 3 indexes of a winning pattern.
        let pos2Val = boxes[pattern[1]].innerText   // boxes[pattern[0]].innerText Prints the actual content inside the three boxes at those indexes.
        let pos3Val = boxes[pattern[2]].innerText

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {   // Condition to make sure that the boxes are not empty.
            if (pos1Val === pos2Val && pos2Val === pos3Val) {   // condition to check weather values in all three boxes are same
                showWinner(pos1Val);   // calling the showWinner function and passing pos1Val as argument as value of pos1Val is winner
                return;  // exit the function if a winner is found
            }
        }
    }

    // This only runs if no winner was found
    let allFilled = Array.from(boxes).every((box) => {  // Array.from() convertes boxes(nodelist) into array
        return box.innerText !== "";  // .every() checks every element in the array for a specific condition. returns true only if every box is not empty
    })
    if (allFilled) {  // function to run if allFilled is true
        showDraw();
    }
};


function showWinner(winner) {   // declaring a function to display winner message in winnerMsg paragraph
    winnerMsg.innerText = `Congratulations, Winner is ${winner}`;   // updating the text content of winnerMsg paragraph
    msgContainer.classList.remove('hide');   // removing the class 'hide' from msgContainer div to display it

    boxes.forEach(function (box) {   // Loops through all boxes and disables them
        box.disabled = true;   // Disabling all boxes after a winner is found
    });
}

function showDraw() {
    winnerMsg.innerText = "It's a Draw!!";
    msgContainer.classList.remove('hide')

    boxes.forEach(function (box) {
        box.disabled = true;
    })
}

function resetGame() {   // declaring a function for reset button to reset the game
    turnO = true;   // playerO's turn
    msgContainer.classList.add('hide');   // adding the class 'hide' again to hide msgContainer div 

    boxes.forEach(function (box) {   // Loops through all boxes and enables them
        box.disabled = false;   // enabling all boxes again
        box.innerText = "";   // Clear the text of all boxes
    });
}

newGameBtn.addEventListener('click', resetGame);   // adding eventListener to new game button to start new game
resetBtn.addEventListener('click', resetGame);   // adding eventListener to reset game button to reset the game