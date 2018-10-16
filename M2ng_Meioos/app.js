let stage;
let score = 0;
const timerDuration = 120;
let currentTimerTime = 0;
let elapsedTime = 0;
let timer;
let welcomeScreenTextNr = 0;

let lang = 0; //Estonian is 0, English is 1;

const welcomeScreenText = [
    "Kõik suguliselt sigivad organismid, kaasa arvatud inimene, on geneetiliselt ainulaadsed: nad erinevad oma vanematest ja õdedest-vendadest. Selle alge peitub suguraku tekkimises." +
    "</p>Sugurakud tekivad raku jagunemisel, mida nimetatakse meioosiks.",
    "Meioosi käigus jaguneb keharakk kaks korda. Esimesel jagunemisel segatakse vanematelt päritud geneetiline informatsioon läbi ja teise jagunemisega tekib neli ainulaadse geneetilise sisuga sugurakku.",
    "Sääsel on keharakkudes kuus kromosoomi. Paiguta sääse meioosi etappide pildid õigesse järjestusse!</p> Iga faasi paigutamiseks on sul aega 15 sekundit ja võimalik saada vihjeid. Mida kiiremini vastad, seda rohkem punkte kogud.\n" +
    "</p>Alusta!"];

const welcomeScreenTextEng = [
    "All sexually reproducing organisms, including humans, are genetically unique: differ from their parents and siblings. The beginnings of this lie in the formation of the reproductive cell. </p>" +
"Reproductive cells are produced by a type of cell division called meiosis.",
    "During meiosis, a body cell divides twice. In the first division (meiosis I), genetic information from both parents gets mixed up and the second division results in four reproductive cells of unique genetic makeup.",
    "The body cells of a mosquito contain six chromosomes. Place the images in the correct order of stages of meiosis.</p>" +
    "You have 15 seconds to place each phase, and it is possible to get clues. The faster you reply, the more points you collect.</p>" +
    "Begin!"
];

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function chooseLang(langNr) {
    lang = langNr;
    console.log("lang is " + lang);
    document.getElementById("chooseLang").style.visibility = "hidden";
    startWelcomeScreenDialog()
}

function moveBlocker(pix) {
    let blocker = document.getElementById("blocker");
    blocker.style.top = pix + "px";
}

function startWelcomeScreenDialog() {
    let welcome_screen_text = document.getElementById("welcome_screen_text");
    if (lang === 0) {
        welcome_screen_text.innerHTML=welcomeScreenText[0];
        document.getElementById("dialog_header").innerHTML = "MEIOOS";
    } else if (lang === 1) {
        welcome_screen_text.innerHTML=welcomeScreenTextEng[0];
        document.getElementById("dialog_header").innerHTML = "MEIOSIS";
    }

}

function welcomeScreenMoveForward() {
    welcomeScreenTextNr += 1;
    if (welcomeScreenTextNr >= 3) {
        //kutsu välja funktsioon, mis paneb järgmise screeni peale
        beginGame();
    } else {
        let welcome_screen_text = document.getElementById("welcome_screen_text");
        if (lang === 0) {
            welcome_screen_text.innerHTML=welcomeScreenText[welcomeScreenTextNr]
        } else if (lang === 1) {
            welcome_screen_text.innerHTML=welcomeScreenTextEng[welcomeScreenTextNr]
        }

    }

}

function welcomeScreenMoveBack() {
    if (welcomeScreenTextNr > 0) {
        welcomeScreenTextNr -= 1;
        let welcome_screen_text = document.getElementById("welcome_screen_text");
        if (lang === 0) {
            welcome_screen_text.innerHTML=welcomeScreenText[welcomeScreenTextNr]
        } else if (lang === 1) {
            welcome_screen_text.innerHTML=welcomeScreenTextEng[welcomeScreenTextNr]
        }

    }
}


