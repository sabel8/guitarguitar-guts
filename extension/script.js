/* https://developer.spotify.com/web-api/authorization-guide/#client_credentials_flow */
 console.log("I ran")


//  There is a problem with the CORS Access-Control-Allow-Origin - must be fixed with some header manipulation
function httpGet(theUrl,token) {
    let xmlHttpReq = new XMLHttpRequest();
    xmlHttpReq.open("GET", theUrl, false); 
    // xmlHttpReq.setRequestHeader("Accept", "application/json")
    // xmlHttpReq.setRequestHeader("Content-Type", "application/json")
    // xmlHttpReq.setRequestHeader("Access-Control-Allow-Origin", "*")
    if (token){
      xmlHttpReq.setRequestHeader("Authorization",token)
    }

    xmlHttpReq.send(null);
    return xmlHttpReq.responseText;
  }


// console.log(httpGet('https://services.guitarguitar.co.uk/WebService/api/hackathon/guitarswithsongs',''));

//{"skU_ID":"", "youtubeUrl":"", "spotifyId":""}
const specialGuitars = JSON.parse(httpGet('https://services.guitarguitar.co.uk/WebService/api/hackathon/guitarswithsongs',''));
// console.log(specialGuitars);

const spotifyIds = [];
for(let i = 0; i < specialGuitars.length; i++) {
    let obj = specialGuitars[i];
    spotifyIds.push(obj.spotifyId.slice(0,22))
}
// console.log(spotifyIds);

const artistList= [];
for(let i = 0; i < spotifyIds.length; i++) {
    let obj = getArtist(spotifyIds[i]);
    artistList.push(obj.album.artists[0].name);
}

console.log(artistList);
function getArtist(songId) {
  const song = JSON.parse(httpGet('https://api.spotify.com/v1/tracks/'+songId,"Bearer BQC30zPl-3aUh9S2NjUrVy2ncwtTJOjtZQAedpQwnZCZG6D3XqN6bNWwZ77V61y47HYB2ApXptPEHZtptcQXe1vdRatC3tq7a4YzcGGmkISkG8REgLtyOEM_5ZQqalwXdbFvKjVa7hZQCwTm_ZXCu5_OKECcgILgTobg-AR8kEQVzsbmEARwmU4-3FfD7Hk"));
  return song;
}

function checkArtist(){
  for(let i = 0; i<artistList.length; i++){
    if (document.title.includes(artistList[i])){
      let obj = specialGuitars[i];
      console.log(obj.skU_ID);
      //somehow filter
      chrome.action.openPopup();
    }
  }
}

checkArtist()

/**
 * 
 * const client_id = '59bba2356596401cbd8bf46071610dc7'; // Our client id
const client_secret = 'a556972fe6454b999a51a9b198828d93'; // Our secret


  */