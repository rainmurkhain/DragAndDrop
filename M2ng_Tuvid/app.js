let phase;
let currentTimerTime = 0;
const toAddForWrongAnswer = 15.0;
let needToAddTime = false;
let elapsedTime = 0;
let stopperTime = 0;
let timer;
let phase1Answers = 0;
let phase2AnswersCount = 0;
let phase2Answers = "";
let phase3NotAnswered = [["m1", "f1"], ["m1", "f2"], ["m2", "f1"], ["m2", "f2"], ["f1", "m1"], ["f1", "m2"], ["f2", "m1"], ["f2", "m2"]];
let phase3Answers = [{left: "", right: ""}, {left: "", right: ""}, {left: "", right: ""}, {left: "", right: ""}];
let phase3WrongAnswers = 0;
let phase5Answers = 0;

let lang = 0; //0 is Estonian, 1 is English
let welcomeScreenTextNr = 0;


/* ********************** */

document.onload = function() {
    inactivityTime();
};
document.onmousedown = function() {
    inactivityTime();
};
document.onkeypress = function() {
    inactivityTime();
};
document.ontouchstart = function() {
    inactivityTime();
};

let inactivityTime = function () {
    let t;
    window.onload = resetTimer;
    // DOM Events
    document.onmousemove = resetTimer;
    document.onkeypress = resetTimer;
    document.onmousedown = resetTimer;

    function restartGame() {
        window.location = "../index.html";
    }

    function resetTimer() {
        clearTimeout(t);
        t = setTimeout(restartGame, 1000 * 60 * 5) // 5minutes
    }
};



/* ********************** */

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function resumeTimer(){
    currentTimerTime = stopperTime;
    timer = setInterval(timerFunction,100);
}

function stopTimer(){
    stopperTime = currentTimerTime;
    timer = clearInterval(timer);
}

function timerFunction(){
    if (needToAddTime) {
        currentTimerTime = (parseFloat(currentTimerTime) + toAddForWrongAnswer).toFixed(1);
        needToAddTime = false;
    }
    currentTimerTime = (parseFloat(currentTimerTime) + 0.1).toFixed(1);
    document.getElementById("timer").innerHTML = currentTimerTime;
}

const welcomeScreenText = [
    "Lindude soo määravad viljastumise hetkel sugukromosoomid. </p> Emastel on umbes pooltes munarakkudes Z-ga ja teistes W-ga tähistatav sugukromosoom. Isase seemnerakud on alati Z-kromosoomiga. </p> Seega, kui viljastumisel saavad kokku Z ja W, siis koorub emane lind. Kui saavad kokku Z ja Z, siis koorub isane.",
    "W-kromosoom on väike ja väheste geenidega, aga  Z-kromosoomis on palju geene.</p>Näiteks tuvidel paikneb Z-kromosoomis sulgede värvust määrav geen, mida W-kromosoomis  ei ole.</p>Sellel geenil on kolm esinemisvormi ehk alleeli, mis määravad ühte kolmest värvusest: pronkspunast, halli või pruuni.",
    "Emasel tuvil on vaid üks Z-kromosoom ja linnu värvuse määrab selles olev alleel.</p> Isasel on kaks alleeli, mõlemas Z-kromosoomis üks, ning linnu värvuse määravad need koostoimes.",
    "Kuna tuvitüdrukud pärivad Z-kromosoomi alati isalt, siis pärivad nad ka oma värvuse alati isalt.</p>Tuvipoisid aga pärivad värvuse isalt vaid siis, kui isalt saadud alleel domineerib emalt saadud alleeli üle.</p>Pronkspunane alleel domineerib nii halli kui pruuni üle. Halli värvuse alleel on dominantne pruuni üle."
];

