// GLOBAL VARIABLES
let onOff = false;

// PANEL ARRAY
let panel = ['a','b','c','d','e','f','g','h','i'];

// POSSIBLE WINS ARRAY
let winsArr = [
   [0,1,2],
   [3,4,5],
   [6,7,8],
   [0,3,6],
   [1,4,7],
   [2,5,8],
   [0,4,8],
   [2,4,6],
]

// ACTIVE PLAYER
let aPlayer = 'left';

// LAST PLAYER
let xTemp = 'left';

// MOVES COUNTER
let counter = 0;

// ELEMENTS ACCESS
let gBtn = document.getElementById('gameBtn');
let p1Input = document.getElementById('p1Txt');
let p2Input = document.getElementById('p2Txt');
let p1Name = document.getElementById('pl1Name');
let p2Name = document.getElementById('pl2Name');
let sttsDiv = document.getElementById('sttsBar');
let leftDiv = document.getElementById('leftbox');
let rightDiv = document.getElementById('rightbox');

let td = [];
for (let i = 1; i <= panel.length; i++) {
   td[i] = document.getElementById(`td${i}`);
}






// BUTTON FUNCTIONALITY
function btn() {
   if (gBtn.innerText === 'Start') {
      if (p1Input.value && p2Input.value) {
         startGame(p1Input.value, p2Input.value);
      } else if (!(p1Input.value) && !(p2Input.value)) {
         alert("Please enter player names!");
      } else {
         p1Input.value ? '' : alert("Player 1, Please enter your name!");
         p2Input.value ? '' : alert("Player 2, Please enter your name!");
      }
   } else if (gBtn.innerText === 'New Game') {
      leftDiv.style.visibility = 'visible';
      rightDiv.style.visibility = 'visible';
      p1Input.focus();
      p1Input.select();
      gBtn.innerText = 'Start';
   } else {
      confirm("Are you sure you want to reset the game?") ? location.reload() : "";
   }
}

// STARTING NEW GAME
function startGame(player1, player2) {
   var td1 = document.getElementById('td1');
   td1.style.backgroundColor = 'rgb(230, 230, 230)';
   var td5 = document.getElementById('td5');
   td5.style.backgroundColor = 'rgb(230, 230, 230)';

   leftbox.style.visibility = 'hidden';
   rightbox.style.visibility = 'hidden';

   document.getElementById('img1').remove();
   document.getElementById('img5').remove();

   sttsDiv.style.visibility = 'visible';

   turn(player1, player2);

   onOff = true;
   gBtn.innerText = 'Reset';
}

function endGame(){
   sttsDiv.style.fontWeight = 'bold';
   sttsDiv.innerText = "It's a tie !!";
   onOff = false;
}

function turn(player1, player2){
   aPlayer === 'left' ? sttsDiv.innerText = `(O) - ${player1}'s turn` :  sttsDiv.innerText = `(X) - ${player2}'s turn`;
   return;
}

// MAIN GAME PROCESS
function playGame(x) {
   if (onOff) {
      counter++;

      let imgO = document.createElement('img');
      imgO.src = 'o.png';
      let imgX = document.createElement('img');
      imgX.src = 'x.png';
      let td = `td${x}`;
   
      if (xTemp === 'left') {
         aPlayer = 'right';
         panel[x-1] = 'o';
         td = document.getElementById(td);
         td.appendChild(imgO);
         td.style.backgroundColor = '#3399cc';
      } else {
         aPlayer = 'left';
         panel[x-1] = 'x';
         td = document.getElementById(td);
         td.appendChild(imgX);
         td.style.backgroundColor = '#ff3333';
      }

      turn(p1Input.value, p2Input.value);
      xTemp = aPlayer;
      
      if (counter > 8) {
         sttsDiv.style.fontWeight = 'bold';
         sttsDiv.innerText = "It's a Tie !!";
         onOff = false;
      } else {
      for (let i = 0; i < 8; i++) {
         if (panel[winsArr[i][0]] === panel[winsArr[i][1]] && panel[winsArr[i][1]] === panel[winsArr[i][2]] && panel[winsArr[i][0]] === panel[winsArr[i][2]]){
            sttsDiv.style.fontWeight = 'bold';
            aPlayer === 'right' ? sttsDiv.innerText = `${p1Input.value} is the winner !!` :  sttsDiv.innerText = `${p2Input.value} is the winner !!`;
            onOff = false;
         }
      }
      }
   }
}

// CHANGING BACKGROUND ON MOUSE OVER
function tdOver(x) {
   if (onOff && !(td[x].innerHTML)) {
      td[x].style.backgroundColor = '#98bde0';
   }
}

// RESET BACKGROUND ON MOUSE OUT
function tdOut(x) {
   if (onOff && !(td[x].innerHTML)) {
      td[x].style.backgroundColor = '';
   }
}