function beginGame() {

    // täitsa alguses

    Init();

    currentTimerTime = timerDuration;

    moveBlocker(0); //moves blocker over the screen

    game_text = document.getElementById("game_text");
    game_animation = document.getElementById("game_animation");

    document.getElementById("dialog_animation").style.visibility = "hidden";
    game_animation.style.WebkitAnimation = "moveIn 1s";
    game_animation.style.animationFillMode = "forwards";
    if (lang === 0) {
        document.getElementById("start").innerHTML = "Alusta";
    } else if (lang === 1) {
        document.getElementById("start").innerHTML = "Start";
    }

    if (lang === 0) {
        game_text.innerHTML = "Sääsel on keharakkudes kuus kromosoomi. Paiguta sääse meioosi etappide pildid õigesse järjestusse. Iga faasi paigutamiseks on sul aega 15 sekundit ja võimalik saada vihjeid. Mida kiiremini vastad, seda rohkem punkte kogud.";
    } else if (lang === 1) {
        game_text.innerHTML = "Before meiosis begins, a body cell undergoes DNA replication, which results in each chromosome becoming double-chromatid and starting to resemble the letter X.";
    }

    stage = 1;
    score = 0;
}

function startGame() {

    console.log("start game");

    moveBlocker(1080); //moves blocker away

    phase_animation = document.getElementById("phase_animation");
    phase_animation.pause();

    game_animation = document.getElementById("game_animation");
    arrow_down = document.getElementById("arrow_down");
    game_animation.style.WebkitAnimation = "moveOut 2s";
    game_animation.style.animationFillMode = "forwards";
    document.getElementById("start").innerHTML="";
    arrow_down.src = "assets/noolalla.png";
    arrow_down.style.width = "50px";
    arrow_down.style.height = "50px";

    if (stage === 9) {
        document.getElementById("endScreen").style.visibility = "visible";
        if (lang === 0) {
            document.getElementById("endScreenCongratz").innerText = "Mäng läbi!";
            document.getElementById("endScreenScore").innerHTML = "Sinu skoor oli " + score + " punkti!";
            document.getElementById("restartGame").innerHTML = "Alusta uuesti!";

        } else if (lang === 1) {
            document.getElementById("endScreenCongratz").innerText = "Game Over!";
            document.getElementById("restartGame").innerHTML = "Start again!";
            document.getElementById("endScreenScore").innerHTML = "You scored " + score + " points!";
        }

    } else {
        resumeTimer();
    }


}

function back_to_menu() {
    document.location = "../index.html"
}

function restartGame() {

    document.location = "../index.html";

}

function resumeTimer(){
    currentTimerTime = timerDuration;
    timer = setInterval(timerFunction,100);
}

function stopTimer(){
    score += currentTimerTime * 10;
    console.log(score);
    timer = clearInterval(timer);
}

function timerFunction(){
    currentTimerTime = currentTimerTime - 0.1;
    currentTimerTime = currentTimerTime.toFixed(1);
    if(currentTimerTime < 0.1){
        currentTimerTime = 0;
        console.log("Time to stop timer");
        stopTimer();

        /*
        end the game
         */

        document.getElementById("endScreen").style.visibility = "visible";
        if (lang === 0) {
            document.getElementById("endScreenCongratz").innerText = "Mäng läbi!";
            document.getElementById("endScreenScore").innerHTML = "Sinu skoor oli " + score + " punkti!";
            document.getElementById("restartGame").innerHTML = "Alusta uuesti!";

        } else if (lang === 1) {
            document.getElementById("endScreenCongratz").innerText = "Game Over!";
            document.getElementById("restartGame").innerHTML = "Start again!";
            document.getElementById("endScreenScore").innerHTML = "You scored " + score + " points!";
        }

    }

    document.getElementById("timer").innerHTML = currentTimerTime;

}

