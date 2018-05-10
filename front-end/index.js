document.addEventListener("DOMContentLoaded", function(){

  const headerDiv = document.getElementById('header')
  const chooseSongDiv = document.getElementById('choose-song')
  const lyricContainer = document.getElementById('lyric-container')
  const song = document.getElementById('audio')
  const video = document.getElementById('video')
  const strikesDiv = document.getElementById('strikes')
  const scoreDiv = document.getElementById("score-div")
  const pressStart = document.getElementById('press-start')
  const chooseSongH2 = document.getElementById('choose-song-h2')
  const roarH2 = document.getElementById('choose-roar')
  const everlongH2 = document.getElementById('choose-everlong')
  const wonderfulWorldH2 = document.getElementById('choose-wonderful-world')
  const gangsterH2 = document.getElementById('choose-gangster')
  const scoreBox = document.getElementById('score-div')
  const scoreArea = document.getElementById("score")
  const highScoreArea = document.getElementById("high-score")
  const strikeBox = document.getElementById('strikes')
  const strikesCount = document.getElementById("strikesP")
  const highScoreBox = document.getElementById('highscore-div')
  const usernameForm = document.getElementById('username-form')
  const usernameInput = document.getElementById('username-input')

  let counter = -1
  let gameOver = false
  let currentScore
  let strikes
  let thisSong
  let lyrics
  let delay
  let username

  usernameInput.focus()
  usernameForm.addEventListener('submit', submitUsername)

  function submitUsername(event){
    event.preventDefault()
    username = usernameInput.value
    songMenu()
  }

  function songMenu(){
    header.classList.add('hidden')
    pressStart.classList.add('hidden')
    chooseSongDiv.classList.remove('hidden')
    document.addEventListener('keydown', menuSelect)
  }

  function menuSelect(event){
    const array = [wonderfulWorldH2, everlongH2, roarH2, gangsterH2]
    const mp3Src = ['mp3s/what-a-wonderful-world.mp3', 'mp3s/everlong.mp3', 'mp3s/Roar.mp3', 'mp3s/gangster.mp3']
    const currentTimeArr = [6, 34, 66, 63]

    // if user presses down
    if(event.which === 40){
      if(counter > 2){
        return
      }
      else if(counter === -1){
        counter += 1
        array[counter].classList.add('song-select')
        song.src = mp3Src[counter]
        song.currentTime = currentTimeArr[counter];
        song.play()
      }
      else {
        array[counter].classList.remove('song-select')
        song.pause()
        counter += 1

        array[counter].classList.add('song-select')
        song.src = mp3Src[counter]
        song.currentTime = currentTimeArr[counter];
        song.play()
      }
    }
    // if user presses up
    else if(event.which === 38){
      if(counter < 1){
        return
      }
      else {
      array[counter].classList.remove('song-select')
      song.pause()
      counter -= 1

      array[counter].classList.add('song-select')
      song.src = mp3Src[counter]
      song.currentTime = currentTimeArr[counter];
      song.play()
      }
    }
    else if(event.which === 13){
      if(!array[counter]){
        return
      }

      song.pause()
      array[counter].classList.remove('song-select')
      document.removeEventListener('keydown', menuSelect)
      chooseSong(array[counter].id)
    }
  }

  function chooseSong(id){
    if(id === 'choose-roar'){
      video.src = 'video/Roar.mp4'
      song.src = 'mp3s/Roar.mp3'
      lyrics = lyricStore.filter((object) => object.song_id === 1)
      thisSong = songStore.find((object) => object.id === 1)
      delay = 19500

    }
    else if(id === 'choose-everlong'){
      video.src = 'video/everlong.mp4'
      song.src = 'mp3s/everlong.mp3'
      lyrics = lyricStore.filter((object) => object.song_id === 4)
      thisSong = songStore.find((object) => object.id === 4)
      delay = 34000
    }
    else if(id === 'choose-wonderful-world'){
      video.src = 'video/what-a-wonderful-world.mp4'
      song.src = 'mp3s/what-a-wonderful-world.mp3'
      lyrics = lyricStore.filter((object) => object.song_id === 2)
      thisSong = songStore.find((object) => object.id === 2)
      delay = 6020
    }
    else if(id === 'choose-gangster'){
      video.src = 'video/gangster.mp4'
      song.src = 'mp3s/gangster.mp3'
      lyrics = lyricStore.filter((object) => object.song_id === 3)
      thisSong = songStore.find((object) => object.id === 3)
      delay = 26200
    }

    chooseSongDiv.classList.add('hidden')
    pressStart.innerHTML = "<h2>Press Enter To Play Song <br/><br/> You get a strike when you miss a lyric!</h2>"
    pressStart.classList.remove('hidden')
    document.addEventListener('keydown', startGame)
  }

  function startGame(event){
    if(event.which === 13){
      document.removeEventListener('keydown', startGame)
      chooseSongDiv.classList.add('hidden')
      pressStart.classList.add('hidden')
      lyricContainer.innerHTML = ''

      strikes = 0
      currentScore = 0
      renderStrikes()
      renderScore()
      renderHighScore()
      strikeBox.classList.remove('hidden')
      scoreBox.classList.remove('hidden')
      highScoreBox.classList.remove('hidden')

      video.classList.remove('hidden')
      video.addEventListener('ended', finishGame, { once: true })
      document.addEventListener('keydown', typing, false)
      song.currentTime = 0;
      video.currentTime = 0;
      song.play()
      video.play()
      setTimeout(displayLyrics, delay)
    }
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

  function tallyStrikes(){
    let array = lyricContainer.querySelectorAll('span')
    let length = lyricContainer.querySelectorAll('span').length - 1
    let last = array[length]
    if (last){
      if (!last.classList.contains("bg")){
        strikes +=1
        renderStrikes()
        if (strikes === 10){
          document.removeEventListener('keydown', typing, false)
          gameOver = true
          finalScore()
          song.pause()
          video.pause()
          strikesCount.innerText = "Strike 10! YOU LOSE!  (You clearly don't know good music...)"
          chooseSongDiv.classList.remove('hidden')

          // this counter is for the song select menu
          counter = -1
          document.addEventListener('keydown', menuSelect)
        }
      }
    }
  }

  function renderStrikes(){
    strikesCount.innerText = `${strikes}`
  }

   function tallyScore(){
      currentScore += 1
      renderScore()
   }

   function renderScore(){
      scoreArea.innerText = `${currentScore}`
   }

  function finalScore(){
      if (gameOver === true && currentScore > thisSong.score){
        thisSong.score = currentScore
        thisSong.username = username
        thisSong.sendScore()
        renderHighScore()
      }
    }

  function renderHighScore(){
    highScoreArea.innerText = `${thisSong.username} - ${thisSong.score}`
  }

  function finishGame(){
    audio.pause()
    gameOver = true
    finalScore()
    chooseSongDiv.classList.remove('hidden')

    // this counter is for the song select menu
    counter = -1
    document.addEventListener('keydown', menuSelect)
  }

})

Song.getSongs()
Lyric.getLyrics()
