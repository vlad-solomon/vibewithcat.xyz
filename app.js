const container = $(".container")
const loadVideo = $("#load-video")
const resetButton = $("#reset");
const togglePlay = $("#toggle-play")

loadVideo.click(function(){

    let videoLink = $("#text-field").val()
    let videoLinkString = videoLink.toString().replace("youtu.be/" , "www.youtube.com/watch?v="); 
    let videoId = videoLinkString.substring(32,43)
    const condition = /www.youtube.com\/watch\?v=([a-zA-Z0-9\-_]+)/


    if(videoLinkString.match(condition)){

        console.log(isVideoPlaying)

        $("#text-field").val("")

        const video = $("iframe");
        video.attr("src" , `https://www.youtube.com/embed/${videoId}?enablejsapi=1&playlist=${videoId}&autoplay=1&loop=1`)
        
        setTimeout(function(){
            $("#dancing-cat")[0].play();
            resetButton.css("display" , "block")
            togglePlay.css("display" , "block")
        }, 2000)
    
        container.children().css("display" , "none");
        
    } else {
        alert("That link ain't valid bruv!")
    };

})

resetButton.click(function(){
    $("iframe").attr("src" , "");
    $("#dancing-cat")[0].currentTime = 0;
    $("#dancing-cat")[0].pause();
    $(this).css("display" , "none")
    togglePlay.css("display" , "none")
    container.children().removeAttr("style")
    isVideoPlaying = false
    if(!isVideoPlaying){
        togglePlay.text("❚❚")
        isVideoPlaying = true
    }

})

function pauseYoutube(){
    const iframes = $("iframe")
    Array.prototype.forEach.call(iframes, iframe =>{
        iframe.contentWindow.postMessage(JSON.stringify({
            event: "command",
            func: "pauseVideo"
        }),
        "*"
        );
    })
}

function resumeYoutube(){
    const iframes = $("iframe")
    Array.prototype.forEach.call(iframes, iframe =>{
        iframe.contentWindow.postMessage(JSON.stringify({
            event: "command",
            func: "playVideo"
        }),
        "*"
        );
    })
}

let isVideoPlaying = true

togglePlay.click(function(){
    if(isVideoPlaying){
        pauseYoutube();
        $("#dancing-cat")[0].pause();
        $(this).text("▶")
        isVideoPlaying = false
    }else{
        resumeYoutube()
        $(this).text("❚❚")
        $("#dancing-cat")[0].play();
        isVideoPlaying = true
    }

})