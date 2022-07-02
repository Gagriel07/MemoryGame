const grid = document.querySelector(".grid");
const namePlayer = document.querySelector(".name");
const timerGame = document.querySelector(".timer");
let sec = 0;
let min = 0;
let interval;

const characters = [
  "bulbasaur",
  "charmander",
  "eevee",
  "machop",
  "mew",
  "nidoran",
  "picachu",
  "pidgey",
  "squirtle",
  "voltorb",
];

const timer = () => {
  sec++;
  if (sec == 60) {
    min++;
    sec = 0;
  }
  timerGame.innerHTML = `Tempo ${twoDigits(min)}:${twoDigits(sec)}`;
};

const twoDigits = (digit) => {
  if (digit < 10) {
    return "0" + digit;
  } else {
    return digit;
  }
};

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
};

let firstCard = "";
let secondCard = "";

checkEndGame = () => {
  const disableCards = document.querySelectorAll(".disable-card");

  if (disableCards.length === 20) {
    clearInterval(interval);

    if(min < 1) {
        Swal.fire({
            title: `Parabens ${localStorage.getItem('name')} você ganhou!`,
            text: `Seu tempo final foi de ${sec} segundos`
          });
    } else {
        Swal.fire({
            title: `Parabens ${localStorage.getItem('name')} você ganhou!`,
            text: `Seu tempo final foi de ${min} minutos e ${sec} segundos`
          });
    }

    Swal.fire({
        title: 'Deseja jogar novamente?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Não',
        confirmButtonText: 'Sim'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'Reiniciando o jogo',
            text: 'Estamos embaralhando as cartas...'
          })
          location.reload()
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire({
                title: 'Obrigado por jogar!',
            })
        }
      })
  }  
};

checkCards = () => {
  const firstCharacter = firstCard.getAttribute("data-character");
  const secondCharacter = secondCard.getAttribute("data-character");

  if (firstCharacter === secondCharacter) {
    firstCard.firstChild.classList.add("disable-card");
    secondCard.firstChild.classList.add("disable-card");

    firstCard = "";
    secondCard = "";

    setTimeout(() => {
      checkEndGame();
    }, 500);
  } else {
    setTimeout(() => {
      firstCard.classList.remove("reveal-card");
      secondCard.classList.remove("reveal-card");

      firstCard = "";
      secondCard = "";
    }, 500);
  }
};

const revealCard = ({ target }) => {
  if (target.parentNode.className.includes("reveal-card")) {
    return;
  }

  if (firstCard === "") {
    target.parentNode.classList.add("reveal-card");
    firstCard = target.parentNode;
  } else if (secondCard === "") {
    target.parentNode.classList.add("reveal-card");
    secondCard = target.parentNode;

    checkCards();
  }
};

const createCard = (character) => {
  const card = createElement("div", "card");
  const front = createElement("div", "face front");
  const back = createElement("div", "face back");

  front.style.backgroundImage = `url('../images/${character}.png')`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener("click", revealCard);
  card.setAttribute("data-character", character);

  return card;
};

const loadGame = () => {
  namePlayer.innerHTML += ` ${localStorage.getItem("name")}`;

  const duplicateCharacters = [...characters, ...characters];

  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

  shuffledArray.forEach((character) => {
    const card = createCard(character);
    grid.appendChild(card);
  });

  interval = setInterval(timer, 1000);
};

loadGame();
