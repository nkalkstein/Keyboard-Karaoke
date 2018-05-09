document.addEventListener("DOMContentLoaded", function(){

  const startSong = document.getElementById('start-song')
  const chooseSongDiv = document.getElementById('choose-song')
  const lyricContainer = document.getElementById('lyric-container')
  const song = document.getElementById('audio')
  const video = document.getElementById('video')
  const strikesDiv = document.getElementById('strikes')
  const scoreDiv = document.getElementById("score-div")
  let currentScore = 0
  let strikes = 0
  let gameOver = false
  let thisSong
  let thisSongId 
  let highScore
  let videoSrc
  let songSrc
  let lyrics
  let delay

  chooseSongDiv.addEventListener('click', chooseSong)

  function chooseSong(event){
    if(!event.target.id){
      return
    }

    if(event.target.id === 'choose-roar'){
      videoSrc = 'video/Roar.mp4'
      songSrc = 'mp3s/Roar.mp3'
      lyrics = lyricStore.filter((object) => object.song_id === 1)
      thisSong = songStore.find((object) => object.id === 1)
      thisSongId = thisSong.id
      highScore = thisSong.score
      delay = 19500
    }
    else if(event.target.id === 'choose-everlong'){
      videoSrc = 'video/everlong.mp4'
      songSrc = 'mp3s/everlong.mp3'
      lyrics = lyricStore.filter((object) => object.song_id === 4)
      thisSong = songStore.find((object) => object.id === 4)
      thisSongId = thisSong.id
      highScore = thisSong.score
      delay = 34000
    }

    chooseSongDiv.classList.add('hidden')
    startSong.classList.remove('hidden')
    startSong.addEventListener('click', startGame)
  }

  function startGame(){
    strikeBox()
    scoreBox()
    startSong.innerText = ''
    lyricContainer.innerHTML = ''
    video.src = videoSrc
    song.src = songSrc



    video.classList.remove('hidden')
    document.addEventListener('keydown', typing, false)
    song.currentTime = 0;
    video.currentTime = 0;
    song.play()
    video.play()
    setTimeout(displayLyrics, delay)
  }

  function displayLyrics(){
    let n = 0
    let duration = 0
    gameOver = false

    function displayLine(){
      if(lyrics[n] && !gameOver){
        const words = document.createElement('p')

        // build the words with span elements around the letters
        for (let i = 0; i < lyrics[n].content.length; i++) {
          const span = document.createElement("span");
          span.classList.add("span");
          span.innerHTML = lyrics[n].content[i];
          words.appendChild(span);
        }

        tallyStrikes()
        lyricContainer.innerHTML = words.innerHTML
        duration = lyrics[n].duration * 1000
        n++
        setTimeout(displayLine, duration)

      }
    }

    displayLine()

  }

  function typing(event) {
    const spans = document.querySelectorAll('.span');
    const typed = String.fromCharCode(event.which);

    for (let i = 0; i < spans.length; ++i) {
        if (spans[i].classList.contains("bg")) { // if it already has class with the bg color then check the next one
          continue;
        } else if (!spans[i].classList.contains("bg") && !spans[i-1] || spans[i-1].classList.contains("bg")) {

          if (spans[i].innerHTML.toLowerCase() === typed.toLowerCase()) {
            spans[i].classList.add("bg");
            tallyScore()
        }
      }
    }
  }

  function strikeBox(){
    strikesDiv.innerHTML = `<h3>Ten Strikes and You're Out</h3>
                            <p> Strikes:  </p>
                            <p id= strikesP>  ${strikes} </p>`
  }


  function tallyStrikes(){
    let lyricContainer = document.getElementById('lyric-container')
    let array = lyricContainer.querySelectorAll('span')
    let length = lyricContainer.querySelectorAll('span').length - 1
    let last = array[length]
    if (last){
      if (!last.classList.contains("bg")){
        strikes +=1
        renderStrikes()
        if (parseInt(document.getElementById("strikesP").innerText)  === 10){
          document.removeEventListener('keydown', typing, false)
          gameOver = true
          finalScore()
          song.pause()
          video.pause()
          document.getElementById("strikesP").innerText = "Strike 10! YOU LOSE!  (You clearly don't know good music...)"
          chooseSongDiv.classList.remove('hidden')
          chooseSongDiv.addEventListener('click', chooseSong)
        }
      }
    }
  }

  function renderStrikes(){
    document.getElementById("strikesP").innerText = `${strikes}`


  }

   function scoreBox(){
      scoreDiv.innerHTML =`<p> Your score: </p>
      <p id= "score" >  ${currentScore} </p>
      <p> High Score: </p>
      <p id="high-score"> ${highScore} </p>`
   }

   function tallyScore(){
      scoreArea = document.getElementById("score")
      currentScore += 1
      renderScore()
   }

   function renderScore(){
      document.getElementById("score").innerText = `${currentScore}`

   }

  function finalScore(){
    console.log("currentScore")
      if (gameOver === true && (`${currentScore}` > `${highScore}`)){
        Song.sendScore(`${thisSongId}`, `${currentScore}`)
        highScore = `${currentScore}` 
        renderHighScore()
      }
    }


  function renderHighScore(){
    document.getElementById("high-score").innerText = `${highScore}`
  }
})

Song.getSongs()
Lyric.getLyrics()