const welcomeScreenTextEng = [
    "The sex of birds is determined at the moment of fertilization by sex chromosomes.</p> Females have a sex chromosome named Z in about half of their egg cells and one named W in others.</p> The sperm cells of males always contain a Z chromosome. Thus, the joining of a Z and a W at fertilization leads to the hatching of a female bird.",
    "If a Z joins with another Z, the chick will be male. The W chromosome is small and has few genes but the Z chromosome has many genes.</p> In pigeons, for example, the Z chromosome, unlike the W chromosome, houses the gene that controls feather color.</p> ",
    "This gene comes in three alternative forms known as alleles, each determining one of three colors: ash-red, blue or brown. Female pigeons have just one Z chromosome and their color is determined by the allele in it.</p>Males have two alleles, one in each Z chromosome, and these alleles work together to determine their color.",
    "As girl pigeons always inherit their Z chromosome from the father, they always also inherit their color from the father, while boy pigeons inherit their color from the father only when the allele received from the father is dominant to the one from the mother. The ash-red allele is dominant to both blue and brown."
];

const welcomeScreenTextRus = [
    "Пол птиц определяют половые хромосомы в момент оплодотворения. У самок примерно в половине яйцеклеток находится половая хромосома, обозначаемая буквой Z, а в остальных — обозначаемая буквой W. У сперматозоидов самцов всегда наличествует Z-хромосома. Таким образом, если при оплодотворении сольются Z и W, то вылупится самка. Если же сольются Z и Z, то вылупится самец.",
    "W-хромосома маленькая, и в ней находится мало генов, а в Z-хромосоме много генов. Например, у голубей в Z-хромосоме находится ген, определяющий окраску перьев, которого в W-хромосоме нет. У этого гена три формы состояния, или аллели, которые определяют одну из трёх окрасок: бронзово-красную, серую или коричневую.",
    "У самки только одна Z-хромосома, и окраску птицы определяет аллель, находящаяся в ней. У самца две аллели, одна в обеих Z-хромосомах, и окраску птицы они определяют, воздействуя совместно.",
    "Поскольку птенцы-самки наследуют Z-хромосому всегда от отца, то и свою окраску они также наследуют всегда от отца. Однако птенцы-самцы наследуют окраску от отца лишь тогда, если полученная от отца аллель доминирует над аллелью, полученной от матери. Бронзово-красная аллель доминирует как над серой, так и над коричневой. Аллель серой окраски является доминантной по отношению к коричневой."
];


function back_to_menu() {
    document.location = "../index.html"
}

function chooseLang(langNr) {
    lang = langNr;
    document.getElementById("chooseLang").style.visibility = "hidden";
    startWelcomeScreenDialog()
}

function startWelcomeScreenDialog() {
    let welcome_screen_text = document.getElementById("welcome_screen_text");
    if (lang === 0) {
        welcome_screen_text.innerHTML=welcomeScreenText[0]
    } else if (lang === 1) {
        welcome_screen_text.innerHTML=welcomeScreenTextEng[0];
        document.getElementById("welcome_screen_header").innerHTML = "COLOR HERITAGE TO PIGEON CHICKS";
    } else {
        welcome_screen_text.innerHTML=welcomeScreenTextRus[0];
        document.getElementById("welcome_screen_header").innerHTML = "ПЁСТРОЕ НАСЛЕДИЕ У ПТЕНЦОВ ГОЛУБЕЙ";
    }

}

function welcomeScreenMoveForward() {
    welcomeScreenTextNr += 1;
    if (welcomeScreenTextNr >= 4) {
        //kutsu välja funktsioon, mis paneb järgmise screeni peale
        startPhase1();
    } else {
        let welcome_screen_text = document.getElementById("welcome_screen_text");
        if (lang === 0) {
            welcome_screen_text.innerHTML=welcomeScreenText[welcomeScreenTextNr]
        } else if (lang === 1) {
            welcome_screen_text.innerHTML=welcomeScreenTextEng[welcomeScreenTextNr]
        } else {
            welcome_screen_text.innerHTML=welcomeScreenTextRus[welcomeScreenTextNr]
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
        } else {
            welcome_screen_text.innerHTML=welcomeScreenTextRus[welcomeScreenTextNr]
        }
    }
}

