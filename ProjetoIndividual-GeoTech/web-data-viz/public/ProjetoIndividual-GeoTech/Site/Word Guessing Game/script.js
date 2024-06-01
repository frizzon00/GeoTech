//Word and Hints Object
const options = {
    alemanha: {
      hint: "País Europeu",
      image: "../jogoBandeiras/alemanha.png"
    },
    brasil: {
      hint: "País Sul-Americano",
      image: "../jogoBandeiras/brasil.png"
    },
    china: {
      hint: "País Asiático",
      image: "../jogoBandeiras/china.png"
    }
};

//Initial References
const message = document.getElementById("message");
const hintRef = document.querySelector(".hint-ref");
const controls = document.querySelector(".controls-container");
const startBtn = document.getElementById("start");
const letterContainer = document.getElementById("letter-container");
const userInpSection = document.getElementById("user-input-section");
const resultText = document.getElementById("result");
const word = document.getElementById("word");
const words = Object.keys(options);
let randomWord = "",
  randomHint = "";
let winCount = 0,
  lossCount = 0;

//Generate random value
const generateRandomValue = (array) => Math.floor(Math.random() * array.length);

//Block all the buttons
const blocker = () => {
  let lettersButtons = document.querySelectorAll(".letters");
  stopGame();
};

//Start Game
startBtn.addEventListener("click", () => {
  // Adiciona a classe "hide" aos controles e inicia o jogo
  controls.classList.add("hide");
  init();

  // Função que envia os dados do usuário e do jogo ao servidor
  var idV = sessionStorage.ID_USUARIO;
  var jogoV = 4;

  // Envia os dados do usuário e do jogo para o servidor
  fetch("/usuarios/pais", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
          idServer: idV,
          jogoServer: jogoV
      }),
  }).then(function (resposta) {
      console.log("resposta: ", resposta);

      if (resposta.ok) {
          console.log("Dados enviados com sucesso!");
      } else {
          throw "Houve um erro ao tentar entrar em contato!";
      }
  }).catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
  });

  return false; // Adicione isso para cancelar a submissão do formulário, se aplicável
});

//Stop Game
const stopGame = () => {
  controls.classList.remove("hide");
};

//Generate Word Function
const generateWord = () => {
  letterContainer.classList.remove("hide");
  userInpSection.innerText = "";
  randomWord = words[generateRandomValue(words)];
  randomHint = options[randomWord].hint; // Acessa a dica da palavra
  let imageUrl = options[randomWord].image; // Acessa a URL da imagem da palavra
  hintRef.innerHTML = `<img width="280px" src="${imageUrl}" alt=""><br><div id="wordHint">
    <span>Dica: </span>${randomHint}</div>`;
  let displayItem = "";
  randomWord.split("").forEach((value) => {
    displayItem += '<span class="inputSpace">_ </span>';
  });

  //Display each element as span
  userInpSection.innerHTML = displayItem;
  userInpSection.innerHTML += `<div id='chanceCount'>Chances: ${lossCount}</div>`;
};

//Initial Function
const init = () => {
  winCount = 0;
  lossCount = 5;
  randomWord = "";
  word.innerText = "";
  randomHint = "";
  message.innerText = "";
  userInpSection.innerHTML = "";
  letterContainer.classList.add("hide");
  letterContainer.innerHTML = "";
  generateWord();

  //For creating letter buttons
  for (let i = 65; i < 91; i++) {
    let button = document.createElement("button");
    button.classList.add("letters");

    //Number to ASCII[A-Z]
    button.innerText = String.fromCharCode(i);

    //Character button onclick
    button.addEventListener("click", () => {
      message.innerText = `Letra Correta`;
      message.style.color = "#008000";
      let charArray = randomWord.toUpperCase().split("");
      let inputSpace = document.getElementsByClassName("inputSpace");

      //If array contains clicked value replace the matched Dash with Letter
      if (charArray.includes(button.innerText)) {
        charArray.forEach((char, index) => {
          //If character in array is same as clicked button
          if (char === button.innerText) {
            button.classList.add("correct");
            //Replace dash with letter
            inputSpace[index].innerText = char;
            //increment counter
            winCount += 1;
            //If winCount equals word length
            if (winCount == charArray.length) {
              resultText.innerHTML = "Parabéns, Você Venceu";
              startBtn.innerText = "Jogar Novamente";
              //block all buttons
              blocker();
            }
          }
        });
      } else {
        //lose count
        button.classList.add("incorrect");
        lossCount -= 1;
        document.getElementById(
          "chanceCount"
        ).innerText = `Chances: ${lossCount}`;
        message.innerText = `Letra Incorreta`;
        message.style.color = "#ff0000";
        if (lossCount == 0) {
          word.innerHTML = `O País era: <span>${randomWord}</span>`;
          resultText.innerHTML = "Game Over";
          blocker();
        }
      }

      //Disable clicked buttons
      button.disabled = true;
    });

    //Append generated buttons to the letters container
    letterContainer.appendChild(button);
  }
};

window.onload = () => {
  init();
};
