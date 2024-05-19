//Initial References
let draggableObjects;
let dropPoints;
const startButton = document.getElementById("start");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-container");
const dragContainer = document.querySelector(".draggable-objects");
const dropContainer = document.querySelector(".drop-points");
const data = [
  "belgica",
  "butão",
  "brasil",
  "china",
  "cuba",
  "equador",
  "georgia",
  "alemanha",
  "hong-kong",
  "india",
  "irã",
  "myanmar",
  "noruega",
  "espanha",
  "sri-lanka",
  "suécia",
  "suiça",
  "EUA",
  "uruguai",
  "gales",
];
let deviceType = "";
let initialX = 0,
  initialY = 0;
let currentElement = "";
let moveElement = false;
let count = 0;
let wrongCount = 0; // Adicionamos uma variável para contar o número de bandeiras incorretamente colocadas

//Detect touch device
const isTouchDevice = () => {
  try {
    //We try to create Touch Event (It would fail for desktops and throw error)
    document.createEvent("TouchEvent");
    deviceType = "touch";
    return true;
  } catch (e) {
    deviceType = "mouse";
    return false;
  }
};

//Random value from Array
const randomValueGenerator = () => {
  return data[Math.floor(Math.random() * data.length)];
};

//Win Game Display
const stopGame = () => {
  controls.classList.remove("hide");
  startButton.classList.remove("hide");
};

//Função para encerrar o jogo
const endGame = () => {
  controls.classList.remove("hide");
  startButton.classList.remove("hide");
};

// Verifica se o jogo foi ganho ou perdido
const checkGameStatus = () => {
  if (count == 3 && wrongCount == 0) {
    result.innerText = `Parabéns, você venceu!`;
    startButton.innerHTML = `Jogar Novamente`;
    endGame(); // Encerra o jogo quando vencer
  } else if (count == 3 && wrongCount <= 3) {
    result.innerText = `Você acertou ${wrongCount} de 3 Bandeiras\nTente Novamente`;
    startButton.innerHTML = `Jogar Novamente`;
    endGame(); // Encerra o jogo quando perder
  }
};

//Drag & Drop Functions
function dragStart(e) {
  if (isTouchDevice()) {
    initialX = e.touches[0].clientX;
    initialY = e.touches[0].clientY;
    //Start movement for touch
    moveElement = true;
    currentElement = e.target;
  } else {
    //For non touch devices set data to be transferred
    e.dataTransfer.setData("text", e.target.id);
  }
}

//Events fired on the drop target
function dragOver(e) {
  e.preventDefault();
}

//For touchscreen movement
const touchMove = (e) => {
  if (moveElement) {
    e.preventDefault();
    let newX = e.touches[0].clientX;
    let newY = e.touches[0].clientY;
    let currentSelectedElement = document.getElementById(e.target.id);
    currentSelectedElement.parentElement.style.top =
      currentSelectedElement.parentElement.offsetTop - (initialY - newY) + "px";
    currentSelectedElement.parentElement.style.left =
      currentSelectedElement.parentElement.offsetLeft -
      (initialX - newX) +
      "px";
    initialX = newX;
    initialY = newY; // Correção aqui, era inicialY - newY
  }
};

const drop = (e) => {
  e.preventDefault();

  //For touch screen
  if (isTouchDevice()) {
    moveElement = false;
    //Select country name div using the custom attribute
    const currentDrop = document.querySelector(`div[data-id='${e.target.id}']`);
    //Get boundaries of div
    const currentDropBound = currentDrop.getBoundingClientRect();
    //if the position of flag falls inside the bounds of the country name
    if (
      initialX >= currentDropBound.left &&
      initialX <= currentDropBound.right &&
      initialY >= currentDropBound.top &&
      initialY <= currentDropBound.bottom
    ) {
      currentDrop.classList.add("dropped");
      //hide actual image
      currentElement.classList.add("hide");
      currentDrop.innerHTML = ``;
      //Insert new img element
      currentDrop.insertAdjacentHTML(
        "afterbegin",
        `<img src= "${currentElement.id}.png">`
      );
      count += 1;
    } else {
      // Incrementa o contador de bandeiras incorretas
      wrongCount++;
    }
  } else {
    // Remove a verificação da correspondência entre os dados da imagem e da div de destino
    const draggedElementData = e.dataTransfer.getData("text");
    const droppableElementData = e.target.getAttribute("data-id");

    const draggedElement = document.getElementById(draggedElementData);
    const dropTarget = e.target;

    if (draggedElementData === droppableElementData) {
      // Se a imagem corresponde ao destino
      dropTarget.classList.add("dropped");
    } else {
      // Se a imagem não corresponde ao destino, destaque em vermelho
      dropTarget.classList.add("wrong");
      // Incrementa o contador de bandeiras incorretas
      wrongCount++;
    }

    // Oculta a imagem atualmente arrastada
    draggedElement.classList.add("hide");
    // Define o atributo "draggable" como falso para evitar que seja arrastado novamente
    draggedElement.setAttribute("draggable", "false");
    // Limpa o conteúdo atual da div
    dropTarget.innerHTML = "";
    // Insere a imagem arrastada na div de destino (pode ser correta ou incorreta)
    dropTarget.insertAdjacentHTML(
      "afterbegin",
      `<img src="${draggedElementData}.png">`
    );
    count += 1;
  }

  // Verifica se o jogo foi ganho ou perdido apenas quando todas as bandeiras foram colocadas
  if (count + wrongCount >= 3) {
    checkGameStatus();
  }
};

//Creates flags and countries
const creator = () => {
  dragContainer.innerHTML = "";
  dropContainer.innerHTML = "";
  let randomData = [];
  //for string random values in array
  for (let i = 1; i <= 3; i++) {
    let randomValue = randomValueGenerator();
    if (!randomData.includes(randomValue)) {
      randomData.push(randomValue);
    } else {
      //If value already exists then decrement i by 1
      i -= 1;
    }
  }
  for (let i of randomData) {
    const flagDiv = document.createElement("div");
    flagDiv.classList.add("draggable-image");
    flagDiv.setAttribute("draggable", true);
    if (isTouchDevice()) {
      flagDiv.style.position = "absolute";
    }
    flagDiv.innerHTML = `<img src="${i}.png" id="${i}">`;
    dragContainer.appendChild(flagDiv);
  }
  //Sort the array randomly before creating country divs
  randomData = randomData.sort(() => 0.5 - Math.random());
  for (let i of randomData) {
    const countryDiv = document.createElement("div");
    countryDiv.innerHTML = `<div class='countries' data-id='${i}'>
    ${i.charAt(0).toUpperCase() + i.slice(1).replace("-", " ")}
    </div>
    `;
    dropContainer.appendChild(countryDiv);
  }
};

//Start Game
startButton.addEventListener(
  "click",
  (startGame = async () => {
    currentElement = "";
    controls.classList.add("hide");
    startButton.classList.add("hide");
    //This will wait for creator to create the images and then move forward
    await creator();
    count = 0;
    wrongCount = 0; // Reinicia o contador de bandeiras incorretas
    dropPoints = document.querySelectorAll(".countries");
    draggableObjects = document.querySelectorAll(".draggable-image");
    //Events
    draggableObjects.forEach((element) => {
      element.addEventListener("dragstart", dragStart);
      //for touch screen
      element.addEventListener("touchstart", dragStart);
      element.addEventListener("touchend", drop);
      element.addEventListener("touchmove", touchMove);
    });
    dropPoints.forEach((element) => {
      element.addEventListener("dragover", dragOver);
      element.addEventListener("drop", drop);
    });
  })
);
