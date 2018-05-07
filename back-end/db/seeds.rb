data = {
  id: 1,
  name: "roar",
  duration: 270.0,
  lyrics:
  [
    { song_id: 1, start: 19.5, duration: 5.2, content: "I used to bite my tongue and hold my breath Scared to rock the boat and make a mess" },
    { song_id: 1, start: 24.7, duration: 5.3, content: "So I sat quietly, agreed politely" },
    { song_id: 1, start: 30.0, duration: 5.4, content: "I guess that I forgot I had a choice I let you push me past the breaking point" },
    { song_id: 1, start: 35.4, duration: 4.9, content: "I stood for nothing, so I fell for everything" },
    { song_id: 1, start: 47.0, duration: 5.0, content: "You held me down, but I got up Already brushing off the dust" },
    { song_id: 1, start: 52.0, duration: 5.8, content: "You hear my voice, you hear that sound Like thunder, gonna shake your ground" },
    { song_id: 1, start: 57.8, duration: 5.2, content: "You held me down, but I got up Get ready cause I've had enough" },
    { song_id: 1, start: 63.0, duration: 3.0, content: "I see it all, I see it now" },
    { song_id: 1, start: 66.0, duration: 4.5, content: "I got the eye of the tiger, a fighter," },
    { song_id: 1, start: 70.5, duration: 5.5, content: "dancing through the fire 'Cause I am a champion" },
    { song_id: 1, start: 76.0, duration: 8.0, content: "and you're gonna hear me roar Louder, louder than a lion" },
    { song_id: 1, start: 84.0, duration: 3.0, content: "Cause I am a champion" },
    { song_id: 1, start: 87.0, duration: 15.0, content: "and you're gonna hear me roar Oh oh oh oh oh oh You're gonna hear me roar" },
    { song_id: 1, start: 103.3, duration: 5.4, content: "Now I'm floating like a butterfly Stinging like a bee I earned my stripes" },
    { song_id: 1, start: 108.7, duration: 5.1, content: "I went from zero, to my own hero" },
    { song_id: 1, start: 113.8, duration: 5.2, content: "You held me down, but I got up Already brushing off the dust" },
    { song_id: 1, start: 119.0, duration: 5.0, content: "You hear my voice, your hear that sound Like thunder, gonna shake your ground" },
    { song_id: 1, start: 124.0, duration: 5.5, content: "You held me down, but I got up Get ready 'cause I've had enough" },
    { song_id: 1, start: 129.5, duration: 3.0, content: "I see it all, I see it now" },
    { song_id: 1, start: 132.5, duration: 4.5, content: "I got the eye of the tiger, a fighter," },
    { song_id: 1, start: 137.0, duration: 5.5, content: "dancing through the fire 'cause I am a champion" },
    { song_id: 1, start: 142.5, duration: 8.0, content: "and you're gonna hear me roar Louder, louder than a lion" },
    { song_id: 1, start: 150.5, duration: 3.0, content: "'cause I am a champion" },
    { song_id: 1, start: 153.5, duration: 21.5, content: "and you're gonna hear me roar Oh oh oh oh oh oh You're gonna hear me roar Oh oh oh oh oh oh" },
    { song_id: 1, start: 175.0, duration: 3.5, content: "You're gonna hear me roar" },
    { song_id: 1, start: 194.0, duration: 4.5, content: "I got the eye of the tiger, a fighter," },
    { song_id: 1, start: 198.5, duration: 5.5, content: "dancing through the fire 'Cause I am a champion" },
    { song_id: 1, start: 204.0, duration: 8.0, content:  "and you're gonna hear me roar Louder, louder than a lion" },
    { song_id: 1, start: 212.0, duration: 3.0, content: "'Cause I am a champion" },
    { song_id: 1, start: 215.0, duration: 21.0, content: "and you're gonna hear me roar Oh oh oh oh oh oh You're gonna hear me roar Oh oh oh oh oh oh" },
    { song_id: 1, start: 236.0, duration: 5.0, content: "You're gonna hear me roar" }
  ]
}

Song.create(id: data[:id], name: data[:name], duration: data[:duration])

data[:lyrics].each do |lyric_hash|
  Lyric.create(song_id: lyric_hash[:song_id], start: lyric_hash[:start], duration: lyric_hash[:duration], content: lyric_hash[:content])
end