async function rightAnswer(id) {

    moveBlocker(0); //moves blocker over the screen
    stopTimer();

    game_text = document.getElementById("game_text");
    game_animation = document.getElementById("game_animation");
    phase_animation = document.getElementById("phase_animation");

    /*

    Muuda allolevates ridades ära assets/bears.mp4 iga etapi vastavaks animatsiooniks!


     */

    if (id === "d1") {
        if (lang === 0) {
            game_text.innerHTML="Kromosoomid pakendatakse tihedateks pulgakesteks. Kahekromatiidilised kromosoomid leiavad oma paarilised, millest üks on pärit isalt ja teine emalt. Kromosoomid  liibuvad teineteise vastu ning vahetavad võrdse pikkusega osi. Siin segatakse geneetiline materjal läbi ja seetõttu on iga tekkiv sugurakk geneetiliselt ainulaadne. Tsentrosoomid, mis hakkavad oma niidikestega kromosoome tõmbama, liiguvad raku otstesse.";
        } else if (lang === 1) {
            game_text.innerHTML="Chromosomes are packed into dense rods. Double-chromatid chromosomes pair up: each chromosome from the father pairs up with one from the mother. Chromosomes cling together and exchange segments of equal length. This is where genetic material gets mixed up so that each resulting reproductive cell is genetically unique. Centrosomes, which will start pulling the chromosomes with their fibers, move to the opposite poles of the cell."
        }
        phase_animation.setAttribute("src", "assets/bears.mp4");
    } else if (id === "d2") {
        if (lang === 0) {
            game_text.innerHTML="Kõik kromosoomid liiguvad paaridena ühele tasapinnale. Sääse puhul on neid kuus. Tsentrosoomid on raku poolustele jõudnud. Tsentrosoomidest lähtuvad niidikesed kinnituvad kromosoomide keskosa külge, kus kromatiidid on teineteisega ühendatud.";
        } else if (lang === 1) {
            game_text.innerHTML="All chromosomes move in pairs to the same plane. A mosquito has six of them. Centrosomes have reached the poles of the cell. The fibers extending out from the centrosomes attach to the center of the chromosomes, where the chromatids are connected to each other.";
        }
        phase_animation.setAttribute("src", "assets/bears.mp4");
    } else if (id === "d3") {
        if (lang === 0) {
            game_text.innerHTML="Kuna niidikesed lühenevad, siis tõmmatakse kromosoomide paarilised teineteisest lahku tsentrosoomide poole, raku poolustele. Kromosoomid on endiselt kahekromatiidilised.";
        } else if (lang === 1) {
            game_text.innerHTML="As the fibers shorten, the chromosome pairs are pulled apart towards the centrosomes, to the poles of the cell. The chromosomes are still double-chromatid.";
        }
        phase_animation.setAttribute("src", "assets/bears.mp4");
    } else if (id === "d4") {
        if (lang === 0) {
            game_text.innerHTML = "Kuna  paarilised kromosoomid on teineteisest lahutatud, siis on kummaski tekkivas rakus poole vähem kromosoome. Tekivad rakumembraanid, kuid rakud hakkavad kohe uuesti jagunema.";
        } else if (lang === 1) {
            game_text.innerHTML = "As the chromosome pairs have been pulled apart, both of the forming cells have half the number of chromosomes. Cell membranes form but the cells immediately start to divide again.";
        }
        phase_animation.setAttribute("src", "assets/bears.mp4");
    } else if (id === "d5") {
        if (lang === 0) {
            game_text.innerHTML="Enne teist jagunemist ei toimu DNA kahekordistumist. Sääse puhul on rakus kolm kromosoomi. Kromosoomid on endiselt kahekromatiidilised. Tuumamembraan laguneb. Tsentrosoomid liiguvad raku poolustele.";
        } else if (lang === 1) {
            game_text.innerHTML="The second division is not preceded by DNA replication. In a mosquito, the cell contains three chromosomes. The chromosomes remain double-chromatid. The nuclear membrane breaks up. The centrosomes move to the poles of the cell.";
        }
        phase_animation.setAttribute("src", "assets/bears.mp4");
        document.getElementById("n1").style.visibility = "visible";
        document.getElementById("n1").style.WebkitAnimation = "nAnswerDropped 2s";
    } else if (id === "d6") {
        if (lang === 0) {
            game_text.innerHTML="Kõik kahekromatiidilised kromosoomid liiguvad ühele tasapinnale ja tsentrosoomid on raku poolustele jõudnud. Tsentrosoomidest lähtuvad kinnituvad niidikesed kromosoomide keskosa külge, kus kromatiidid on teineteisega ühendatud.";

        } else if (lang === 1) {
            game_text.innerHTML="All double-chromatid chromosomes move to the same plane and the centrosomes have reached the poles of the cell. The fibers extending from the centrosomes attach to the center of the chromosomes, where the chromatids are connected to each other.";
        }
        phase_animation.setAttribute("src", "assets/bears.mp4");
        document.getElementById("n2").style.visibility = "visible";
        document.getElementById("n2").style.WebkitAnimation = "nAnswerDropped 2s";
    } else if (id === "d7") {
        if (lang === 0) {
            game_text.innerHTML="Kuna niidikesed lühenevad, siis tõmmatakse kromosoomide kromatiidid teineteisest lahku tsentrosoomide poole, raku poolustele. Nüüd muutuvad kromosoomid taas ühekromatiidilisteks.";

        } else if (lang === 1) {
            game_text.innerHTML="As the fibers shorten, the sister chromatids of the chromosomes are pulled apart towards the centrosomes, to the poles of the cell. Now the chromosomes become single-chromatid again.";
        }
        phase_animation.setAttribute("src", "assets/bears.mp4");
        document.getElementById("n3").style.visibility = "visible";
        document.getElementById("n3").style.WebkitAnimation = "nAnswerDropped 2s";
    } else if (id === "d8") {
        if (lang === 0) {
            game_text.innerHTML="Kromosoomid, mis on nüüd ühekromatiidilised, hakkavad lahti hargnema. Moodustuvad rakumembraanid. Tekkinud sugurakkudes on kromosoomide arv vähenenud kaks korda. Sääse puhul on kromosoome kolm ja nad on ühekromatiidilised. Kõik neli sugurakku on geneetiliselt ainulaadsed, sest paariliste kromosoomide osade vahel toimus vahetus.";
        } else if (lang === 1) {
            game_text.innerHTML="The chromosomes are now single-chromatid and start to separate. Cell membranes form. In the resulting reproductive cells, the number of chromosomes has been reduced by half. In mosquitoes, each cell now has three chromosomes, each composed of a single chromatid. All four reproductive cells are genetically unique because the paired chromosomes have exchanged segments.";
        }
        phase_animation.setAttribute("src", "assets/bears.mp4");
        document.getElementById("n4").style.visibility = "visible";
        document.getElementById("n4").style.WebkitAnimation = "nAnswerDropped 2s";
    }

    game_animation.style.WebkitAnimation = "moveIn 1s";
    game_animation.style.animationFillMode = "forwards";

}


