// const { WindowSharp, ChromeReaderMode } = require("@mui/icons-material");

function httpGet(theUrl,token) {
  let xmlHttpReq = new XMLHttpRequest();
  if (!theUrl){
    theUrl = "http://localhost:105/listGuitars/"
  } 
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


function checkArtist(titler){
 let specialGuitar;
 titler.toLowerCase();
 console.log(titler);
   

 console.log(httpGet('http://localhost:105/listCoolGuitars/',''));
 
 //{"skU_ID":"", "youtubeUrl":"", "spotifyId":""}
 const specialGuitars = JSON.parse(httpGet('http://localhost:105/listCoolGuitars/',''));
 const guitars = JSON.parse(httpGet('http://localhost:105/listGuitars/',''));
 console.log(specialGuitars);
 
 const spotifyIds = [];
 for(let i = 0; i < specialGuitars.length; i++) {
     let obj = specialGuitars[i];
     spotifyIds.push(obj.spotifyId.slice(0,22))
 }
 console.log(spotifyIds);
 
 const artistList= [];
 for(let i = 0; i < spotifyIds.length; i++) {
     let obj = getArtist(spotifyIds[i]);
     artistList.push(obj.album.artists[0].name.toLowerCase());
 }

 function gettoken(){
   let obj = JSON.parse(httpGet('http://localhost:105/spotify/',''))
   return obj.access_token
   } 

 console.log(artistList);
 function getArtist(songId) {
   const token = gettoken();
   const song = JSON.parse(httpGet('https://api.spotify.com/v1/tracks/'+songId,"Bearer "+token));
   return song;
 }

   for(let i = 0; i<artistList.length; i++){
     if (titler.toLowerCase().includes(artistList[i])){
       let obj = specialGuitars[i];
       console.log(obj.skU_ID);
       specialGuitar = guitars.find(guitar => guitar.skU_ID === obj.skU_ID);
       //somehow filter
       // chrome.action.openPopup();
       console.log(specialGuitar)
       console.log(specialGuitar.pictureMain)
     }
   }
   if (!specialGuitar){
     specialGuitar =""
   } 
   return specialGuitar;
}

async function getActiveTabURL() {
  const tabs = await chrome.tabs.query({
      currentWindow: true,
      active: true
  });

  return tabs[0];
}

async function getTab(){
  const activeTab = await getActiveTabURL();
  return activeTab;
}


const activeTab = getTab();
const titles = document.title;
console.log(titles);
const guitar = checkArtist(titles);
console.log(guitar);

if (guitar){
  window.alert('Hey! We have found a guitar that might interest you, click on the extension to view it.')
  // chrome.action.setIcon({ path: "assets/pick_tilt.png" });
}
      


// export default{checkArtist} 

/**
 * 
 * const client_id = '59bba2356596401cbd8bf46071610dc7'; // Our client id
const client_secret = 'a556972fe6454b999a51a9b198828d93'; // Our secret


  */