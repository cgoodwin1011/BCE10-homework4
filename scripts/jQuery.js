var fadeTime = 40

var heroChosen = false;
var villainChosen = false;
var villainDead = false;
var liveVillains = [1, 2, 3, 4]
var deadVillains = 0;
var antagonist = '';
var protagonist;
var playAgainHTML = "<h2>Do you want to play again?</h2><button id='yes-button'>Play Again</button> <button id='no-button'>No</button>";

var guy0 = {
    charIdNum: 0,
    name: "guy0",
    health: 100,
    attackPower: 20,
    counterAttackPower: 50,
    role: "unassigned",
    picture: "images/DeckOfCards/AD.jpg",
    frame: "#frame0",
};

var guy1 = {
    charIdNum: 1,
    name: "W.T. Sherman",
    health: 100,
    attackPower: 20,
    counterAttackPower: 50,
    role: "unassigned",
    picture: "images/sherman.jpeg",
    frame: "#frame1",
};

var guy2 = {
    charIdNum: 2,
    name: "U.S. Grant",
    health: 100,
    attackPower: 20,
    counterAttackPower: 20,
    role: "unassigned",
    picture: "images/grant.jpeg",
    frame: "#frame2",
};

var guy3 = {
    charIdNum: 3,
    name: "R.E. Lee",
    health: 100,
    attackPower: 20,
    counterAttackPower: 10,
    role: "unassigned",
    picture: "images/lee.jpeg",
    frame: "#frame3",
};

var guy4 = {
    charIdNum: 4,
    name: "P.G.T. Beauregard",
    health: 100,
    attackPower: 20,
    counterAttackPower: 5,
    role: "unassigned",
    picture: "images/beauregard.jpeg",
    frame: "#frame4"
};

function chooseHero(theGuy) {
    var newHTML = makeHeroFrame(theGuy.charIdNum);
    theGuy.role = "protagonist";
    heroChosen = true;
    indexGoodGuy = liveVillains.indexOf(theGuy.charIdNum);
    liveVillains.splice(indexGoodGuy, 1);
    deadVillains++;
    $("#click-hero").hide();
    $("#choose-character, #top-row-container").fadeOut(fadeTime, function() {
        // $("#top-row-container").attr("id","old-top-row-container");
        $("#top-row-container").html(newHTML).fadeIn(fadeTime);
        $("#your-character-name").text(theGuy.name);
        $("#your-character").fadeIn(fadeTime);
    });
    $("#mid-row-container").fadeIn(fadeTime);
    hideFrame(theGuy.charIdNum);
}

function chooseVillain(theGuy) {
    var newHTML = makeVillainFrame(theGuy.charIdNum);
    theGuy.role = "antagonist";
    villainChosen = true;
    $("#your-character, #mid-row-container").fadeOut(fadeTime, function() {
        $("#mid-row-container").html(newHTML).fadeIn(fadeTime);
        $("#the-enemy").text(theGuy.name);
        $("#ready-2-fight, enemy-name").fadeIn(fadeTime);
    });
    indexChosenGuy = liveVillains.indexOf(theGuy.charIdNum);
    liveVillains.splice(indexChosenGuy, 1);
    if (deadVillains == 0) {
        deadVillains++;
    }
    // if (liveVillains.length == 0) {console.log("zero villains left")}
    $("#bottom-row-container").html(fillBottomRow());
    $("#bottom-row-container").fadeIn(fadeTime);
    // hideFrame(theGuy.charIdNum);
}

function fillBottomRow() {
    newHTML = "<h2 id='upcoming-opponets' >Upcoming Opponents</h2>";
    console.log(liveVillains);
    for (i = 0; i < liveVillains.length; i++) {
        newHTML += makeFrame(liveVillains[i]);

    }

    console.log(newHTML);
    return newHTML;
}

function makeFrame(inGuyNumber) {
    var line1 = "<div id='frame-"+inGuyNumber+"' class='image-frame'>";
    var line2 = "<p id='pic-name-"+inGuyNumber+"' class='pic-"+inGuyNumber+"'>"+eval('guy'+inGuyNumber+".name")+"</p>";
    var line3A = "<img id = 'a-pic-"+inGuyNumber+"' class='pic"+inGuyNumber+" the-pics' "
    var line3B = "src="+eval('guy'+inGuyNumber+".picture")+" >";
    var line3 = line3A+line3B;
    var line4A = "<p id='health-points-"+inGuyNumber;
    var line4B = "' class='guy-"+inGuyNumber+"-health+'>Health Points: "
    var healthID = "health-display-"+inGuyNumber
    var line4C = "<span id='"+healthID+"'>"+eval("guy"+inGuyNumber+".health")+"</span></p>";
    var line4 = line4A + line4B + line4C;
    var line5 = "</div>";
    return line1 + line2 + line3 + line4 + line5;
}

function makeHeroFrame(inGuyNumber) {
    oldId = "#frame-"+inGuyNumber;
    starterHTML = makeFrame(inGuyNumber);
    starterHTML = starterHTML.replace(oldId, "frame-hero");
    $(oldId).attr("id","#frame-hero");
    $(oldId).addClass("frame-hero");
    return starterHTML;
}

function makeVillainFrame(inGuyNumber) {
    oldId = "#frame-"+inGuyNumber;
    starterHTML = makeFrame(inGuyNumber);
    starterHTML = starterHTML.replace(oldId, "frame-villain");
    $(oldId).attr("id","#frame-villain");
    $(oldId).addClass("frame-villain");
    return starterHTML;
}