function Init() {
    const pictureId = ["d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8"];
    let numbers = [1, 2, 3, 4, 5, 6, 6.9, 7.8];

    for (let i = 0; i < pictureId.length; i++) {
        document.getElementById(pictureId[i]).style.position="fixed";
        document.getElementById(pictureId[i]).style.top = "600px";
        const number = Math.floor(Math.random()*numbers.length);
        document.getElementById(pictureId[i]).style.left = numbers[number] * 200 + "px";
        numbers = numbers.filter(item => item !== numbers[number]);

    }
}

function showHint(id) {
    let hint1 = document.getElementById("hint1");
    let hint2 = document.getElementById("hint2");
    let hintBox = document.getElementById("hintBox");

    if (id === "hi1") {
        hintBox.style.webkitAnimation = "moveInHintBox 1s both";
        if (lang === 0) {
            hint1.innerHTML = "- kromosoomid on kahekromatiidilised";
            hint2.innerHTML = "- kromosoomid on leidnud oma paarilised";
        } else if (lang === 1) {
            hint1.innerHTML = "- chromosomes are double-chromatid";
            hint2.innerHTML = "- chromosomes have paired up";
        }

    } else if (id === "hi2") {
        hintBox.style.webkitAnimation = "moveInHintBox 1s both";
        if (lang === 0) {
            hint1.innerHTML = "- tsentrosoomid on raku poolustel";
            hint2.innerHTML = "- kuus kromosoomi on paaridena ühel tasapinnal";
        } else if (lang === 1) {
            hint1.innerHTML = "- centrosomes are at the poles of the cell";
            hint2.innerHTML = "- six chromosomes are paired on the same plane";
        }


    } else if (id === "hi3") {
        hintBox.style.webkitAnimation = "moveInHintBox 1s both";

        if (lang === 0) {
            hint1.innerHTML = "- niidikesed on lühenenud";
            hint2.innerHTML = "- kromosoomide paarid on teineteisest lahutatud";
        } else if (lang === 1) {
            hint1.innerHTML = "- the fibers have shortened";
            hint2.innerHTML = "- the chromosome pairs have been pulled apart";
        }

    } else if (id === "hi4") {
        hintBox.style.webkitAnimation = "moveInHintBox 1s both";

        if (lang === 0) {
            hint1.innerHTML = "- kromosoomid on kahekromatiidilised";
            hint2.innerHTML = "- paarilised kromosoomid on teineteisest lahutatud";
        } else if (lang === 1) {
            hint1.innerHTML = "- the chromosomes are double-chromatid";
            hint2.innerHTML = "- chromosome pairs have been pulled apart";
        }
    } else if (id === "hi5") {
        hintBox.style.webkitAnimation = "moveInHintBox 1s both";

        if (lang === 0) {
            hint1.innerHTML = "- kromosoomid on kahekromatiidilised";
            hint2.innerHTML = "- kolm kahekromatiidilist kromosoomi on rakus vabalt ";
        } else if (lang === 1) {
            hint1.innerHTML = "- the chromosomes are double-chromatid";
            hint2.innerHTML = "- three double-chromatid chromosomes float freely in the cell ";
        }
    } else if (id === "hi6") {
        hintBox.style.webkitAnimation = "moveInHintBox 1s both";

        if (lang === 0) {
            hint1.innerHTML = "- tsentrosoomid on raku poolustel";
            hint2.innerHTML = "- kromosoomid on ühel tasapinnal";
        } else if (lang === 1) {
            hint1.innerHTML = "- the centrosomes are at the poles of the cell";
            hint2.innerHTML = "- the chromosomes are on the same plane";
        }
    } else if (id === "hi7") {
        hintBox.style.webkitAnimation = "moveInHintBox 1s both";

        if (lang === 0) {
            hint1.innerHTML = "- niidikesed on lühenenud";
            hint2.innerHTML = "- kromosoomide kromatiidid on teineteisest lahutatud";
        } else if (lang === 1) {
            hint1.innerHTML = "- the fibers have shortened";
            hint2.innerHTML = "- the chromatids of the chromosomes have been pulled apart";
        }


    } else if (id === "hi8") {
        hintBox.style.webkitAnimation = "moveInHintBox 1s both";

        if (lang === 0) {
            hint1.innerHTML = "- kromosoomid on ühekromatiidilised";
            hint2.innerHTML = "- kromosoomid on lahti hargnemas";
        } else if (lang === 1) {
            hint1.innerHTML = "- the chromosomes are single-chromatid";
            hint2.innerHTML = "- the chromosomes are separating";
        }

    }
}

