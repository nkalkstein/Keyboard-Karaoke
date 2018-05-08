const songStore = []

class Song {
  constructor(object){
    this.id = object.id
    this.name = object.name
    this.duration = object.duration

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
}
