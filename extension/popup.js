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
    }
    else{
        document.getElementById("extensionName").innerHTML="No guitars to show!";
        document.getElementById("extensionImg").src="https://www.mccrystalopticians.com/wp-content/uploads/2020/03/8-82835_sad-face-emoji-png-sad-face-emoji-transparent.png";
    }
        

    console.log('fuck this');
    console.log(getActiveTabURL().then((result)=> {return result}));
    console.log(getActiveTabURL());
    console.log('fuck this');
    /* https://developer.spotify.com/web-api/authorization-guide/#client_credentials_flow */
    console.log("I ran");

 //  There is a problem with the CORS Access-Control-Allow-Origin - must be fixed with some header manipulation
 function httpGet(theUrl,token) {
     let xmlHttpReq = new XMLHttpRequest();
     if (!theUrl){
       theUrl = "http://localhost:3000/assets/guitars.json"
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
   console.log(titler)
    
 
 console.log(httpGet('https://services.guitarguitar.co.uk/WebService/api/hackathon/guitarswithsongs',''));
 
 //{"skU_ID":"", "youtubeUrl":"", "spotifyId":""}
 const specialGuitars = JSON.parse(httpGet('https://services.guitarguitar.co.uk/WebService/api/hackathon/guitarswithsongs',''));
 const guitars = JSON.parse(httpGet('https://services.guitarguitar.co.uk/WebService/api/hackathon/guitars',''));
 console.log(specialGuitars);
 
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
   const song = JSON.parse(httpGet('https://api.spotify.com/v1/tracks/'+songId,"Bearer BQAl70hvrwVFu8atXudAWIzZ91OpBVz5EN_z_TQ8SX9_AK3eb_-TlYiOVpxgcJp7yBt3Sz3NVSVjxQuyh4biiy8XvqVjSlUkjADmldrgDLYjMaTMHPUeEpgNO1_x9qH1vztV3_R5LYQKZ5r9TzRLchNeqmY3114BEQacRyPvqt8w6xWuUA6KcNvrGD5ACko"));
   return song;
 }

   for(let i = 0; i<artistList.length; i++){
     if (titler.includes(artistList[i])){
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
 
 
 
 // export default{checkArtist} 
 
 /**
  * 
  * const client_id = '59bba2356596401cbd8bf46071610dc7'; // Our client id
 const client_secret = 'a556972fe6454b999a51a9b198828d93'; // Our secret
 
 
   */

    
    }

    
    /**
     * 
     * const client_id = '59bba2356596401cbd8bf46071610dc7'; // Our client id
    const client_secret = 'a556972fe6454b999a51a9b198828d93'; // Our secret
    
    
      */