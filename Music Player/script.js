const musicContainer = document.getElementById("music-container");

const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");

// Song titles
const songs = ["hey", "summer", "ukulele"];

// Keep track of song
let songIndex = 2;


// Initially load song details into DOM
loadSong(songs[songIndex]);

function loadSong(song) {
  console.log(song);
  title.innerHTML = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

// let loadSong = song => {
//   console.log(song);
//   title.innerHTML = song;
//   audio.src = `music/${song}.mp3`;
//   cover.src = `images/${song}.jpg`;
// }


// Play Song 
const playSong = () => {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");

  audio.play();
} 

const pauseSong = () => {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  
  audio.pause();

}
// Next song
const nextSong = () => {
  songIndex++
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);
  playSong();
}

// Prev song
const prevSong = () => {
  songIndex--
  // console.log(songIndex);
  if(songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();

}


// Update progress bar
function updateProgress(event) {
  // console.log(event);
  const { duration, currentTime } = event.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`
}

// Set progress bar
function setProgress(event) {
  const width = this.clientWidth;
  const clickX = event.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

// Event Listeners
playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");
  if(isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
})

// Prev button
prevBtn.addEventListener("click", prevSong);
// Next button
nextBtn.addEventListener("click", nextSong);

// Time /song update
audio.addEventListener("timeupdate", updateProgress);
// Click on progress bar
progressContainer.addEventListener("click", setProgress)

// Song ends
audio.addEventListener("ended", nextSong);





