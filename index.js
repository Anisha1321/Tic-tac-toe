const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const gameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPosition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    //UI Update
    boxes.forEach((box, index) => {
        box.innerHTML = "";
        box.style.pointerEvents = "all";
        //green color jo winning k baad aata hai usko remove krna hai
        //initialise box with css properties again
        box.classList =  `box box${index+1}`;
    });
    gameBtn.classList.remove("active");

    gameInfo.innerHTML = `Current Player - ${currentPlayer}`;
}

initGame();


function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "O";
    }
    else{
        currentPlayer = "X";
    }
    //Update UI
    gameInfo.innerHTML = `Current Player - ${currentPlayer}`;
}


function checkGameOver(){
    let answer = "";
    winningPosition.forEach((position) => {
        // if all the winning positions are non empty and all three are equal.
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
        && (gameGrid[position[0]] === gameGrid[position[1]] && gameGrid[position[1]] === gameGrid[position[2]])){
            
            //if the winning player is X or O
            if(gameGrid[position[0]] === "X"){
                answer = "X";
            }
            else{
                answer = "O";
            }

            //disable pointer events
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

            //change color of the winning blocks
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }

    });

    if(answer !== ""){
        //means we have a winner
        gameInfo.innerHTML = `Winner Player - ${answer}`;
        gameBtn.classList.add("active");
        return;
    }

    //if the game is tied. All the boxes are filled and answer variable is still emmty 
    let fillcount = 0;
    gameGrid.forEach((box) =>{
        if(box !== ""){
            fillcount++;
        }
    })

    if(fillcount === 9){
        gameInfo.innerHTML = "Game Tied";
        gameBtn.classList.add("active");
    }

}



function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerHTML = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        //swap turn
        swapTurn();
        // check if someone won
        checkGameOver();
    }
}


boxes.forEach((box,index) => {
    box.addEventListener("click", () =>{
        handleClick(index);
    })
});

gameBtn.addEventListener("click",initGame);