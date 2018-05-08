document.addEventListener("DOMContentLoaded", function(){

  const startSong = document.getElementById('start-song')
  const lyricContainer = document.getElementById('lyric-container')
  const song = document.getElementById('audio')

  startSong.addEventListener('click', function(){
    startSong.innerText = ''
    song.play()
    setTimeout(displayLyrics, 5600)
  })

  function displayLyrics(){
    let n = 0
    let duration = 0

    function displayLine(){
      // this is where we check the text and minus a point for failed attempts

      if(lyricStore[n]){
        const words = document.createElement('p')

        // build the words with span elements around the letters
        for (let i = 0; i < lyricStore[n].content.length; i++) {
          const span = document.createElement("span");
          span.classList.add("span");
          span.innerHTML = lyricStore[n].content[i];
          words.appendChild(span);
         }

         document.removeEventListener("keydown", typing, false);
         lyricContainer.innerHTML = words.innerHTML
         document.addEventListener('keydown', typing, false)
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

  Song.getSongs()
  Lyric.getLyrics()
  strikes()

})

function strikes(){
      let strikes= 0;
      strikesDiv = document.createElement("DIV")
      strikesDiv.id = "strikes"
      strikesDiv.innerHTML = `<h3>Ten Strikes and You are Out</h3>
                                <p> ${strikes} </p>`
    //   if (((document.getElementById('lyric-container').innerText)[(document.getElementById('lyric-container').innerText).length].className === "bg"){
    //             strikes++
    // }
    gameOver(strikes)

    function gameOver(strikes){
      if (strikes === 10){
        alert("Strike 10! YOU LOSE!  (You clearly don't know good music...)");
      }
    }
  }