interact.dynamicDrop(true);

// target elements with the "draggable" class
interact('.draggable')
    .draggable({
        // enable inertial throwing
        inertia: true,
        // keep the element within the area of it's parent
        restrict: {
            restriction: { top: 100, left: 100, bottom: 1000, right: 1800 }
        },
        onstart: function (event) {
            console.log('onstart');
            document.getElementById("hintBox").style.webkitAnimation = "moveOut 1s both"
        },
        // call this function on every dragmove event
        onmove: dragMoveListener,
        // call this function on every dragend event
        onend: function (event) {
            console.log('onend');
        },
        snap: {
            targets: [
                {x: 274, y:368, range: 50},
                {x: 458, y:368, range: 50},
                {x: 647, y:368, range: 50},
                {x: 835, y:368, range: 50},
                {x: 1060, y:465, range: 50},
                {x: 1250, y:465, range: 50},
                {x: 1439, y:465, range: 50},
                {x: 1625, y:465, range: 50},
                ],
            relativePoints: [
                   // snap relative to the element's top-left,
                { x: 0.5, y: 0.5 }   // to the center
                    // and to the bottom-right
            ]
        }
    });
function dragMoveListener (event) {
    let target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
    console.log("x is " + x + " and y is " + y);
    // translate the element
    target.style.webkitTransform =
        target.style.transform =
            'translate(' + x + 'px, ' + y + 'px)';
    // update the position attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);

}

interact('.dropzone').dropzone({
    // only accept elements matching this CSS selector
    accept: '.draggable',
    overlap: 0.9,

    // listen for drop related events:
    ondrop: function (event) {
        console.log("ondrop");
        console.log("whichone is " + stage);
        if (event.target.id[1] === event.relatedTarget.id[1] && event.target.id[1] == stage){
            event.relatedTarget.style.WebkitAnimation = "rightAnswerDropped 2s";
            stage += 1;
            event.relatedTarget.classList.remove("draggable");
            event.relatedTarget.classList.add("yesdrop");
            rightAnswer(event.relatedTarget.id);
        } else {
            console.log("wrong answer dropped!");
            event.relatedTarget.style.animation = 'none';
            event.relatedTarget.offsetHeight; /* trigger reflow */
            event.relatedTarget.style.animation = null;
            event.relatedTarget.style.WebkitAnimation = "wrongAnswerDropped 2s";
        }
    },
    ondropactivate: function (event) {
        console.log("ondropactivate");
    },
    ondragenter: function (event) {
        console.log("ondragenter");
    },
    ondragleave: function (event) {
        console.log("ondragleave");
    },
    ondropdeactivate: function (event) {
    }
});