async function startPhase1(){
    document.getElementById("welcome_screen").style.visibility = "hidden";
    phase = 1;
    document.getElementById("phase1").style.visibility = "visible";
    if (lang === 1) {
        document.getElementById("seletus_lahter").style.WebkitAnimation = "moveIn 0.1s forwards";
        document.getElementById("seletus_lahtri_tekst").innerHTML = "The male is ash-red and carries two different alleles: ash-red and brown." +
            "The female is blue and carries one allele - blue.</p>Touch the screen to continue!";
        document.getElementById("nimi_tekst").innerHTML = "GENETICS STUDENT";
        document.getElementById("tase_tekst").innerHTML = "LEVEL I";
    } else if (lang === 2) {
        document.getElementById("seletus_lahter").style.WebkitAnimation = "moveIn 0.1s forwards";
        document.getElementById("seletus_lahtri_tekst").innerHTML = "Самец — бронзово-красный, он является носителем двух разных аллелей: бронзово-красной и коричневой.</p>" +
            "Самка — серая, она является носителем одной аллели, серой.</p>Потомки этих голубей-родителей могут быть следующими.";
        document.getElementById("nimi_tekst").innerHTML = "ученик-генетик";
        document.getElementById("tase_tekst").innerHTML = "I уровень";
    }

    document.getElementById("phase1_video").play();

    console.log("video has now started");
    await sleep(1800);
    document.getElementById("phase1_video").pause();
    document.getElementById("clickable_screen").style.visibility = "visible";

    //document.getElementById("seletus_lahter").style.WebkitAnimation = "moveIn 1s forwards";

}

function startPhase2(){

    phase = 2;

    document.getElementById("phase1").style.visibility = "hidden";
    document.getElementById("phase2").style.visibility = "visible";
    document.getElementById("seletus_lahter").style.WebkitAnimation = "moveIn 1s forwards";
    document.getElementById("clickable_screen").style.visibility = "visible";


    if (lang === 0) {
        document.getElementById("seletus_lahtri_tekst").innerHTML = "Tõmba õiged vanemate geenid viimase järglase juurde! Vajuta ekraanile, et jätkata!";
        document.getElementById("nimi_tekst").innerHTML = "ALGAJA GENEETIK";
        document.getElementById("tase_tekst").innerHTML = "TASE II";
    } else if (lang === 1) {
        document.getElementById("seletus_lahtri_tekst").innerHTML = "Drag right genes to the last pigeon! Touch the screen to continue!";
        document.getElementById("nimi_tekst").innerHTML = "BEGINNER GENETICIST";
        document.getElementById("tase_tekst").innerHTML = "LEVEL II";
    } else {
        document.getElementById("seletus_lahtri_tekst").innerHTML = "Самец серый, и он является носителем двух разных аллелей: серой и коричневой.</p>" +
            "Самка бронзово-красная и является носителем одной, бронзово-красной аллели.</p>" +
            "Потомки этих голубей-родителей могут быть следующими.";
        document.getElementById("nimi_tekst").innerHTML = "начинающий генетик";
        document.getElementById("tase_tekst").innerHTML = "II уровень";
    }


}


function continuePhase2() {
    console.log("Continue Phase 2");
    document.getElementById("clickable_screen").style.visibility = "hidden";
}

function startPhase3() {

    console.log("Phase 3 started!");

    document.getElementById("phase2").style.visibility = "hidden";
    phase = 3;
    document.getElementById("phase3").style.webkitAnimation = "appElement 1s forwards";
    document.getElementById("seletus_lahter").style.WebkitAnimation = "moveIn 1s forwards";
    document.getElementById("clickable_screen").style.visibility = "visible";

    if (lang === 0) {
        document.getElementById("seletus_lahtri_tekst").innerHTML = "Tõmba vanemate geenid järglaste juurde! Vajuta ekraanile, et jätkata!";
        document.getElementById("nimi_tekst").innerHTML = "NOOR GENEETIK";
        document.getElementById("tase_tekst").innerHTML = "TASE III";
    } else if (lang === 1) {
        document.getElementById("seletus_lahtri_tekst").innerHTML = "Drag right genes to the offspring! Touch the screen to continue!";
        document.getElementById("nimi_tekst").innerHTML = "YOUNG GENETICIST";
        document.getElementById("tase_tekst").innerHTML = "LEVEL III";
    } else {
        document.getElementById("seletus_lahtri_tekst").innerHTML = "Какие потомки могут быть у этих голубей-родителей?";
        document.getElementById("nimi_tekst").innerHTML = "юный генетик";
        document.getElementById("tase_tekst").innerHTML = "III уровень";
    }



}

