import i18Obj from "./translate.js";

let lang = "en";
let theme = "dark";

const elementList = document.querySelectorAll(".portfolio-btn .button-black");
const actives = document.getElementsByClassName("active");

elementList[elementList.length - 1].classList.add("active");

const portfolioImages = document.querySelectorAll(".portfolio-image");

for (let i = 0; elementList.length > i; i++) {
  elementList[i].onclick = function (event) {
    let currentActive = event.target;
    if (actives.length > 0) actives[0].classList.remove("active");
    if (currentActive) currentActive.classList.add("active");
    portfolioImages.forEach(
      (img, index) =>
        (img.src = `./assets/img/${currentActive.dataset.season}/${
          index + 1
        }.jpg`)
    );
  };
}

const seasons = ["winter", "spring", "summer", "autumn"];
seasons.map((newSeason) => {
  for (let i = 1; i <= 6; i++) {
    const img = new Image();
    img.src = `./assets/img/${newSeason}/${i}.jpg`;
  }
});

const elemLanguage = document.querySelectorAll(".language");
const activesLanguage = document.getElementsByClassName("activeLanguage");

for (let j = 0; elemLanguage.length > j; j++) {
  elemLanguage[j].onclick = function (eventLag) {
    let languageAct = eventLag.target;

    if (activesLanguage.length > 0)
      activesLanguage[0].classList.remove("activeLanguage");
    if (languageAct) languageAct.classList.add("activeLanguage");
    getTranslate(languageAct.dataset.language);
  };
}

function getTranslate(language) {
  lang = language;
  let langEn = document.querySelectorAll("[data-i18]");
  langEn.forEach(function (item, i, langEn) {
    item.textContent = i18Obj[language][item.dataset.i18];
  });
}

const hamburger = document.querySelector(".hamburger");
const AllMenu = document.querySelector(".nav");
function toggleMenu() {
  hamburger.classList.toggle("open");
  AllMenu.classList.toggle("nav-is-active");
}
hamburger.addEventListener("click", toggleMenu);

const nav_item = document.getElementsByClassName("nav-item");
for (let i = 0; nav_item.length > i; i++) {
  nav_item[i].onclick = function (event) {
    hamburger.classList.remove("open");
    AllMenu.classList.remove("nav-is-active");
  };
}

const newLightActive = [
  document.querySelectorAll(".main"),
  document.querySelectorAll(".line"),
  document.querySelectorAll(".section-title"),
  elementList,
];

const lightTheme = document.querySelector(".light-theme");
const logoSun = document.querySelector(".moon");

let themeMoon = document.getElementsByClassName("themeMoon");

function toggleLight() {
  if (themeMoon.length > 0) {
    DarkTheme();
  } else {
    logoSun.src = "./assets/scg/sun.svg";
    lightTheme.classList.toggle("themeMoon");

    theme = "light";

    newLightActive.forEach((element) => {
      for (let i = 0; element.length > i; i++) {
        element[i].classList.toggle(element[i].classList[0] + "-moon");
      }
    });
  }
}

function DarkTheme() {
  logoSun.src = "./assets/scg/moon.svg";
  lightTheme.classList.toggle("themeMoon");

  theme = "dark";

  newLightActive.forEach((element) => {
    for (let i = 0; element.length > i; i++) {
      let lastClass = element[i].classList.length - 1;
      let nameForDel = element[i].classList[lastClass];
      element[i].classList.toggle(nameForDel);
    }
  });
}

lightTheme.addEventListener("click", toggleLight);

function setLocalStorage() {
  localStorage.setItem("lang", lang);
  localStorage.setItem("theme", theme);
}
window.addEventListener("beforeunload", setLocalStorage);

let languageItem = document.querySelectorAll(".language-item");

function getLocalStorage() {
  if (localStorage.getItem("lang")) {
    lang = localStorage.getItem("lang");
    if (lang == "ru") {
      getTranslate(lang);
      for (let j = 0; languageItem.length > j; j++) {
        languageItem[j].classList.toggle("activeLanguage");
      }
    }
  }
  if (localStorage.getItem("theme")) {
    theme = localStorage.getItem("theme");
    if (theme == "light") {
      toggleLight();
    }
  }
}

window.addEventListener("load", getLocalStorage);


const video = document.querySelector('.video');
const buttonPlay = document.querySelector('.play-icon');
const buttonPlayBig = document.querySelector('.button-video');
const playProgress = document.querySelector('.play-progress');

video.poster = "assets/img/video-player.jpg";

