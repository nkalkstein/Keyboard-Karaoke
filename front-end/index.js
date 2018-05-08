document.addEventListener("DOMContentLoaded", function(){

  const startSong = document.getElementById('start-song')
  const lyricContainer = document.getElementById('lyric-container')
  
  startSong.addEventListener('click', function(){
    startSong.innerText = ''
    displayLyrics();
  })

  function displayLyrics(){
    let n = 0
    let duration = 0

    function displayLine(){
      // this is where we check the text and minus a point for failed attempts

      if(lyricStore[n]){
        lyricContainer.innerText = lyricStore[n].content
        duration = lyricStore[n].duration * 1000
        n++
        setTimeout(displayLine, duration)
      }
    }

    displayLine()

  }

  Song.getSongs()
  Lyric.getLyrics()

})