function startPhase4() {

    console.log("Phase 4 started!");

    document.getElementById("phase3").style.visibility = "hidden";
    phase = 4;
    document.getElementById("phase4").style.webkitAnimation = "appElement 1s forwards";
    document.getElementById("seletus_lahter").style.WebkitAnimation = "moveIn 1s forwards";
    document.getElementById("clickable_screen").style.visibility = "visible";


    if (lang === 0) {
        document.getElementById("seletus_lahtri_tekst").innerHTML = "Milliseid järglasi võivad need tuvivanemad saada? Aeg tiksub! Vasta kiiresti!";
        document.getElementById("nimi_tekst").innerHTML = "GEENIUURIJA";
        document.getElementById("tase_tekst").innerHTML = "TASE IV";
    } else if (lang === 1) {
        document.getElementById("seletus_lahtri_tekst").innerHTML = "What kinds of offspring could these parent pigeons have? Time is ticking away! You have to be fast.";
        document.getElementById("nimi_tekst").innerHTML = "GENE RESEARCHER";
        document.getElementById("tase_tekst").innerHTML = "LEVEL IV";
    } else {
        document.getElementById("seletus_lahtri_tekst").innerHTML = "Какие потомки могут быть у этих голубей-родителей? Время идёт! Ты должен действовать быстро.";
        document.getElementById("nimi_tekst").innerHTML = "генетик-исследователь";
        document.getElementById("tase_tekst").innerHTML = "IV уровень";
    }


    document.getElementById("timer").style.visibility = "visible";

    phase3NotAnswered = [["m1", "f1"], ["m1", "f2"], ["m2", "f1"], ["m2", "f2"], ["f1", "m1"], ["f1", "m2"], ["f2", "m1"], ["f2", "m2"]];
    phase3Answers = [{left: "", right: ""}, {left: "", right: ""}, {left: "", right: ""}, {left: "", right: ""}];
    phase3WrongAnswers = 0;

}

function startPhase5() {

    console.log("Phase 5 started!");

    document.getElementById("phase4").style.visibility = "hidden";
    phase = 5;
    document.getElementById("phase5").style.webkitAnimation = "appElement 1s forwards";
    document.getElementById("seletus_lahter").style.WebkitAnimation = "moveIn 1s forwards";
    document.getElementById("clickable_screen").style.visibility = "visible";

    if (lang === 0) {
        document.getElementById("seletus_lahtri_tekst").innerHTML = "Otsusta järglaste sugu nende värvuse järgi! Aeg tiksub! Vasta kiiresti! Iga vale vastus toob lisa aega!";
        document.getElementById("nimi_tekst").innerHTML = "MEISTER GENEETIK";
        document.getElementById("tase_tekst").innerHTML = "TASE V";
    } else if (lang === 1) {
        document.getElementById("seletus_lahtri_tekst").innerHTML = "Which alleles should the birds have in order that the offspring of a blue male and an ash-red female would have the opposite colors: the females would be blue and the males ash-red?";
        document.getElementById("nimi_tekst").innerHTML = "GENETICS EXPERT";
        document.getElementById("tase_tekst").innerHTML = "LEVEL V";
    } else {
        document.getElementById("seletus_lahtri_tekst").innerHTML = "Какими должны быть аллели птиц, чтобы окраска потомков серого самца и бронзово-красной самки была противоположной: самки серые, а самцы бронзово-красные?";
        document.getElementById("nimi_tekst").innerHTML = "генетик-мастер";
        document.getElementById("tase_tekst").innerHTML = "V уровень ";
    }


}


