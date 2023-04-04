//#region imports
import { IPrepare } from "./models/prepare.model";
import { ICard } from "./models/card.model";
//#endregion

//#region  var declaration
const Prepare: IPrepare = {};
Prepare.cards = [];
Prepare.progress = 0;
Prepare.fullTrack = new Audio("./assets/audio/fullBack.mp3");
Prepare.flipAudio = new Audio("./assets/audio/flipCard.mp3");
Prepare.failAudio = new Audio("./assets/audio/fail.mp3");
Prepare.goodAudio = new Audio("./assets/audio/success.mp3");
Prepare.gameOverAudio = new Audio("./assets/audio/gameOver.mp3");
Prepare.fullTrack.loop = true;

const CardsNumber = 20;
const TempNumbers: Array<string> = [];
let CardsHtmlContent = "";
//#endregion

//#region function declaration
const getRandomInt = (min, max) => {
  let result: number;
  let exist = true;
  min = Math.ceil(min); // 2.3 => 3
  max = Math.floor(max); // 9.9=>9
  while (exist) {
    result = Math.floor(Math.random() * (max - min + 1)) + min;
    if (!TempNumbers.find((no) => no === result.toString())) {
      exist = false;
      TempNumbers.push(result.toString());
    }
  }
  return result;
};

const toggleFlip = (idx) => {};

//#endregion

//#region game logic
for (let index = 0; index <= CardsNumber / 2; index++) {
  Prepare.cards.push({
    id: getRandomInt(0, CardsNumber),
    src: `./assets/images/${index}.jpg`,
    flip: "",
    clickable: true,
    index,
  });
  Prepare.cards.push({
    id: getRandomInt(0, CardsNumber),
    src: `./assets/images/${index}.jpg`,
    flip: "",
    clickable: true,
    index,
  });
}

Prepare.cards.sort((a, b) => (a.id > b.id ? 1 : -1));

Prepare.cards.forEach((item, index) => {
  console.log(item);
  CardsHtmlContent += `
  <span class="col-sm-3 col-lg-2">
      <!-- Card Flip -->
      <div onclick="toggleFlip(${index})" class="card-flip">
          <div id="card-flip-${index}">
              <div class="front">
                  <!-- front content -->
                  <div class="card">
                      <img class="card-image" src="./assets/back.jpg" alt="Loading...">
                      <span class="card-content">${index + 1}</span>
                  </div>
              </div>
              <div class="back">
                  <!-- back content -->
                  <div class="card">
                      <img src="./assets/images/${
                        item.index
                      }.jpg" alt="Image [100%x180]" data-holder-rendered="true"
                          style="height: 120px; width: 100%; display: block;">
                  </div>
              </div>
          </div>
      </div>
      <!-- End Card Flip -->
  </span>
  `;
});

document.getElementById("cards").innerHTML = CardsHtmlContent;
