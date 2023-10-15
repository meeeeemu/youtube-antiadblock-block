
// I CANNOT GUARANTEE THAT THIS WILL WORK FOREVER, ALTHOUGH, IF YOUTUBE STARTS EMBEDDING ADS INTO THE PLAYER, THERE'S A CHANCE
// (AND I MEAN A REALLY SMALL CHANCE) THAT THIS WILL STILL TECHNICALLY WORK, WOULD HAVE TO UPDATE A FEW THINGS
// SINCE I DONT THINK YOUTUBE CAN PUT ADS IN EMBEDS
// THEY CAN HOWEVER COMPLETELY DISABLE EMBEDS, BUT IF THAT HAPPENS THEN LIKE EVERY WEBSITE EVER WOULD BREAK SO


document.addEventListener('yt-navigate-start', function(){

    setTimeout(function()
    {
        if(document.getElementById("YOUTUBEADBLOCKBLOCKPLAYER")){
            document.getElementById("YOUTUBEADBLOCKBLOCKPLAYER").remove(); // if the player is already there get rid of it
        }
    }, 200)

});

document.addEventListener('yt-page-data-updated', function(){

    if(document.getElementById("YOUTUBEADBLOCKBLOCKPLAYER")){
        document.getElementById("YOUTUBEADBLOCKBLOCKPLAYER").remove(); //when you use the forward and back buttons remove the player
        console.log("[INFO] Found adblock player! Removing...");
        console.log("[INFO] Add new one...");
    }

});

function initNewPlayer(userEmbedURL, adblockMessageParent){
    console.log("[INFO] Initializing new player...");
    let newPlayer = document.createElement("EMBED"); // create a new embed (i dont think they can legally show ads on embeds)
    newPlayer.setAttribute("id", "YOUTUBEADBLOCKBLOCKPLAYER");
    newPlayer.setAttribute("class", "style-scope ytd-enforcement-message-view-model"); // disguise the embed as the adblock message so it works under the parent element
    newPlayer.setAttribute("height", String(window.screen.availHeight / 1.5));
    newPlayer.setAttribute("width", String(window.screen.availWidth / 1.5));
    newPlayer.setAttribute("src", userEmbedURL);
    adblockMessageParent[0].appendChild(newPlayer); //put it on the parent
}


document.addEventListener('yt-navigate-finish', function(){

    let userEmbedURLFormat = window.location.href.replace("watch?v=", "embed/"); // get the embed url

    let userEmbedURL = userEmbedURLFormat.slice(0,41) + "?autoplay=1"; // no autoplay

    setTimeout(function(){
        if(!document.getElementById("YOUTUBEADBLOCKBLOCKPLAYER")){
            // get rid of the adblock message but get the parent
            let adblockMessage = document.querySelectorAll("div.style-scope.ytd-enforcement-message-view-model");
            let adblockMessageParent = document.querySelectorAll("ytd-enforcement-message-view-model.style-scope.yt-playability-error-supported-renderers");
            if(adblockMessage[0]){
                adblockMessage[0].remove();
                initNewPlayer(userEmbedURL, adblockMessageParent);
            } else {
                initNewPlayer(userEmbedURL, adblockMessageParent); // why am i making the adblock player appear if the block isnt there
                if(!adblockMessage[0])
                {
                    console.log("[WARN] Adblock message already removed, or hasnt been removed."); // this means literally nothing lol
                }
            }
        }
    }, 100)
});