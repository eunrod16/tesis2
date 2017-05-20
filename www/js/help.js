var video = document.querySelector('video');
video.load();

video.addEventListener('loadeddata', function() {
    // Video is loaded and can be played
    video.play();
    setTimeout(end_video,5000);
}, false);

function end_video(){
    // window.location.replace("juego.html");
    document.querySelector('#myNavigator').pushPage('juego.html', {data: {title: 'Juego'}});
//        window.plugins.nativepagetransitions.slide({
//            "direction" : "left",
//            "href" : "juego.html"
//        });
}