async function screenClicked() {
    document.getElementById("seletus_lahter").style.WebkitAnimation = "moveOut 2s forwards";
    document.getElementById("clickable_screen").style.visibility = "hidden";

    if (phase === 1) {
        document.getElementById("phase1_video").play();
        await sleep(20000);
        document.getElementById("phase1_video").pause();
        startPhase2();
    } else if (phase === 2) {
        continuePhase2();
    } else if (phase === 4 || phase === 5) {
        document.getElementById("timer").style.visibility = "visible";
        resumeTimer();
    }

}

async function phase1Clicked(index, place) {
    if (index === 1) {
        if (place === 1) {

            phase1Answers += 1;
            document.getElementById("phase1_krom11").style.webkitAnimation = "rightAnswerDropped 1s forwards";
            document.getElementById("phase1_new1").style.webkitAnimation = "toVisible 1s forwards";

        } else if (place === 2) {

            document.getElementById("phase1_krom12").style.webkitAnimation = "wrongAnswerDropped 1s forwards";

        }
    } else if (index === 2) {
        if (place === 1) {

            document.getElementById("phase1_krom21").style.webkitAnimation = "wrongAnswerDropped 1s forwards";

        } else if (place === 2) {

            phase1Answers += 1;
            document.getElementById("phase1_krom22").style.webkitAnimation = "rightAnswerDropped 1s forwards";
            document.getElementById("phase1_new2").style.webkitAnimation = "toVisible 1s forwards";

        }
    } else if (index === 3) {
        if (place === 1) {

            phase1Answers += 1;
            document.getElementById("phase1_krom31").style.webkitAnimation = "rightAnswerDropped 1s forwards";
            document.getElementById("phase1_new3").style.webkitAnimation = "toVisible 1s forwards";



        } else if (place === 2) {

            document.getElementById("phase1_krom32").style.webkitAnimation = "wrongAnswerDropped 1s forwards";

        }
    } else {
        if (place === 1) {
            phase1Answers += 1;
            document.getElementById("phase1_krom41").style.webkitAnimation = "rightAnswerDropped 1s forwards";
            document.getElementById("phase1_new4").style.webkitAnimation = "toVisible 1s forwards";
        } else if (place === 2) {

            document.getElementById("phase1_krom42").style.webkitAnimation = "wrongAnswerDropped 1s forwards";

        }
    }

    if (phase1Answers >= 4) {
        await sleep(1500);
        document.getElementById("phase1_edasi_nupp").style.webkitAnimation = "toVisible 1s forwards";
    }
}



// target elements with the "draggable" class
interact('.dragBig')
    .draggable({
        // enable inertial throwing
        inertia: true,
        // keep the element within the area of it's parent
        restrict: {
            restriction: { top: 100, left: 100, bottom: 1000, right: 1850 }
        },
        onstart: function (event) {
            console.log('onstart');
        },
        // call this function on every dragmove event
        onmove: dragMoveListener,
        // call this function on every dragend event
        onend: function (event) {
            console.log('onend');
        },
        snap: {
            targets: [
                //siia pane midagi, et snapiks
                {x: 393, y:677, range: 60},
                {x: 444, y:677, range: 60},
                {x: 773, y:677, range: 60},
                {x: 824, y:677, range: 60},
                {x: 1204, y:677, range: 60},
                {x: 1255, y:677, range: 60},
                {x: 1634, y:677, range: 60},
                {x: 1684, y:677, range: 60}
            ],
            relativePoints: [
                // snap relative to the element's top-left,
                { x: 0.5, y: 0.5 }   // to the center
                // and to the bottom-right
            ]
        }
    });

