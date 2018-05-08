document.addEventListener("DOMContentLoaded", function(){

  const startSong = document.getElementById('start-song')
  const lyricContainer = document.getElementById('lyric-container')
  const song = document.getElementById('audio')

  startSong.addEventListener('click', function(){
    startSong.innerText = ''
    lyricContainer.addEventListener('keydown', typing, false)
    song.play()
    setTimeout(displayLyrics, 5600)
  })

  function displayLyrics(){
    let n = 0
    let duration = 0

    function displayLine(){
      // this is where we check the text and minus a point for failed attempts
      // document.removeEventListener("keydown", typing, false);

      if(lyricStore[n]){
        lyricContainer.innerText = lyricStore[n].content
        // lyricContainer.addEventListener('keydown', typing, false)
        duration = lyricStore[n].duration * 1000
        n++
        setTimeout(displayLine, duration)
      }
    }

    displayLine()

  }

  function typing(event) {
		const typed = String.fromCharCode(event.which);
    const lyricText = lyricContainer.innerText
		for (let i = 0; i < lyricsLength.length; i++) {
			if (lyricText[i].innerHTML === typed) { // if typed letter is the one from the word
				if (lyricText[i].classList.contains("bg")) { // if it already has class with the bg color then check the next one
					continue;
				} else if (lyricText[i].classList.contains("bg") === false && lyricText[i-1] === undefined || lyricText[i-1].classList.contains("bg") !== false ) {
          // if it doesnt have class, if it is not first letter or if the letter before it doesnt have class
          // (this is done to avoid marking the letters who are not in order for being checked,
          // for example if you have two "A"s so to avoid marking both of them)
					lyricText[i].classList.add("bg");
					break;
				}
			}
		}
  }

  Song.getSongs()
  Lyric.getLyrics()

})
