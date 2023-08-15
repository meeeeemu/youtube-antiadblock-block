document.addEventListener('yt-navigate-start', function(){

    if(document.getElementById("YOUTUBEADBLOCKBLOCKPLAYER")){
        document.getElementById("YOUTUBEADBLOCKBLOCKPLAYER").remove();
        console.log("[INFO] Removed player");
    }

});

function initNewPlayer(userEmbedURL, adblockMessageParent){
    console.log("[INFO] Creating player");
    let newPlayer = document.createElement("EMBED");
    newPlayer.setAttribute("id", "YOUTUBEADBLOCKBLOCKPLAYER");
    newPlayer.setAttribute("class", "style-scope ytd-enforcement-message-view-model");
    newPlayer.setAttribute("height", "720");
    newPlayer.setAttribute("width", "1280");
    newPlayer.setAttribute("src", userEmbedURL);
    adblockMessageParent[0].appendChild(newPlayer);
}

document.addEventListener('yt-navigate-finish', function(){

    let userEmbedURLFormat = window.location.href.replace("watch?v=", "embed/");

    let userEmbedURL = userEmbedURLFormat.slice(0,41) + "?autoplay=1";

    setTimeout(function(){
        if(!document.getElementById("YOUTUBEADBLOCKBLOCKPLAYER")){
            let adblockMessage = document.querySelectorAll("div.style-scope.ytd-enforcement-message-view-model");
            let adblockMessageParent = document.querySelectorAll("ytd-enforcement-message-view-model.style-scope.yt-playability-error-supported-renderers");
            if(adblockMessage[0]){
                adblockMessage[0].remove();
                initNewPlayer(userEmbedURL, adblockMessageParent);
            } else {
                initNewPlayer(userEmbedURL, adblockMessageParent);
                if(!adblockMessage[0])
                {
                    console.log("[WARN] Adblock message already removed, or hasnt been removed.");
                }
            }
        }
    }, 1)
});