// target elements with the "draggable" class
interact('.dragSmall')
    .draggable({
        // enable inertial throwing
        inertia: true,
        // keep the element within the area of it's parent
        restrict: {
            restriction: { top: 100, left: 100, bottom: 1000, right: 1850 }
        },
        onstart: function (event) {
            console.log('onstart small');
        },
        // call this function on every dragmove event
        onmove: dragMoveListener,
        // call this function on every dragend event
        onend: function (event) {
            console.log('onend small');
        },
        snap: {
            targets: [
                //siia pane midagi, et snapiks
                {x: 393, y:677, range: 50},
                {x: 444, y:677, range: 50},
                {x: 773, y:676, range: 50},
                {x: 824, y:677, range: 50},
                {x: 1204, y:677, range: 50},
                {x: 1255, y:677, range: 50},
                {x: 1634, y:677, range: 50},
                {x: 1684, y:677, range: 50}
            ],
            relativePoints: [
                // snap relative to the element's top-left,
                { x: 0.5, y: 0.75 }   // to the center
                // and to the bottom-right
            ]
        }
    });


function dragMoveListener (event) {
    let target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
    // translate the element
    target.style.webkitTransform =
        target.style.transform =
            'translate(' + x + 'px, ' + y + 'px)';
    // update the position attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);

}

function ifFemaleChromosome(relatedTarget) {
    for (let i = 0; i < relatedTarget.classList.length; i++) {
        if (relatedTarget.classList[i] === "dragSmall") {
            return true;
        }
    }
    return false;
}


function compareArrays(array1, array2) {
    return array1.length === array2.length && array1.every(function(value, index) { return value === array2[index]})
}


function answerIsNotAnswered(index) {

    if (phase3Answers[index].left === "") {
        for (let i = 0; i < phase3NotAnswered.length; i++) {
            if (phase3NotAnswered[i][1] === phase3Answers[index].right) return true;
        }

    } else if (phase3Answers[index].right === "") {
        for (let i = 0; i < phase3NotAnswered.length; i++) {
            if (phase3NotAnswered[i][0] === phase3Answers[index].left) return true;
        }
    } else {
        for (let i = 0; i < phase3NotAnswered.length; i++) {
            let arr = [phase3Answers[index].left.toString(), phase3Answers[index].right.toString()];
            if (compareArrays(arr, phase3NotAnswered[i])) return true;
        }
    }
    return false;
}

async function registerDrop3(event) {

    let targetId = "5";

    for (let i = 0; i < event.relatedTarget.classList.length; i++) {
        targetId = event.relatedTarget.classList[i];
    }

    if (targetId === "5") {
        console.log("targetId is 5!!!!!!!!!")
    }

    if (event.target.id.charAt(12) === "1") {
        if (phase3Answers[Number(event.target.id.charAt(11)) - 1].left === "") {
            phase3Answers[Number(event.target.id.charAt(11)) - 1].left = targetId;
        }
    } else {
        if (phase3Answers[Number(event.target.id.charAt(11)) - 1].right === "") {
            phase3Answers[Number(event.target.id.charAt(11)) - 1].right = targetId;
        }
    }


    const index = Number(event.target.id.charAt(11)) - 1;
    let pair = phase3Answers[index];

    if (answerIsNotAnswered(index)) {

        if (pair.left !== "" && pair.right !== "") {

            let pair1Remove = [];
            let pair2Remove = [];
            pair1Remove.push(pair.left);
            pair2Remove.push(pair.right);
            pair1Remove.push(pair.right);
            pair2Remove.push(pair.left);
            phase3NotAnswered = phase3NotAnswered.filter(function(item) {
                return !compareArrays(item, pair1Remove)
            });
            phase3NotAnswered = phase3NotAnswered.filter(function(item) {
                return !compareArrays(item, pair2Remove)
            });

            let arr = [];
            arr.push(phase3Answers[index].left);
            arr.push(phase3Answers[index].right);

            console.log("index is " + (index + 1));

            if (compareArrays(arr, ["m1", "f1"]) || compareArrays(arr, ["m1", "f2"]) || compareArrays(arr, ["f1", "m1"]) || compareArrays(arr, ["f2", "m1"])) {
                document.getElementById("phase" + phase + "_new" + (index + 1)).src = "assets/tuvi%20pruun.png";
                document.getElementById("phase"+ phase + "_new" + (index + 1)).style.webkitAnimation = "toVisible 1s forwards";
            } else {
                document.getElementById("phase"+ phase + "_new" + (index + 1)).src = "assets/tuvi%20sinine.png";
                document.getElementById("phase"+ phase + "_new" + (index + 1)).style.webkitAnimation = "toVisible 1s forwards";
            }

            if (phase3NotAnswered.length === 0) {
                stopTimer();
                await sleep(1500);
                if (phase === 3) document.getElementById("phase3_edasi_nupp").style.visibility = "visible";
                else if (phase === 4) document.getElementById("phase4_edasi_nupp").style.visibility = "visible";
            }
        }

    } else {
        await sleep(1000);
        event.relatedTarget.style.webkitAnimation = "disElement 1s forwards";

        phase3WrongAnswers += 1;

        if (event.target.id.charAt(12) === "1") {
            phase3Answers[Number(event.target.id.charAt(11)) - 1].left = "";
        } else {
            phase3Answers[Number(event.target.id.charAt(11)) - 1].right = "";
        }

        if (phase3WrongAnswers >= 14) {
            document.getElementById("fail_screen").style.visibility = "visible";
            if (lang === 1) {
                document.getElementById("fail_screen_header").innerHTML = "Game over! You answered wrong too many times!";
                document.getElementById("fail_screen_restart").innerHTML = "Try again!";
            } if (lang === 2) {
                document.getElementById("fail_screen_header").innerHTML = "Игра окончена! Вы ответили неправильно слишком много раз!";
                document.getElementById("fail_screen_restart").innerHTML = "Попробуйте снова";
            }
        }
    }


}

