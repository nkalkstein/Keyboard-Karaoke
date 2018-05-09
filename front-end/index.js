document.addEventListener("DOMContentLoaded", function(){

  const startSong = document.getElementById('start-song')
  const lyricContainer = document.getElementById('lyric-container')
  const song = document.getElementById('audio')
  const video = document.getElementById('video')
  const strikesDiv = document.getElementById('strikes')
  let gameOver = false

  startSong.addEventListener('click', startGame)

  function startGame(){
    strikeBox()
    startSong.innerText = ''
    lyricContainer.innerHTML = ''
    video.classList.remove('hidden')
    document.addEventListener('keydown', typing, false)
    song.currentTime = 0;
    video.currentTime = 0;
    song.play()
    video.play()
    setTimeout(displayLyrics, 19500)
  }

  function displayLyrics(){
    let n = 0
    let duration = 0
    gameOver = false

    function displayLine(){
      if(lyricStore[n] && !gameOver){
        const words = document.createElement('p')

        // build the words with span elements around the letters
        for (let i = 0; i < lyricStore[n].content.length; i++) {
          const span = document.createElement("span");
          span.classList.add("span");
          span.innerHTML = lyricStore[n].content[i];
          words.appendChild(span);
        }

        tallyStrikes()
        lyricContainer.innerHTML = words.innerHTML
        duration = lyricStore[n].duration * 1000
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
        }
      }
    }
  }

  function strikeBox(){
    strikesDiv.innerHTML = `<h3>Ten Strikes and You are Out</h3>
                              <p id= strikesP> 0  </p>`
  }


  function tallyStrikes(){
    let lyricContainer = document.getElementById('lyric-container')
    let array = lyricContainer.querySelectorAll('span')
    let length = lyricContainer.querySelectorAll('span').length - 1
    let last = array[length]
    if (last){
      if (!last.classList.contains("bg")){
        document.getElementById("strikesP").innerText = parseInt(document.getElementById("strikesP").innerText) + 1
        if (parseInt(document.getElementById("strikesP").innerText)  === 10){
          document.removeEventListener('keydown', typing, false)
          gameOver = true
          song.pause()
          video.pause()
          document.getElementById("strikesP").innerText = "Strike 10! YOU LOSE!  (You clearly don't know good music...)"
          startSong.innerText = 'Replay?'
        }
      }
    }
  }


  Song.getSongs()
  Lyric.getLyrics()

})
