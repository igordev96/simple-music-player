const song0 = {
    name: "Stavo Pensando a Te",
    artist: "Mobrici",
    src: "./assets/songs/Canova feat Fulminacci -  Stavo Pensando a Te.mp3",
    cover: "url('../assets/songs/mobrici.jpg')"
}
const song1 = {
    name: "Coltellata",
    artist: "Gazzelle",
    src: "./assets/songs/Gazzelle - Coltellata.mp3",
    cover: "url('../assets/songs/coltellata.jpg')"
}
const song2 = {
    name: "Ragazza Magica",
    artist: "Jovanotti",
    src: "./assets/songs/Jovanotti - Ragazza magica.mp3",
    cover: "url('../assets/songs/jovanotti.jpg')"
}



let playlist = [song0, song1, song2];


let music = document.getElementsByTagName("audio")[0];
let play = document.getElementsByClassName("play")[0];
let img = document.getElementsByClassName("img")[0];
let previous = document.getElementsByClassName("previous")[0];
let next = document.getElementsByClassName("next")[0];
let title = document.getElementsByClassName("song")[0];
let source = document.getElementsByTagName("source")[0];
let slider = document.getElementById("musicTime");

let index = 0;


changeMusic(index);
img.style.animationPlayState = "paused"







play.addEventListener("click", playPause);

previous.addEventListener("click", previousMusic);

next.addEventListener("click", nextMusic);

slider.addEventListener("mousedown", () => {
    music.play();
    play.setAttribute("src","./assets/pause.png");
    img.style.animationPlayState = "running"
    slider.addEventListener("input", (e) => {
        music.currentTime = e.target.value});
    });



setInterval(hasEnded, 500);

setInterval(thumbPosition, 100);





function playPause(){
    let music = document.getElementsByTagName("audio")[0];
    if(music.paused){
        music.play();
        play.setAttribute("src","./assets/pause.png");
        img.style.animationPlayState = "running"
    } else {
        music.pause();
        play.setAttribute("src","./assets/play.png");
        img.style.animationPlayState = "paused"
    }
}

function previousMusic(){
    let music = document.getElementsByTagName("audio")[0];
    if(music.currentTime>=1 && music.paused){
        music.currentTime = 0;
        resetAnimation();
        img.style.animationPlayState = "paused"
    } else if(music.currentTime>=1 && music.paused==false){
        music.currentTime = 0;
        resetAnimation();
    }  else {
        if(index == 0){
            index = playlist.length-1;
        } else {
            index--;
        }
        resetAnimation();
        changeMusic(index);
        playPause();
    }
}

function nextMusic(){
    let music = document.getElementsByTagName("audio")[0];
    if(index==playlist.length-1){
        index=0;
    } else {
        index++;
    }
    resetAnimation();
    changeMusic(index);
    playPause();
}

function resetAnimation(){
    img.style.animation = 'none';
    img.offsetHeight;
    img.style.animation = null;
}

function changeMusic(i){
    let music = document.getElementsByTagName("audio")[0];
    title.innerHTML = playlist[i].name + "<br>" + playlist[i].artist;
    img.style.backgroundImage = playlist[i].cover;
    source.setAttribute("src",playlist[i].src);
    music.load();
}

function hasEnded(){
    if(music.ended){
        nextMusic();
    }
}

function thumbPosition(){
    slider.setAttribute("value", music.currentTime);
    slider.setAttribute("max",music.duration);
    slider.value = slider.getAttribute("value");
}