<!DOCTYPE html>
<html lang="fr">
    <head>
        <title>Quiz Player</title>
        <meta charset="utf-8">
        <link rel="stylesheet" href="css/main.css">
        <link rel="stylesheet" href="css/button.css">
        <link rel="stylesheet" href="css/sort.css">
        <link rel="stylesheet" href="css/drag.css">
        <link rel="stylesheet" href="css/entry.css">
        <link rel="stylesheet" href="prism/prism.css">
        <link rel="stylesheet" href="css/alert.css">
        <script src="js/alert.js"></script>
        <script src="js/sort.js"></script>
        <script src="js/drag.js"></script>
        <script src="json/{{name}}.json"></script>    <!-- {{name}} for bottle -->
        
        
        <script>
            let TIMER;
            let count = 0;
            var questionNumber=0;
            var numberOfQuestions;
            var questionTime = 0; //s
            var counter = null;
            var timeGauge = null;
            const gaugeWidth = 160;
            var gaugeUnit;
            var stage1;
            var jsonHead;
            var json;
            var tabIndice = [];
            var score=0;
            var questionLock=false;
            var questionSort=false;
            var lock = null;
            var nomEleve = null;
            var points = 0;
            var total = 0;
            var examId;
            var Alert;
            var overlay;
            var box;
            var message;
            var clsBtn;
            
            
            
            
            window.onload = function(){
              init();  
            };
            
            function init(){
            
                /*Alert*/
                overlay = document.getElementById("overlay");
                box = document.getElementById("box");
                message = document.getElementById("message");
                clsBtn = document.getElementById("box-btn");
                Alert = new customAlert();
                /*******/
                
                document.getElementById("textStart").onkeydown=function(e){
                    if(e.keyCode == 13 && document.getElementById("textStart").value != "")
                        start();
                };
                document.getElementById("btnStart").onclick=function(){
                    if(document.getElementById("textStart").value != "")
                        start();
                    else
                        document.getElementById("textStart").focus();
                };
                
                
                if (typeof head == "undefined" || typeof data == "undefined"){
                    Alert.render("Vérifier l'URL!<br>Fichier JSON inaccessible ou corrempu.")
                    return;
                }
                
                
                lock = document.getElementById("lock");
                counter = document.getElementById("counter");
                timeGauge = document.getElementById("timeGauge");
                stage1 = document.getElementById("game1");
                jsonHead = JSON.parse(head);
                json = JSON.parse(data);
                numberOfQuestions=json.length;
                
                document.getElementById("title").innerHTML = jsonHead.title;
                document.getElementById("textStart").focus();
                
                
                function start(){
                    
                    if (typeof head == "undefined" || typeof data == "undefined"){
                        Alert.render("Vérifier l'URL!<br>Fichier JSON inaccessible ou corrempu.")
                        return;
                    }
                    
                    nomEleve = document.getElementById("textStart").value.replace(/</gi, '&#60;').replace(/>/gi, '&#62;');
                    examId = nomEleve + "-" + jsonHead.quizid;
                    if(jsonHead.norepeat == true && localStorage.getItem(examId) == "ok"){
                        Alert.render('Le quiz est en mode examen !');
                    }
                    else{
                        if(jsonHead.norepeat == true)
                            localStorage.setItem(examId, "ok");
                        
                        document.getElementById("eleve").innerHTML = nomEleve;
                        document.getElementById("start").style = "display:none";
                        document.getElementById("quiz").style = "display:block";
                        
                        renderCounter();
                        TIMER = setInterval(renderCounter,1000); // 1000ms
                    }
                }
                
                scrambleDatabase();
                displayQuestion();
            }
            
            function scrambleDatabase(){
                for(i=0;i<json.length;i++)
                    tabIndice[i] = i;
                for(i=0;i<json.length+5;i++){
                    var rnd1=Math.floor(Math.random()*json.length);
                    var rnd2=Math.floor(Math.random()*json.length);
                    var temp=tabIndice[rnd1];
                    tabIndice[rnd1]=tabIndice[rnd2];
                    tabIndice[rnd2]=temp;
                }
            }//scdb
            
            function displayQuestion(){
                //var rnd=Math.random()*json[questionNumber].options.length;
                //rnd=Math.ceil(rnd);
                var reponse = [];
                var tabI = [];
                var oneCorrecte;
                var options = null;
                var elms = null;
                var tabIRepDrag = [];
                
                if(json[tabIndice[questionNumber]].points == "1")
                    document.getElementById("point").innerHTML = json[tabIndice[questionNumber]].points + " point";
                else
                    document.getElementById("point").innerHTML = json[tabIndice[questionNumber]].points + " points";
                
                questionTime = json[tabIndice[questionNumber]].temps;
                gaugeUnit = gaugeWidth / questionTime;
                document.getElementById("time").innerHTML = questionTime;
                
                for(i=0; i<json[tabIndice[questionNumber]].options.length; i++)
                    tabI[i] = i;
                for(i=0; i<tabI.length+5; i++){
                    var rnd1=Math.floor(Math.random()*tabI.length);
                    var rnd2=Math.floor(Math.random()*tabI.length);
                    var temp=tabI[rnd1];
                    tabI[rnd1]=tabI[rnd2];
                    tabI[rnd2]=temp;
                }
                
                oneCorrecte = tabI[0];
                for(i=0; i<json[tabIndice[questionNumber]].options.length; i++){
                    reponse[tabI[i]] = json[tabIndice[questionNumber]].options[i];
                }
                
                var innerHTML = '';
                if(json[tabIndice[questionNumber]].code == '')
                    innerHTML += '<div class="questionText">' + json[tabIndice[questionNumber]].question  + '</div>';
                else
                    innerHTML += '<div class="questionText">' + json[tabIndice[questionNumber]].question +'<div  style="all: initial;"><pre><code class="language-'+ json[tabIndice[questionNumber]].lang +'">'+json[tabIndice[questionNumber]].code+'</code></pre></div>'+ '</div>';
                innerHTML += '<div id="options" class="options">';

                
                switch (json[tabIndice[questionNumber]].type){
                    case "one":
                        for(i=0; i<reponse.length; i++){
                            innerHTML +='<input data-rang="' + i + '" id="' + tabIndice[questionNumber] + 'r' + tabI[i] + '" type="radio" name="radio" class="check">' +
                            '<label id="' + tabIndice[questionNumber] + 'l' + tabI[i] + '" for="' + tabIndice[questionNumber] + 'r' + tabI[i] + '" class="label-check">' + json[tabIndice[questionNumber]].options[tabI[i]] + '</label>';
                        }
                        break;
                    
                    case "multi":
                        for(i=0; i<reponse.length; i++){
                            innerHTML +='<input data-ok="' + json[tabIndice[questionNumber]].options[tabI[i]][1] + '" id="' + tabIndice[questionNumber] + 'r' + tabI[i] + '" type="checkbox" class="check">' +
                            '<label for="' + tabIndice[questionNumber] + 'r' + tabI[i] + '" class="label-check">' + json[tabIndice[questionNumber]].options[tabI[i]][0] + '</label>';
                        }
                        break;
                    
                    case "drag":
                        document.addEventListener("mousemove", dragMove, false);
                        for(i=0; i<reponse.length; i++)
                            tabIRepDrag[i] = i;
                        for(i=0; i<reponse.length+5; i++){
                            let rand1=Math.floor(Math.random()*reponse.length);
                            let rand2=Math.floor(Math.random()*reponse.length);
                            let temp=tabIRepDrag[rand1];
                            tabIRepDrag[rand1]=tabIRepDrag[rand2];
                            tabIRepDrag[rand2]=temp;
                        }
                        
                        innerHTML += '<div id="drag-container">';
                        for(i=0; i<reponse.length; i++){
                            //innerHTML +='<div id="q-svg-' + i + '" class="contenersvg" style="top: ' + (i*85) + 'px; left: 0px">' +
                            //                '<svg width="345" height="90" fill="url(#Gradient1)" xmlns="http://www.w3.org/2000/svg" version="1.1">' +
                            //                    '<path class="shadow-svg-1 pathsvg" stroke-width="0" stroke="#ccc" d="M 335 35 L 335 15 C 335 12, 333 10, 330 10 L 15 10 C 12 10, 10 12, 10 15 L 10 75 C 10 78, 12 80, 15 80 L 330 80 C 333 80, 335 78, 335 75 L 335 55 C 335 50, 325 50, 325 55 C 325 60, 315 60, 315 57 C 310 50, 310 40, 315 33 C 315 30, 325 30, 325 35 C 325 40, 335 40, 335 35"/>' +
                            //                '</svg>' +
                            //                '<span class="textsvg text-q">' + reponse[i][0] + '</span>' +
                            //            '</div>';
                            //
                            innerHTML +='<div data-dragnb="'+i+'" id="q-svg-' + i + '" class="contenersvg" style="top: ' + (i*75) + 'px; left: 0px">' +
                                            '<svg width="315" height="70" fill="url(#Gradient1)" xmlns="http://www.w3.org/2000/svg" version="1.1">' +
                                                '<path class="shadow-svg-1 pathsvg" stroke-width="0" stroke="#ccc" d="M 310 25 L 310 10 C 310 7, 308 5, 305 5 L 10 5 C 7 5, 5 7, 5 10 L 5 60 C 5 63, 7 65, 10 65 L 305 65 C 308 65, 310 63, 310 60 L 310 45 C 310 40, 300 40, 300 45 C 300 50, 290 50, 290 47 C 285 40, 285 30, 290 23 C 290 20, 300 20, 300 25 C 300 30, 310 30, 310 25"/>' +
                                            '</svg>' +
                                            '<span class="textsvg text-q">' + reponse[i][0] + '</span>' +
                                        '</div>';
                            
                            //innerHTML +='<div id="r-svg-' + i + '" class="contenersvg" style="z-index: 0; top: '+ (i*85) +'px; left: 350px">' +
                            //                '<svg width="345" height="90" fill="url(#Gradient1)" xmlns="http://www.w3.org/2000/svg" version="1.1">' +
                            //                    '<path class="shadow-svg-1 pathsvg" stroke-width="0" stroke="#ccc" d="M 35 35 L 35 15 C 35 12, 37 10, 40 10 L 330 10 C 333 10, 335 12, 335 15 L 335 75 C 335 78, 333 80, 330 80 L 40 80 C 37 80, 35 78, 35 75 L 35 55 C 35 50, 25 50, 25 55 C 25 60, 15 60, 15 57 C 10 50, 10 40, 15 33 C 15 30, 25 30, 25 35 C 25 40, 35 40, 35 35"/>' +
                            //                '</svg>' +
                            //                '<span class="textsvg text-r">' + reponse[i][1] + '</span>' +
                            //            '</div>';
                            innerHTML +='<div data-dragnb="'+i+'" id="r-svg-' + i + '" class="contenersvg" style="z-index: 0; top: '+ (i*75) +'px; left: 370px">' +
                                            '<svg width="315" height="70" fill="url(#Gradient1)" xmlns="http://www.w3.org/2000/svg" version="1.1">' +
                                                '<path class="shadow-svg-1 pathsvg" stroke-width="0" stroke="#ccc" d="M 30 25 L 30 10 C 30 7, 32 5, 35 5 L 305 5 C 308 5, 310 7, 310 10 L 310 60 C 310 63, 308 65, 305 65 L 35 65 C 32 65, 30 63, 30 60 L 30 45 C 30 40, 20 40, 20 45 C 20 50, 10 50, 10 47 C 5 40, 5 30, 10 23 C 10 20, 20 20, 20 25 C 20 30, 30 30, 30 25"/>' +
                                            '</svg>' +
                                            '<span class="textsvg text-r">' + reponse[tabIRepDrag[i]][1] + '</span>' +
                                        '</div>';
                        }
                        
                        var dragHeight = i*75;
                        
                        innerHTML += '</div>';
                        break;
                    
                    case "sort":
                        questionSort = true;
                        document.addEventListener("mousemove", move, false);
                        innerHTML += '<ul id="ord">';
                        for(i=0; i<reponse.length; i++){
                            innerHTML += '<li data-sort="' + i + '" class="item" id="' + tabIndice[questionNumber] + 'r' + i + '">' + reponse[i] + '</li>';
                        }
                        innerHTML += '</ul><div id="item-div" class="div-shadow" style="display: none;">No Element</div>';
                        
                        
                        break;
                    
                    case "entry":
                        innerHTML += '<ol>';
                        for(i=0; i<reponse[0][0]; i++){
                            innerHTML += '<li class="li-entry" type="1"><input type="text" size="40" class="entry" id="' + tabIndice[questionNumber] + 'r' + i + '"></li>';
                        }
                        innerHTML += '</ol>';
                        break;
                }
                
                
                innerHTML += '</div>';

                stage1.innerHTML = innerHTML;
                
                tag = document.createElement('script');
                tag.setAttribute("src", "prism/prism.js");
                document.getElementsByTagName('head')[0].appendChild(tag);
                
                if(json[tabIndice[questionNumber]].type == "drag")
                    document.getElementById("drag-container").style.height = dragHeight + "px";
                document.getElementById("score").innerHTML = score + " / " + (questionNumber + 1) + " / " + numberOfQuestions;
                
                
                
                document.getElementById('confirm').onclick=function(){
                    var ok = true;
                    
                    if(questionLock==false){
                        if(json[tabIndice[questionNumber]].type == "one"){
                            radioCheckedElement = document.querySelector('input[name=radio]:checked');
                            if(!radioCheckedElement || tabI[parseInt(radioCheckedElement.id.substring(radioCheckedElement.id.indexOf("r")+1))] != oneCorrecte)
                                ok = false;
                            
                    //*ok*/ let numQuestInQuiz = questionNumber;
                    //*ok*/ let numQuestInJson = tabIndice[questionNumber];
                    //*ok*/ let numRepInQuiz = parseInt(radioCheckedElement.getAttribute('data-rang'));
                    //*ok*/ let numRepINJson = parseInt(radioCheckedElement.id.substring(radioCheckedElement.id.indexOf("r")+1));
                    //      let tabQuestJson = []    //q1 q2 q3 ... qn    in json avec for
                          //console.log("numQuestInQuiz : " + numQuestInQuiz);
                          //console.log("numQuestInJson : " + numQuestInJson);
                          //console.log("numRepInQuiz : " + numRepInQuiz);
                          //console.log("numRepINJson : " + numRepINJson);
                            //            numQuestInQuiz     -       numQuestInJson
                            //console.log(questionNumber + " - " + tabIndice[questionNumber]);
              
                    //----> nomEleve, jsonHead.quizid, numQuestInJson, numRepINJson
                    //->    //let tag = document.createElement('script');
                    //----> //tag.setAttribute("src", "reponse/" + nomEleve + "/" + jsonHead.quizid + "/" + numQuestInJson + "/" + numRepINJson);
                    //->    //document.getElementsByTagName('head')[0].appendChild(tag);
                            
                            /*for(i=0; i<reponse.length; i++){
                                label = document.getElementById(tabIndice[questionNumber] + "l" + i);
                                //console.log(label.textContent + "\n");
                                //let n_ = id.substring(0, id.indexOf("l"));
                                //let _n = id.substring(id.indexOf("l")+1);
                            }*/
                            //-->console.log(radioCheckedElement.labels[0].textContent);
                        }
                        else if(json[tabIndice[questionNumber]].type == "multi"){
                            options = document.getElementById("options");
                            elms = options.getElementsByClassName('check');
                            let i = 0;
                            while(i<elms.length && ok){
                                if(""+elms[i].checked != elms[i].getAttribute('data-ok'))
                                    ok = false;
                                i++;
                            }
                            
                            
                            
                        }
                        else if(json[tabIndice[questionNumber]].type == "drag"){
                            ok = false;
                            
                            let nbROk = 0;
                            for (let id in tabR) {
                                if (tabR.hasOwnProperty(id)) {
                                    q = document.getElementById(id);
                                    r = document.getElementById(tabR[id]);
                                    
                                    if(r && q.getAttribute('data-dragnb') == tabIRepDrag[r.getAttribute('data-dragnb')]){
                                        ok = true;
                                        nbROk ++;
                                    }
                                }
                            }
                            ok = ok && reponse.length == nbROk;
                            document.removeEventListener("mousemove", dragMove, false);
                        }
                        else if(json[tabIndice[questionNumber]].type == "sort"){
                            options = document.getElementById("options");
                            elms = options.getElementsByClassName('item');
                            let i = 0;
                            while(i<elms.length && ok){
                                if(""+tabI[i] != elms[i].getAttribute('data-sort'))
                                    ok = false;
                                i++;
                            }
                            document.removeEventListener("mousemove", move, false);
                        }
                        else if(json[tabIndice[questionNumber]].type == "entry"){
                            options = document.getElementById("options");
                            elms = options.getElementsByClassName('entry');
                            let i = 0;
                            let entryTab = [];
                            while(i<elms.length && ok){
                                elms[i].blur();
                                if(json[tabIndice[questionNumber]].options[0].indexOf(elms[i].value.replace(/"/gi, '\"').replace(/</gi, '&#60;').replace(/>/gi, '&#62;').toUpperCase()) < 0)
                                    ok = false;
                                else{
                                    if(entryTab.indexOf(elms[i].value) < 0)
                                        entryTab.push(elms[i].value);
                                    else
                                        ok = false;
                                }
                                i++;
                            }
                        }
                        
                        
                        if(ok){
                            lock.style.display = "block";
                            lock.style.height = document.getElementById("colon2").getBoundingClientRect().height + "px";
                            lock.innerHTML = '<div class="feedback1">CORRECTE</div>';
                            score++;
                            points += parseInt(json[tabIndice[questionNumber]].points);
                        }
                        else{
                            lock.style.display = "block";
                            lock.style.height = document.getElementById("colon2").getBoundingClientRect().height + "px";
                            lock.innerHTML = '<div class="feedback2">INCORRECTE</div>';
                        }
                        total += parseInt(json[tabIndice[questionNumber]].points);
                        document.getElementById("note").innerHTML = points + "/" + total;
                        questionLock=true;
                        document.getElementById("score").innerHTML = score + " / " + (questionNumber + 1) + " / " + numberOfQuestions;
                        setTimeout(function() {
                            changeQuestion();
                        }, 2000);
                    }
                };
            }//display question
            
            function renderCounter(){
                if(count <= questionTime){
                    if(!questionLock){
                        counter.innerHTML = count;
                        timeGauge.style.width = count * gaugeUnit + "px";
                        count++;
                    }
                    else
                        count=0;
               }else{
                    count = 0;
                    if(!questionLock){
                        if(questionSort){
                            questionSort = false;
                            document.removeEventListener("mousemove", move, false);
                        }
                        if(json[tabIndice[questionNumber]].type == "drag"){
                            document.removeEventListener("mousemove", dragMove, false);
                        }
                        
                        lock.style.display = "block";
                        lock.style.height = document.getElementById("colon2").getBoundingClientRect().height + "px";
                        lock.innerHTML = '<div class="feedback3">Temps écoulé</div>';
                        questionLock=true;
                        total += parseInt(json[tabIndice[questionNumber]].points);
                        document.getElementById("note").innerHTML = points + "/" + total;
                        
                        setTimeout(function() {
                            changeQuestion();
                        }, 2000);
                    }
                }
            }
            
            function changeQuestion(){
                questionNumber++;
                
                let newElm = stage1.cloneNode(true);
                stage1.parentNode.replaceChild(newElm, stage1);
                stage1 = newElm;
                stage1.className = "fadeOutIn";
                
                setTimeout(function() {
                    /************/
                    if(questionNumber>=numberOfQuestions){
                        clearInterval(TIMER);
                        displayFinalSlide();
                    }
                    else
                        displayQuestion();
                    /************/
                    lock.style.display = "none";
                }, 500);
                setTimeout(function() {
                    questionLock=false;
                }, 1000);
            }
            
            function displayFinalSlide(){
                stage1.innerHTML = '';
                document.getElementById('confirm').onclick=function(){};
                stage1.innerHTML += '<div class="result"><br>Vous avez terminé le quiz !</div>' +
                '<div style="font-size: 24px; margin-top: 60px; color: #666;">' +
                '<div>Total des questions : ' + numberOfQuestions + '</div>' +
                '<div style="margin-top: 15px;">Nombre de questions correctes : ' + score + '</div>' +
                '<div style="margin-top: 15px;">Votre note est : <span style="margin-left: 20px;font-family: arial; font-size: 70px; font-weight: bolt;">' + points + '/' + total + '</span></div>' +
                '</div>';
                


                        let tag = document.createElement('script');
                        tag.setAttribute("src", "note/" + nomEleve + "/" + jsonHead.quizid + "/" + jsonHead.subTitle + "/" + points + "/" + total);
                        document.getElementsByTagName('head')[0].appendChild(tag);
                        sendNote = true;
            }
            
        </script>
    </head>
    <body>
        <!-- Alert box -->
        <div id="overlay"></div>
        <div id="box">
            <div id="box-head">Alert !</div>
            <div id="box-body">
                <p id="message"></p>
            </div>
            <div id="box-footer">
                <button id="box-btn" onclick="Alert.ok(); document.getElementById('textStart').focus();">Close</button>
            </div>
        </div>
        <!--- end box -->
        <div class="contener">
            <div id="start">
                <div id="title"></div>
                <div id="btnstart">
                    <input id="textStart" type="text" placeholder="Saisir votre nom">
                    <div id="btnStart"><br>Démarrer le<br>Quiz !</div>
                </div>
            </div>
            <div id="quiz">
                <div class="colon1">
                    <div class="logo"></div>
                    
                    <div id="counter">0</div>
                    <div class="bgprogress"></div>
                    <div class="progress" id="timeGauge"></div>
                    <div id="time">20</div>
                    <div id="notezone"><span id="note">0/0</span><div id="point">3 points</div><div id="eleve">Ahmed</div></div>
                </div>
                
                <div class="colon2" id="colon2">
                    <div id="navContent">
                        <div id="lock"></div>
                        <div id="game1"></div>
                        <!--div id="game2"></div-->  
                    </div>
                    <div id="confirm"> Vérifier </div>
                    <div id="score">04 / 05 / 10</div>
                </div>
            </div>
        </div>
        
        
        
        
        
        
        <svg width="0px" height="0px">
            <defs>
                <linearGradient id="Gradient1" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stop-color="#fff"/>
                    <stop offset="100%" stop-color="#f0f0f0"/>
                </linearGradient>
                <linearGradient id="Gradient2" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stop-color="#ffa"/>
                    <stop offset="100%" stop-color="#fe9"/>
                </linearGradient>
            </defs>
        </svg>
    </body>
</html>
