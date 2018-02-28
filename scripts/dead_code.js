function getPicFileName(inGuyNumber) {
    var rightPic = "guy"+inGuyNumber+".picture"
    return(eval(rightPic))
    //console.log("rigthPic is "+eval(rightPic));
    // src="+rightPic+"

}


//    $("#pic"+String(theGuy.charIdNum)+"a").attr("src", theGuy.picture);
    // fadeIn(fadeTime);   not(theGuy.frame+"a").
// go assign the images before hand, then let the code make them visible



function initialize() {
    // $(".pic-1").text(guy1.name);
    // $(".pic-2").text(guy2.name);
    // $(".pic-3").text(guy3.name);
    // $(".pic-4").text(guy4.name);
    $("#a-pic-1").attr("src", guy1.picture);
    $("#a-pic-2").attr("src", guy2.picture);
    $("#a-pic-3").attr("src", guy3.picture);
    $("#a-pic-4").attr("src", guy4.picture);
    // $(".guy-1-health").text("Health Points: "+guy1.health);
    // $(".guy-2-health").text("Health Points: "+guy2.health);
    // $(".guy-3-health").text("Health Points: "+guy3.health);
    // $(".guy-4-health").text("Health Points: "+guy4.health);
}