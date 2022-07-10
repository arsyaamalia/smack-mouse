const tanah = document.querySelectorAll(".tanah");
const tikus = document.querySelectorAll(".tikus");
const bom = document.querySelectorAll(".bom");
const papanSkor = document.querySelector(".papanskor");
const papantimer = document.querySelector(".timer");
const dug = document.querySelector("#dug");
const tet = document.querySelector("#tet");
const bgmtimer = document.querySelector("#bgmtimer");
const gameover = document.querySelector("#gameover");
const gamewin = document.querySelector("#gamewin");
const lvl = document.querySelector(".level-span").textContent;
const overlay1 = document.querySelector(".overlay-home");
const overlay2 = document.querySelector(".overlay-ready");
const overlay3 = document.querySelector(".overlay-nextlevel");
const overlay4 = document.querySelector(".overlay-gameover");
const overlay5 = document.querySelector(".overlay-winner");
const countdown = document.querySelector(".ready-countdown");

let count = countdown.textContent;
let ready = false;
let timer;
let timerjalan;
let tanahsebelum;
let finish;
let skor;
let trtikus;
let trbom;

if (lvl == 1) {
  timer = 15;
} else if (lvl == 2) {
  timer = 20;
} else timer = 30;
timerjalan = timer;

function playSmack() {
  console.log("berhasil masuk overlay");
  overlay1.style.display = "none";
  start();
}

function nextSmack() {
  console.log("berhasil masuk overlay next");
  overlay3.style.display = "none";
  start();
}

function retrySmack() {
  console.log("berhasil masuk overlay retry");
  overlay4.style.display = "none";
  ready = false;
  count = 3;
  countdown.textContent = count;
  start();
}

function backSmack() {
  console.log("berhasil masuk overlay back");
  overlay5.style.display = "none";
  window.location.replace("level1.html");
}

// function random tanah buat muncul
function randomTanah(tanah) {
  const t = Math.floor(Math.random() * tanah.length);
  const tRandom = tanah[t];

  if (tRandom == tanahsebelum) {
    randomTanah(tanah);
  }
  tanahsebelum = tRandom;
  return tRandom;
}

// random waktu untuk tikus balik tanah lagi
function randomWaktu(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

// untuk memunculkan tikus
// tr=tanah random, tw= tikus waktu
function munculTikus() {
  trtikus = randomTanah(tanah);
  let twtikus;
  // kalau mau cepet, dikurangin waktunya lebih lagi
  if (lvl == 1) {
    twtikus = randomWaktu(1200, 1500);
  } else if (lvl == 2) {
    twtikus = randomWaktu(900, 1200);
  } else {
    twtikus = randomWaktu(600, 900);
  }
  if (trtikus != trbom) {
    trtikus.classList.add("muncul");
  }

  // biar tikus ngilang
  setTimeout(() => {
    trtikus.classList.remove("muncul");
    if (!finish) {
      munculTikus();
    }
  }, twtikus);
}

// untuk memunculkan bom
function munculBom() {
  trbom = randomTanah(tanah);
  let twbom;
  // kalau mau cepet, dikurangin waktunya lebih lagi
  if (lvl == 1) {
    twbom = randomWaktu(1500, 1800);
  } else if (lvl == 2) {
    twbom = randomWaktu(1200, 1500);
  } else {
    twbom = randomWaktu(900, 1200);
  }
  if (trtikus != trbom) {
    trbom.classList.add("bum");
  }
  // biar bom ngilang
  setTimeout(() => {
    trbom.classList.remove("bum");
    if (!finish) {
      munculBom();
    }
  }, twbom);
}

function runGame() {
  do {
    munculTikus();
    munculBom();
    duration();
  } while (finish == true);
}

function selesai() {
  console.log("selesai?" + finish);
  trbom.classList.remove("bum");
  trtikus.classList.remove("muncul");
  // overlay1--play
  // overlay2--ready
  // overlay3--nextlevel
  // overlay4--gameover
  // overlay5--winner
  if (lvl == 1) {
    if (skor > 6) {
        window.location.replace("level2.html");
        gamewin.play();
    } else {
      alert("SKOR BELUM MEMENUHI!");
      overlay4.style.display = "block";
      gameover.play();
    }
  } else if (lvl == 2) {
    if (skor > 12) {
        window.location.replace("level3.html");
        gamewin.play();
    } else {
      alert("SKOR BELUM MEMENUHI!");
      overlay4.style.display = "block";
      gameover.play();
    }
  } else {
    if (skor > 24) {
        overlay5.style.display = "block";
        gamewin.play();
    } else {
      alert("SKOR BELUM MEMENUHI!");
      overlay4.style.display = "block";
      gameover.play();
    }
  }
}

function start() {
  // game start
  finish = false;
  timerjalan = timer;
  skor = 0;
  papanSkor.textContent = 0;
  papantimer.textContent = timerjalan;
  // overlay countdown
  do {
    overlay2.style.display = "block";
    bgmtimer.play();
    setTimeout(() => {
      if (count > 0) {
        console.log(ready);
        count--;
        countdown.textContent = count;
        start();
      } else {
        ready = true;
        overlay2.style.display = "none";
        console.log(ready);
        runGame();
      }
    }, 1000);
  } while (ready == true);
}

function duration() {
  if (!finish) {
    console.log(timerjalan);
    setTimeout(() => {
      if (timerjalan > 0) {
        timerjalan--;
        papantimer.textContent = timerjalan;
        duration();
      } else {
        finish = true;
        alert("WAKTU HABIS!");
        selesai();
      }
    }, 1000);
  }
}
function smackTikus() {
  dug.play();
  if (lvl == 1) {
    skor++;
    papanSkor.textContent = skor;
  } else if (lvl == 2) {
    skor = skor + 2;
    papanSkor.textContent = skor;
  } else {
    skor = skor + 4;
    papanSkor.textContent = skor;
  }
  this.parentNode.classList.remove("muncul");
}

function smackBomb() {
  tet.play();
  this.parentNode.classList.remove("bum");
  finish = true;
  console.log(skor);
  overlay4.style.display = "block";
  gameover.play();
}

tikus.forEach((t) => {
  t.addEventListener("click", smackTikus);
});

bom.forEach((t) => {
  t.addEventListener("click", smackBomb);
});