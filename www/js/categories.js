$("#btn-back").on("click",function() {
  //window.location = "index.html";
    window.plugins.nativepagetransitions.slide({
        "direction" : "left",
        "href" : "index.html"
    });
});
