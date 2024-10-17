const songsNames = ['Open Sky', 'Runaway', 'Super Computer', 'Traveling With You', 'Aaraam', 'Bark Technology', 'Human'];
let songNumber = 0;
const songName = document.querySelector('.song-name');
songName.innerHTML = songsNames[songNumber];

const song = document.getElementById('song-audio');

const songAudio = document.querySelector('#song-audio source');
songAudio.src = `Media/${songName.innerHTML}.mp3`;

const songProgress = document.getElementById('progress');

song.onloadedmetadata = () => {
    songProgress.max = song.duration;
    songProgress.value = song.currentTime;
    progress.setAttribute('data-duration', formateNumberToTime(song.duration));
    progress.setAttribute('data-current-time', formateNumberToTime(0));
    songProgress.addEventListener('input', () => {
        song.currentTime = songProgress.value;
        songProgress.value = song.currentTime;
    });
    song.addEventListener('timeupdate', () => {
        songProgress.value = song.currentTime;
        progress.setAttribute('data-current-time', formateNumberToTime(song.currentTime));
        // Change Progress Bg-Color
        let progressPercentage = (song.currentTime / song.duration) * 100;
        progress.style.backgroundImage = `linear-gradient(to right, var(--main-color) 0%, var(--main-color) ${progressPercentage}%, lightgray ${progressPercentage}%, lightgray 100%)`;
    });
}

function formateNumberToTime(num) {
    let hours = Math.floor(num / 3600);
    let minutes = Math.floor(num / 60);
    let seconds = Math.floor(num % 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// control buttons
const backwardBtn = document.getElementById('ctrl-icon-backward');
const playPauseBtn = document.getElementById('ctrl-icon-play-pause');
const forwardBtn = document.getElementById('ctrl-icon-forward');

// Control Buttons Functionalities
playPauseBtn.addEventListener('click', () => {
    if (song.paused) {
        song.play();
        song.loop = true;
        playPauseBtn.children[0].classList.remove('fa-play');
        playPauseBtn.children[0].classList.add('fa-pause');
    } else {
        song.pause();
        playPauseBtn.children[0].classList.remove('fa-pause');
        playPauseBtn.children[0].classList.add('fa-play');
    }
})

backwardBtn.addEventListener('click', () => {
    songNumber = songNumber === 0 ? 6 : songNumber - 1;
    reloadSongAndPlay();
})

forwardBtn.addEventListener('click', () => {
    songNumber = songNumber === 6 ? 0 : songNumber + 1;
    reloadSongAndPlay();
})

function reloadSongAndPlay() {
    songName.innerHTML = songsNames[songNumber];
    songAudio.src = `Media/${songName.innerHTML}.mp3`;
    playPauseBtn.children[0].classList.remove('fa-play');
    playPauseBtn.children[0].classList.add('fa-pause');
    song.load();
    song.play();
    song.loop = true;
}