function moveChrom(event) {
    let relatedTarget = event.relatedTarget,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(event.relatedTarget.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(event.relatedTarget.getAttribute('data-y')) || 0) + event.dy;

    if (ifFemaleChromosome(event.relatedTarget)) {
        event.relatedTarget.style.webkitTransform =
            event.relatedTarget.style.transform =
                'translate(' + (Number(relatedTarget.getAttribute('data-x')) + 16) + 'px, ' + (Number(relatedTarget.getAttribute('data-y')) + 150) + 'px)';
    } else {
        event.relatedTarget.style.webkitTransform =
            event.relatedTarget.style.transform =
                'translate(' + (Number(relatedTarget.getAttribute('data-x')) + 16) + 'px, ' + (Number(relatedTarget.getAttribute('data-y')) + 72) + 'px)';
    }


    // update the position attributes
    relatedTarget.setAttribute('data-x', x);
    relatedTarget.setAttribute('data-y', y);

    event.relatedTarget.style.WebkitAnimation = "kromDropped 1s forwards";
}

function phase5MoveThings(index) {
    let krom1 = document.getElementById("phase5_krom" + index.toString() + "1");
    let krom2 = document.getElementById("phase5_krom" + index.toString() + "2");
    let tah1 = document.getElementById("phase5_tah" + index.toString() + "1");
    let tah2 = document.getElementById("phase5_tah" + index.toString() + "2");

    krom1.style.webkitAnimation = "toVisible 2s forwards";
    krom1.style.visibility = "visible";
    krom1.style.webkitTransform = 'translate(20px, 0px)';
    krom2.style.webkitAnimation = "toVisible 2s forwards";
    krom2.style.visibility = "visible";
    krom2.style.webkitTransform = 'translate(20px, 0px)';
    tah1.style.webkitAnimation = "toVisible 2s forwards";
    tah1.style.visibility = "visible";
    tah1.style.webkitTransform = 'translate(20px, 0px)';
    tah2.style.webkitAnimation = "toVisible 2s forwards";
    tah2.style.visibility = "visible";
    tah2.style.webkitTransform = 'translate(20px, 0px)';
}

