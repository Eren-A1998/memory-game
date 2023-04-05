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

const toggleFlip = (idx) => {
  Prepare.fullTrack.play();
  const card = Prepare.cards[idx];

  if (!card.flip && card.clickable) {
    flip(card, idx);
    selectCard(card, idx);
  }
};

const flip = (card: ICard, index: number) => {
  Prepare.flipAudio.play();
  if (card) {
    card.flip = card.flip === "" ? "flip" : "";
    document.getElementById(`card-flip-${index}`).classList.value = card.flip;
  }
};

const selectCard = (card: ICard, index: number) => {
  if (!Prepare.selectedCard_1) {
    Prepare.selectedCard_1 = card;
    Prepare.selectedIndex_1 = index;
  } else if (!Prepare.selectedCard_2) {
    Prepare.selectedCard_2 = card;
    Prepare.selectedIndex_2 = index;
  }
  if (Prepare.selectedCard_1 && Prepare.selectedCard_2) {
    if (Prepare.selectedCard_1.src === Prepare.selectedCard_2.src) {
      Prepare.selectedCard_1.clickable = false;
      Prepare.selectedCard_2.clickable = false;
      Prepare.selectedCard_1 = null;
      Prepare.selectedCard_2 = null;
      // stopAudio(Prepare.failAudio);
      // stopAudio(Prepare.goodAudio);
      // stopAudio(Prepare.fullTrack)
      Prepare.goodAudio.play();
      // setTimeout(() => {
      //   Prepare.fullTrack.play()
      // }, 2000);
      // changeProgress();
      // checkFinish();
    }
    else {
        // stopAudio(Prepare.fullTrack)
        setTimeout(() => {
            // stopAudio(Prepare.failAudio);
            // stopAudio(Prepare.goodAudio);
            Prepare.failAudio.play();
            flip(Prepare.selectedCard_1, Prepare.selectedIndex_1);
            flip(Prepare.selectedCard_2, Prepare.selectedIndex_2);
            Prepare.selectedCard_1 = null;
            Prepare.selectedCard_2 = null;
        }, 1000);
        // Prepare.fullTrack.play()
        
    }
  }
};

const stopAudio = (audio: HTMLAudioElement) => {
  if (audio && audio.played) {
    audio.pause();
    audio.currentTime = 0;
  }
};
//#endregion

//#region game logic
for (let index = 0; index < CardsNumber / 2; index++) {
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
//#endregion