function hideFrame(inGuyNumber) {
    theId = "#frame-"+inGuyNumber;
    $(theId).hide();
}

function gameOver() {
    var youLoseHTML = "<h2>You Lose!</h2>";
    message = ''
    $("#fight-outcome").html(youLoseHTML+playAgainHTML);
    $(document).on('click','#yes-button',function(){location.reload();})
    $(document).on('click','#no-button',function(){leaveGame()})
}

function leaveGame() {
    $("body").html("<h1>Good Bye!</h1>");
}

function buryDeadvillain(whichVillain) {
    $("#mid-row-container").hide()
    $("#ready-2-fight").hide();
    $("#fight-outcome").html("You killed "+whichVillain.name+"!");
    $("#the-defeated").append(whichVillain.name+" ");
    $("#very-bottom").show();
    indexDeadGuy = liveVillains.indexOf(whichVillain.charIdNum);
}

function victory() {
    $("#fight-outcome").html("<h1>Victory!</h1><p>You have prevailed!</p>")
    $("#fight-outcome").append(playAgainHTML); 
    $("#upcoming-opponets").hide();
}

function bigFight(theHero, theVillain) {
    var newDisplay = "<br>You attack with "+theHero.attackPower+"<br>"+theVillain.name+" counter attacks with "+theVillain.counterAttackPower;
    theHero.health -= theVillain.counterAttackPower;
    theVillain.health -= theHero.attackPower;
    theHero.attackPower += 20;
    $("#fight-outcome").html(newDisplay);
    $("#health-display-"+theHero.charIdNum).html(theHero.health)
    $("#health-display-"+theVillain.charIdNum).html(theVillain.health)
    if (theHero.health <= 0) {
        gameOver();
    }
    if (theVillain.health <= 0) {
        deadVillains++;
        console.log("dead vil num"+deadVillains)
        buryDeadvillain(theVillain);
        $("#fight-button").prop("disabled", true);
        if (deadVillains < 4) {
            console.log(liveVillains);
            $("#fight-outcome").append(playAgainHTML);
            $("#fight-outcome").show();
            $(document).on('click','#yes-button',function(){newFight()});
            $(document).on('click','#no-button',function(){leaveGame()});
            if (liveVillains.length == 1) {
                $("#upcoming-opponets").hide();
            }        
        } else {
            console.log("NOBODY LEFT")
            $("#fight-outcome").append("You have killed all the enemies!")
            $("#fight-outcome").append(playAgainHTML)
            $("#fight-outcome").show();
            $(document).on('click','#yes-button',function(){location.reload();})
            $(document).on('click','#no-button',function(){leaveGame()})       
            victory();    
        }
    }
}

function newFight() {
    // $("*").css("color", "red");
    villainChosen = false;
    protagonist.health = 100;
    $("#mid-row-container").fadeOut(fadeTime, function() {
        // console.log("are we here")
        // $("#old-mid-row-container").fadeIn(fadeTime);
        $("#fight-outcome").fadeOut(fadeTime);
        $("#ready-2-fight").fadeOut(fadeTime);
        $("#upcoming-opponets").html("<h2>Pick you new opponent:</h2>");
        $("#upcoming-opponets").show();
    });

    $(document).on('click','#bottom-row-container',function() {
        var whichGuy = $("#"+event.target.id).parent().attr("id");
        if (!villainChosen) {
            makeGuyVillain(whichGuy);
            chooseVillain(antagonist);
            $("#bottom-row-container").fadeIn(fadeTime);
        }
    });
    $("#fight-button").prop("disabled", false);

}

function makeGuyVillain(whichGuy) {
    if (villainChosen) {
        return;
    } else {
        villainChosen = true;
    }
    switch(whichGuy) {
        case "frame-1":
            antagonist = guy1;
            break;
        case "frame-2":
            antagonist = guy2;
            break;
        case "frame-3":
            antagonist = guy3;
            break;
        case "frame-4":
            antagonist = guy4;
            break;
        default:
            antagonist = "";
            
    }
}

function makeGuyHero(whichGuy) {
    if (heroChosen) {
        return;
    } else {
        heroChosen = true;
    }
    switch(whichGuy) {
        case "frame-1":
            protagonist = guy1;
            break;
        case "frame-2":
            protagonist = guy2;
            break;
        case "frame-3":
            protagonist = guy3;
            break;
        case "frame-4":
            protagonist = guy4;
            break;
        default:
            return;
        }
}


$(document).ready(function(){

$( "#top-row-container" ).click(function( event ) {
    var whichGuy = $("#"+event.target.id).parent().attr("id");
    if (heroChosen) {return;}
    makeGuyHero(whichGuy);
    chooseHero(protagonist);
    return;
});

$( "#mid-row-container" ).click(function( event ) {
    var whichGuy = $("#"+event.target.id).parent().attr("id");
    if (villainChosen && !villainDead) {return;}
    makeGuyVillain(whichGuy);
    chooseVillain(antagonist);
    return;
});


$("#fight-button").on("click", function() {
    bigFight(protagonist, antagonist);
    console.log("fight button clicked")
    })
});

$("#bottom-row-container").click( function( event ) {
    var whichGuy = $("#"+event.target.id).parent().attr("id");
    if (villainChosen) {
        return;
    } else {
        villainChosen = true;
    }
    makeGuyVillain(whichGuy);
    return;



})

