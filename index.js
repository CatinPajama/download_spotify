const axios = require('axios');

const id = ""; // put your playlist id here
const API_KEY = "" // put your api key which you can get from https://apilayer.com



const url = `https://api.apilayer.com/spotify/playlist_tracks?id=${id}`;
const { exec } = require('node:child_process')
const dir = "~/Documents"



const youtube_download = (songName) => {
  const command = `yt-dlp "ytsearch1:${songName}" --no-playlist --extract-audio --audio-format mp3 -o "${dir}/%(title)s.%(ext)s"`
  console.log(`Downloading ${songName}.....`)
  exec(command, (e,_) => {
    if (e) {
      console.log(`Could not download ${songName} from youtube`)
      return;
    }
    console.log(`Successfully downloaded ${songName}`)
  })
}

const request_spotify_api = async () => {
  const res = await axios.get(url,{
    headers : {
      apikey : API_KEY
    }
  })
  const songsMeta = res["data"]["tracks"]["items"];
  for(let i = 0; i < songsMeta.length; i++) {
    let songName = songsMeta[i]["track"]["name"];
    const artists = songsMeta[i]["track"]["album"]["artists"];

    for(let j = 0; j < artists.length; j++) {
      songName += ` ${artists[j]["name"]}`;
    }
    youtube_download(songName);
  }
}

request_spotify_api();
