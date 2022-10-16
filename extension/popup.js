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
      
  
    console.log(httpGet('http://localhost:3000/assets/guitarswithsongs.json',''));
    
    //{"skU_ID":"", "youtubeUrl":"", "spotifyId":""}
    const specialGuitars = JSON.parse(httpGet('http://localhost:3000/assets/guitarswithsongs.json',''));
    const guitars = JSON.parse(httpGet('http://localhost:3000/assets/guitars.json',''));
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

    function gettoken(){
      var client_id = '59bba2356596401cbd8bf46071610dc7';
      var client_secret = 'a556972fe6454b999a51a9b198828d93';

      let utf8Encode = new TextEncoder();
      utf8Encode.encode(client_id+':'+client_secret);



      let b = utf8Encode.toString('base64')
    




    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + b
      },
      form: {
        grant_type: 'client_credentials'
      },
      json: true
    };
    

    const data = new URLSearchParams();
    
        data.append('grant_type', 'client_credentials');
    

    fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {'Authorization': 'Basic ' + b}, 
      body: data
    }).then(res => {
      console.log("Request complete! response:", res.body);
    });


    // request.post(authOptions, function(error, response, body) {
    //   if (!error && response.statusCode === 200) {
    //     var token = body.access_token;
    //     return token;
    //   }
    // });
      } 

    console.log(artistList);
    function getArtist(songId) {
      const token = gettoken();
      const song = JSON.parse(httpGet('https://api.spotify.com/v1/tracks/'+songId,"Bearer "+token));
      return song;
    }

      for(let i = 0; i<artistList.length; i++){
        if (titler.toLowerCase().includes(artistList[i]).toLowerCase()){
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
 
}

    
    /**
     * 
     * const client_id = '59bba2356596401cbd8bf46071610dc7'; // Our client id
    const client_secret = 'a556972fe6454b999a51a9b198828d93'; // Our secret
    
    
      */