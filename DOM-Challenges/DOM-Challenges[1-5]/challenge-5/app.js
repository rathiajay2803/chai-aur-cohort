/**
 * Write your challenge solution here
 */
// Image data
const images = [
  {
    url: 'https://plus.unsplash.com/premium_photo-1666863909125-3a01f038e71f?q=80&w=1986&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    caption: 'Beautiful Mountain Landscape',
  },
  {
    url: 'https://plus.unsplash.com/premium_photo-1690576837108-3c8343a1fc83?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    caption: 'Ocean Sunset View',
  },
  {
    url: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=2041&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    caption: 'Autumn Forest Path',
  },
  {
    url: 'https://plus.unsplash.com/premium_photo-1680466057202-4aa3c6329758?q=80&w=2138&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    caption: 'Urban City Skyline',
  },
];

const carouselTrack = document.getElementById('carouselTrack');
const nextButton = document.getElementById('nextButton');
const prevButton = document.getElementById('prevButton');
const caption = document.getElementById('caption');
const carouselNav = document.getElementById('carouselNav');

const div = document.createElement('div');
let currentImageIndex = 0;
const totalImages = Object.keys(images).length;
let isAutoStart = false;

div.classList.add('carousel-slide');

function loadCarouselNav() {
  for (let i = 0; i < totalImages; i++) {
    const div = document.createElement('div');
    div.classList.add('carousel-indicator');
    carouselNav.append(div);
  }
}

function updateCarouselNav(newImageIndex, oldImageIndex) {
  const carouselNavtoUpdate = carouselNav.querySelector(
    `div:nth-child(${newImageIndex + 1})`
  );
  if (oldImageIndex !== undefined) {
    const carouselNavtoRemove = carouselNav.querySelector(
      `div:nth-child(${oldImageIndex + 1})`
    );
    carouselNavtoRemove.classList.remove('active');
  }

  carouselNavtoUpdate.classList.add('active');
}

function updateCarousalImage(imageIndex) {
  div.style.backgroundImage = `url(${images[imageIndex].url})`;
  carouselTrack.appendChild(div);
  caption.innerText = images[imageIndex].caption;
}

function autoStartOrStopCarousal() {
  const autoPlayButton = document.getElementById('autoPlayButton');
  const timerDisplay = document.getElementById('timerDisplay');
  let timer = 5;
  if (isAutoStart) {
    autoPlayButton.innerText = 'Stop Auto Play';
    const timerID = setInterval(() => {
      timerDisplay.innerText = `Next slide in ${timer--}`;
    }, 1000);
    setTimeout(() => {
      nextButton.click();
      clearInterval(timerID);
      autoStartOrStopCarousal();
      return;
    }, 6000);
  } else {
    autoPlayButton.innerText = 'Start Auto Play';
    timerDisplay.innerText = '';
  }
}

function init() {
  updateCarousalImage(currentImageIndex);
  loadCarouselNav();
  updateCarouselNav(currentImageIndex);
}

init();

nextButton.addEventListener('click', function (e) {
  let previousImageIndex = currentImageIndex;
  currentImageIndex = (currentImageIndex + 1) % totalImages;

  updateCarousalImage(currentImageIndex);
  updateCarouselNav(currentImageIndex, previousImageIndex);
});

prevButton.addEventListener('click', function (e) {
  const previousImageIndex = currentImageIndex;
  currentImageIndex =
    currentImageIndex == 0 ? totalImages - 1 : currentImageIndex - 1;
  updateCarousalImage(currentImageIndex);
  updateCarouselNav(currentImageIndex, previousImageIndex);
});

autoPlayButton.addEventListener('click', function (e) {
  isAutoStart = !isAutoStart;
  autoStartOrStopCarousal();
});
