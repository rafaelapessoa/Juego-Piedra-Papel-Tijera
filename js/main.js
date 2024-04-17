'use strict';

const select = document.querySelector('.js-options-game');
const btn = document.querySelector('.js-btn');
const result = document.querySelector('.js-box-result');
const spanScorePlayer = document.querySelector('.js-playerScore')
const spanScorePc = document.querySelector('.js-computerScore')
const btnReset = document.querySelector ('.js-btnReset');
let computerScore = 0; //contador puntos computadora
let playerScore = 0; // contador puntos jugador
let move = 0; //contador de partidos

//genera numero aleatorio de 1 a 9
function getRandomNumber(max) {
    return Math.ceil(Math.random() * max);
}

//conversion del numero para el resultado
function randomNumber (){ 
    const numberRandom = getRandomNumber(9);
    let movePc = '';  
    if (numberRandom <= 3){
        movePc = "piedra";    
    } else if (numberRandom >= 7){
        movePc = "papel";
    } else {
        movePc = "tijera";
    }
    return movePc;
}

//comparacion del resultado selecionado con el valor generado
function playGame (){
    const valueSelect = select.value;
    const movePc = randomNumber ();

    move++;
    console.log(valueSelect, movePc);

    if (valueSelect === 'select') {
        result.innerHTML = 'Debes seleccionar una opcion';
      } else if (valueSelect === movePc) {
        result.innerHTML = 'Empate!';
      } else if (
        (valueSelect === 'piedra' && movePc === 'tijera') ||
        (valueSelect === 'tijera' && movePc === 'papel') ||
        (valueSelect === 'papel' && movePc === 'piedra')
      ) {
        result.innerHTML = 'Has ganado!';
        playerScore++; // playerScore= playerScore+1
      } else {
        result.innerHTML = 'Has perdido';
        computerScore++;
      }

    spanScorePc.innerHTML = computerScore;
    spanScorePlayer.innerHTML = playerScore;
}

//cuando si finaliza los 10 partidos
function gameOver (){

    if (move === 10){
        btnReset.classList.remove('hidden'); //quita el display none y muestra el boton
        btn.classList.add('hidden'); //add display none y desaparece el boton de jugar
        if (computerScore > playerScore) {
            result.innerHTML = 'Ha ganado el ordenador :(';
          } else if (playerScore > computerScore) {
            result.innerHTML = 'Ha ganado la usuaria :)';
          } else {
            result.innerHTML = 'ha ocurrido un empate';
          }
    }
}

//evento del boton
const handlerClick = (event) => {
    event.preventDefault();
    playGame();
    gameOver();    
};
btn.addEventListener("click", handlerClick);

//cuando se llega a las 10 jugadas y se reinicia
function reload(){
    btnReset.classList.add("hidden");
    computerScore = 0;
    playerScore = 0;
    move = 0;
    spanScorePc.innerHTML = computerScore;
    spanScorePlayer.innerHTML = playerScore;
    result.innerHTML = 'Vamos a jugar';
    btn.classList.remove('hidden');
    select.value = 'select';
}
btnReset.addEventListener('click', reload);