async function phase5Clicked(index, place) {
    if (index === 1) {
        if (place === 1) {
            needToAddTime = true;
            document.getElementById("phase5_sugu11").style.webkitAnimation = "toInvisible 1s forwards";
        } else if (place === 2) {

            phase5Answers += 1;

            console.log("phase5_krom" + index.toString() + "1");

            document.getElementById("phase5_sugu11").style.webkitAnimation = "toInvisible 1s forwards";

            phase5MoveThings(index);
        }
    } else if (index === 2) {
        if (place === 1) {

            phase5Answers += 1;

            document.getElementById("phase5_sugu22").style.webkitAnimation = "toInvisible 1s forwards";

            phase5MoveThings(index);

        } else if (place === 2) {
            needToAddTime = true;
            document.getElementById("phase5_sugu22").style.webkitAnimation = "toInvisible 1s forwards";
        }
    } else if (index === 3) {
        if (place === 1) {

            phase5Answers += 1;

            document.getElementById("phase5_sugu32").style.webkitAnimation = "toInvisible 1s forwards";

            phase5MoveThings(index);

        } else if (place === 2) {
            needToAddTime = true;
            document.getElementById("phase5_sugu32").style.webkitAnimation = "toInvisible 1s forwards";
        }
    } else {
        if (place === 1) {
            needToAddTime = true;
            document.getElementById("phase5_sugu41").style.webkitAnimation = "toInvisible 1s forwards";
        } else if (place === 2) {

            phase5Answers += 1;

            console.log("phase5_krom" + index.toString() + "1");

            document.getElementById("phase5_sugu41").style.webkitAnimation = "toInvisible 1s forwards";

            phase5MoveThings(index);
        }
    }

    if (phase5Answers >= 4) {
        stopTimer();
        await sleep(1000);
        document.getElementById("endScreen").style.visibility = "visible";
        if (lang === 0) {
            document.getElementById("endScreenScore").innerHTML = "Sul kulus " + currentTimerTime + " sekundit!";
        } else if (lang === 1) {
            document.getElementById("endScreenScore").innerHTML = "It took you " + currentTimerTime + " seconds!";
            document.getElementById("endScreenCongratz").innerHTML = "Game over! Congratulations!";
            document.getElementById("restartGame").innerHTML = "Play again!";
        } else {
            document.getElementById("endScreenScore").innerHTML = "Ваше время " + currentTimerTime + " секунд!";
            document.getElementById("endScreenCongratz").innerHTML = "Игра окончена! Поздравляем!";
            document.getElementById("restartGame").innerHTML = "Играть снова!";
        }

    }
}

function registerDrop2(event) {
    let targetId = "5";
    for (let i = 0; i < event.relatedTarget.classList.length; i++) {
        targetId = event.relatedTarget.classList[i];
    }
    if (targetId === "5") {
        console.log("targetId is 5!!!!!!!!!")
    }

    console.log("targetid is: " + targetId);

    if (targetId === "m2" && phase2Answers !== "m2") {
        phase2Answers = "m2";
        return true;
    } else if (targetId === "f1" && phase2Answers !== "f1") {
        phase2Answers = "f1";
        return true;
    }

    return false;
}

interact('.dropzone').dropzone({
    // only accept elements matching this CSS selector
    accept: '.draggable',
    overlap: 0.9,

    // listen for drop related events:
    ondrop: async function (event) {



        moveChrom(event);

        if (phase === 2) {

            if (registerDrop2(event)) {
                phase2AnswersCount += 1;
            } else {
                event.relatedTarget.style.webkitAnimation = "disElement 1s forwards";
            }

            if (phase2AnswersCount >= 2) {

                document.getElementById("phase2_new4").style.webkitAnimation = "toVisible 1s forwards";
                document.getElementById("phase2_krom_tah41").style.webkitAnimation = "toVisible 1s forwards";
                document.getElementById("phase2_krom_tah42").style.webkitAnimation = "toVisible 1s forwards";

                await sleep(1500);
                document.getElementById("phase2_edasi_nupp").style.visibility = "visible";
            }
        } else {
            registerDrop3(event);
        }

        //make dropped target undraggable'

        event.relatedTarget.classList.remove("dragBig");
        event.relatedTarget.classList.remove("dragSmall");




        console.log("ondrop");
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

/*
to reset animations!
event.relatedTarget.style.animation = 'none';
event.relatedTarget.offsetHeight; // trigger reflow
event.relatedTarget.style.animation = null;
*/

function restartGame() {
    window.location = "../index.html";
}
