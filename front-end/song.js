const songStore = []

class Song {
  constructor(object){
    this.id = object.id
    this.name = object.name
    this.duration = object.duration

    if(object.score){
      this.score = object.score
    }
    else {
      this.score = 0
    }

    songStore.push(this)
  }

  static getSongs(){
    fetch('http://localhost:3000/api/v1/songs')
    .then(response => response.json())
    .then(data => {
      data.forEach((object) => {
        new Song(object)
      })
    })
  }


  static sendScore(idNum, score){
    console.log(score)
    console.log(idNum)
    fetch(`http://localhost:3000/api/v1/songs/${idNum}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({score: `${score}`})
  }).then(res=>res.json())
  .then(res => console.log(res))
  }



}