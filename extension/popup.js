import { getActiveTabURL } from "./assistant.js"; 
// const { checkArtist } = require('./script.js'); 
window.onload = async () =>{
    const activeTab = await getActiveTabURL();
    const titles = activeTab.title;
    console.log(titles);
    
    const guitar = checkArtist(titles)
    console.log("guitar")
    console.log(guitar)
    if (guitar){
        document.getElementById("extensionName").innerHTML=guitar.itemName;
        document.getElementById("extensionImg").src=guitar.pictureMain;
        document.getElementById("extensionImgLink").href=guitar.pictureMain;
        document.getElementById("extensionPrice").innerHTML=guitar.salesPrice;
        document.getElementById("mainDiv").onclick = () => chrome.tabs.create({url: "http://localhost:3000/guitars/" + guitar.skU_ID });
    }
    else{
        document.getElementById("extensionName").innerHTML="No guitars to show!";
        document.getElementById("extensionImg").src="https://media.tenor.com/O5sbAjo0-nYAAAAM/hellinheavns-capybara.gif";
    }
        
    /* https://developer.spotify.com/web-api/authorization-guide/#client_credentials_flow */
    console.log("I ran");

 //  There is a problem with the CORS Access-Control-Allow-Origin - must be fixed with some header manipulation
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
    titler.toLowerCase()
    console.log(titler)
      
  
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
          
          //chrome.tabs.create({url: "http://localhost:3000/guitars/" + obj.skU_ID })
          console.log(specialGuitar)
          console.log(specialGuitar.pictureMain)
        }
      }
      if (!specialGuitar){
        specialGuitar =""
      } 
      return specialGuitar;
 }
 
}
