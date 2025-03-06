/**
 * Write your challenge solution here
 */
// Image data
// const images = [
//   {
//     url: 'https://plus.unsplash.com/premium_photo-1666863909125-3a01f038e71f?q=80&w=1986&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     caption: 'Beautiful Mountain Landscape',
//   },
//   {
//     url: 'https://plus.unsplash.com/premium_photo-1690576837108-3c8343a1fc83?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     caption: 'Ocean Sunset View',
//   },
//   {
//     url: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=2041&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     caption: 'Autumn Forest Path',
//   },
//   {
//     url: 'https://plus.unsplash.com/premium_photo-1680466057202-4aa3c6329758?q=80&w=2138&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     caption: 'Urban City Skyline',
//   },
// ];

const gameEmojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];
const gameContainer = document.getElementById('gameContainer');
let user = null;
let memoryCardObj = null;

function timer() {
  const timer = document.getElementById('time');
  let seconds = 0;
  let minutes = 0;

  const intervalId = setInterval(() => {
    seconds++;
    if (seconds == 60) {
      seconds = 0;
      minutes++;
    }

    timer.textContent = `${minutes.toString().padStart(2, '0')}: ${seconds
      .toString()
      .padStart(2, '0')}`;
  }, 1000);

  return intervalId;
}

class User {
  #userMove = 0;

  get getUserMove() {
    return this.#userMove;
  }

  /**
   * @param {number} score
   * @param {any} mves
   */
  incrementMoves() {
    this.#userMove++;
    return this.#userMove;
  }

  resetMove() {
    this.#userMove = 0;
  }
}

class MemoryCard {
  #currentGameEmojis = null;
  #secondLastCard = null;
  #lastCard = null;
  #presentCard = null;
  #timerId = null;
  #NumberofCorrectsCards = 0;

  constructor(row, col) {
    this.row = row;
    this.col = col;
    this.cardSize = row * col;
  }

  #createGameCardsGrid() {
    for (let i = 0; i < this.row * this.col; i++) {
      const card = document.createElement('div');
      card.classList.add('card');

      const cardFront = document.createElement('div');
      cardFront.classList.add('card-front');
      cardFront.appendChild(document.createTextNode('?'));

      const cardBack = document.createElement('div');
      cardBack.classList.add('card-back');

      card.append(cardFront, cardBack);
      gameContainer.append(card);
    }
  }

  #shuffleGameCards() {
    this.#currentGameEmojis = null;
    this.#currentGameEmojis = new Array(this.cardSize);

    //suffling logic
    let indices = [...this.#currentGameEmojis.keys()];
    indices.sort(() => Math.random() - 0.5);
    let temp = 0;
    let index = 0;

    for (index = 0; index < this.cardSize / 2; index++) {
      const cardEmoji =
        gameEmojis[Math.floor(Math.random() * gameEmojis.length)];
      this.#currentGameEmojis[indices[temp++]] = cardEmoji;
      this.#currentGameEmojis[indices[temp++]] = cardEmoji;
    }

    //adding emojis to a card
    index = 0;
    document.querySelectorAll('.card-back').forEach((card) => {
      card.textContent = this.#currentGameEmojis[index++];
    });
  }

  startGame() {
    if (this.#currentGameEmojis === null) {
      this.#createGameCardsGrid();
    }
    this.#shuffleGameCards();
    this.#timerId = timer();
  }

  resetScoreBoard() {
    this.#secondLastCard = null;
    this.#lastCard = null;
    this.#presentCard = null;
    this.#NumberofCorrectsCards = 0;
    document.getElementById('moves').textContent = user.getUserMove;
    document.getElementById('time').textContent = '00:00';
    document.querySelectorAll('.card').forEach((card) => {
      card.classList.remove('flipped');
    });
  }

  #updateScoreCard() {
    let moveElement = document.getElementById('moves');
    let moves = user.incrementMoves();
    moveElement.textContent = moves;

    if (this.#NumberofCorrectsCards == this.cardSize) {
      clearInterval(this.#timerId);
      setTimeout(() => {
        alert('You have completed the game');
      }, 500);
    }
  }

  handleCardClick(e) {
    if (this.#secondLastCard === null && this.#lastCard === null) {
      this.#secondLastCard = {
        value: e.target.textContent,
        card: e.target,
      };
      return;
    } else if (this.#lastCard === null) {
      this.#lastCard = {
        value: e.target.textContent,
        card: e.target,
      };
      if (this.#NumberofCorrectsCards == this.cardSize - 2) {
        this.#NumberofCorrectsCards += 2;
      }
      this.#updateScoreCard();
      return;
    } else {
      this.#presentCard = {
        value: e.target.textContent,
        card: e.target,
      };
      let isLastTwoOpenCardEqual =
        this.#secondLastCard.card.nextElementSibling.textContent ==
        this.#lastCard.card.nextElementSibling.textContent;

      if (isLastTwoOpenCardEqual) {
        this.#NumberofCorrectsCards += 2;
      } else {
        this.#secondLastCard.card.closest('.card').classList.remove('flipped');
        this.#lastCard.card.closest('.card').classList.remove('flipped');
      }

      this.#secondLastCard = this.#presentCard;
      this.#lastCard = null;
      this.#presentCard = null;
    }
  }
}

function restartGame() {
  if (user === null) {
    user = new User();
    memoryCardObj = new MemoryCard(4, 4);
  }
  user.resetMove();
  memoryCardObj.resetScoreBoard();
  memoryCardObj.startGame();
}

gameContainer.addEventListener('click', function (e) {
  if (e.target.matches('.card-front')) {
    memoryCardObj.handleCardClick(e);
    e.target.closest('.card').classList.add('flipped');
  }
});
