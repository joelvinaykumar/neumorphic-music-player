let jsmediatags = window.jsmediatags;
var songTags = {};
let i = 0
var currentSong;
var currentSongName;
let favorites = []
let songsList = [
  "https://mp3teluguwap.net/mp3/2021/Pushpaka%20Vimanam/Kalyanam.mp3",
  "https://mp3teluguwap.net/mp3/2021/Shyam%20Singha%20Roy/Shyam%20Singha%20Roy%20(2021)/Rise%20of%20Shyam.mp3",
  "https://mp3teluguwap.net/mp3/2021/Pushpaka%20Vimanam/Swamy%20Ra%20Ra%20(Krishna%20Shabdam).mp3",
  "https://mp3teluguwap.net/mp3/2021/RRR/RRR%20-%20HQ/Nattu%20Nattu.mp3",
  "https://mp3teluguwap.net/mp3/2021/Khiladi/Khiladi%20-%20HQ/Atta%20Sudake.mp3",
]


let songInput = document.getElementById("file-input")
let songButton = document.getElementById("song-input")
let playButton = document.getElementById("play-btn")

let songTxt = document.getElementById("song")
let albumTxt = document.getElementById("album")
let artistTxt = document.getElementById("artist")
let songCard = document.getElementById("song-card")

// asynchronously extract meta data from a song
function extractMetaData(song) {
  return new Promise((resolve, reject) => {
    jsmediatags.read(song, {
        onSuccess: (tag) => {
          songTags = {...tag};
          let base64String = "";
          let { data, format } = tag.tags.picture;
          for (let i = 0; i < data.length; i++) {
            base64String += String.fromCharCode(data[i]);
          }
          let imageUri = `data:${format};base64,${window.btoa(base64String)}`;
          resolve({
            ...songTags.tags,
            imageUri
          })
        }, 
        onError: (error) => {
          reject(error);
        }
      });
  })
}

// Set current context of the song
async function setCurrentSong(url) {
  if(i < songsList.length){
    if(currentSong && !currentSong.paused) {
      currentSong.pause()
    }
    const data = await extractMetaData(url)
    songTxt.innerText = data.title
    albumTxt.innerText = data.album
    artistTxt.innerText = data.artist
    songCard.style.backgroundImage = `url(${data.imageUri})`
    currentSong = new Audio(url)
    currentSongName = data.title
    currentSong.play()
    // Play for 30 seconds and stop
    setTimeout(() => currentSong.pause(), 30*1000)
  } else {
    alert("End of List");
  }
}

// Add to favorites
function addToFavorites() {
  if(i === 0 && currentSong === undefined) {
    alert("Nothing to play")
  } else {
    favorites.push(currentSongName)
    var ul = document.getElementById("songs-list");

    for(let i=0; i< favorites.length; i++) {
      var li = document.createElement("li");
      li.className = "song-item"
      li.appendChild(document.createTextNode(favorites[i]));
    }
    ul.appendChild(li)
    dismiss()
  }
}

// Dismiss the song
function dismiss(){
  if(i === 0 && currentSong === undefined) {
    alert("Nothing to play")
  } else {
    i = i+1
    setCurrentSong(songsList[i])
  }
}
  
//  Start the program
async function run() {
  try {
    setCurrentSong(songsList[i])
  } catch (error) {
    console.error(error.message)
  }
}

run()