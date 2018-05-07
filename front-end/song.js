class Song {
  constructor(object){
    this.id = object.id
    this.name = object.name
    this.duration = object.duration
  }

  static getSongs(){
    fetch('http://localhost:3000/api/v1/songs')
    .then(response => response.json())
    .then(data => console.log(data))
  }
}