function videoPlay() {
  if (buttonPlay.classList.contains('pause-icon')) {
    video.pause();
    buttonPlayBig.classList.toggle('button-none');
    buttonPlay.classList.remove('pause-icon');
   /* alert('');*/
  } else {
      video.play();
      buttonPlayBig.classList.toggle('button-none');
      buttonPlay.classList.add('pause-icon');
      if (playProgress.max != video.duration) {
      playProgress.max = video.duration;}
  }
}
 

buttonPlay.addEventListener('click', videoPlay);
buttonPlayBig.addEventListener('click', videoPlay);
video.addEventListener('click', videoPlay);

function playChange() {
  video.currentTime = playProgress.value;
  video.play();
  if (playProgress.max != video.duration) {
  playProgress.max = video.duration;
  }
}

playProgress.addEventListener('change', playChange);


let timeZero = document.querySelector('.time');
let timeFinal = document.querySelector('.all-time');

video.currentTime = 0;
playProgress.value = 0;

/*alert(video.duration);

timeFinal.textContent = video.duration;*/

function ToMormatTime(sec){
  if (sec < 10){
    sec = '0'+ String(sec); 
  }
return sec;
}


function forTimeChange (sec) {
  let hours = Math.floor(sec / 60 / 60);
  let minutes = Math.floor(sec / 60) - (hours * 60);
  let seconds = Math.floor(sec % 60);
  return ToMormatTime(minutes) + ':' + ToMormatTime(seconds);
}


video.addEventListener('timeupdate', function () {

    playProgress.value = video.currentTime;
    timeZero.textContent = forTimeChange(video.currentTime);
    playProgress.style.background = 'linear-gradient(to right, rgb(189, 174, 130) 0%, rgb(189, 174, 130)'+ video.currentTime/video.duration*100 +'%, rgb(200, 200, 200) '+ video.currentTime/video.duration*100 +'%, rgb(200, 200, 200) 100%)';
}, false);
 

const volumeLevel = document.querySelector('.volume-progress');
const volumeImg = document.querySelector('.volume-icon');

volumeLevel.style.background = 'linear-gradient(to right, rgb(189, 174, 130) 0%, rgb(189, 174, 130)'+ 40 +'%, rgb(200, 200, 200) '+ 40 +'%, rgb(200, 200, 200) 100%)';

function volumeChange() {
  video.volume = volumeLevel.value / 100;
  volumeLevel.style.background = 'linear-gradient(to right, rgb(189, 174, 130) 0%, rgb(189, 174, 130)'+ video.volume*100 +'%, rgb(200, 200, 200) '+ video.volume*100 +'%, rgb(200, 200, 200) 100%)';
  if (video.volume == 0) {
     volumeImg.classList.add('volume-none');
  } else {
    volumeImg.classList.remove('volume-none');
    video.muted = false;
  }
}

function noMute() {
  if (video.muted) {
    video.muted = false;
    volumeImg.classList.remove('volume-none');
  } else {
    video.muted = true;
    volumeImg.classList.add('volume-none');
  }
}

  volumeLevel.addEventListener('change',volumeChange);
  volumeImg.addEventListener('click', noMute);



console.log(
  "Оценка по пунктам: 70 (10+10+10+10+10+10+10)\
    Вёрстка +10 \
      вёрстка видеоплеера: есть само видео, в панели управления есть кнопка Play/Pause, прогресс-бар, кнопка Volume/Mute, регулятор громкости звука +5 \
      в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5 \
    Кнопка Play/Pause на панели управления +10 \
      при клике по кнопке Play/Pause запускается или останавливается проигрывание видео +5 \
      внешний вид и функционал кнопки изменяется в зависимости от того, проигрывается ли видео в данный момент +5 \
    Прогресс-бар отображает прогресс проигрывания видео. При перемещении ползунка прогресс-бара вручную меняетс время проигрывания видео. Разный цвет прогресс-бара до и после ползунка +10 \
    При перемещении ползунка регулятора громкости звука можно сделать звук громче или тише. Разный цвет регулятора громкости звука до и после ползунка +10 \
    При клике по кнопке Volume/Mute можно включить или отключить звук. Одновременно с включением/выключением звука меняется внешний вид кнопки. Также внешний вид кнопки меняется, если звук включают или выключают перетягиванием регулятора громкости звука от нуля или до нуля +10 \
    Кнопка Play/Pause в центре видео +10 \
      есть кнопка Play/Pause в центре видео при клике по которой запускается видео и отображается панель управления +5 \
      когда видео проигрывается, кнопка Play/Pause в центре видео скрывается, когда видео останавливается, кнопка снова отображается +5 \
    Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10 \
    высокое качество оформления приложения предполагает собственное оригинальное оформление равное или отличающееся в лучшую сторону по сравнению с демо"
);
