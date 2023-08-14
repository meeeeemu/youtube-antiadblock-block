document.addEventListener('yt-navigate-start', function(){

    if(document.getElementById("YOUTUBEADBLOCKBLOCKPLAYER")){
        document.getElementById("YOUTUBEADBLOCKBLOCKPLAYER").remove()
    }

    console.log("[INFO] Removed player...")

});

document.addEventListener('yt-navigate-finish', function(){

    console.log("[INFO] Creating player...")

    let userEmbedURL = window.location.href.replace("watch?v=", "embed/");

    setTimeout(function(){
        if(!document.getElementById("YOUTUBEADBLOCKBLOCKPLAYER")){
            let adblockMessage = document.querySelectorAll("div.style-scope.ytd-enforcement-message-view-model");
            let adblockMessageParent = document.querySelectorAll("ytd-enforcement-message-view-model.style-scope.yt-playability-error-supported-renderers")
            if(adblockMessage[0]){
                adblockMessage[0].remove()
            } else {
                let newPlayer = document.createElement("EMBED");
                // newPlayer.outerHTML = '<embed class="style-scope ytd-enforcement-message-view-model" id="YOUTUBEADBLOCKBLOCKPLAYER" height="720" width="1280" src="' + userEmbedURL + '">';
                newPlayer.setAttribute("id", "YOUTUBEADBLOCKBLOCKPLAYER");
                newPlayer.setAttribute("class", "style-scope ytd-enforcement-message-view-model");
                newPlayer.setAttribute("height", "720");
                newPlayer.setAttribute("width", "1280");
                newPlayer.setAttribute("src", userEmbedURL);
                adblockMessageParent[0].appendChild(newPlayer);
            }
        }
    }, 1)
});