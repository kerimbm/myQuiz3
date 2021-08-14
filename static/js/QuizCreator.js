            
            
            var nbq=0;
            var nbrep=[];
            var jsonFile = null;
            
            
            r_one = `
            <p id="p{_rnb}{_qnb}">
                <label for="w{_rnb}{_qnb}">Incorrecte {_rnb} :</label>
                <input type="text" id="w{_rnb}{_qnb}" size="40" class="inputtext">
                <input type="button" id="a{_qnb}" class="btn" value="Ajouter réponse" onclick="ajouter_reponse(this);">
                <input type="button" id="d{_qnb}" class="btn" value="Supprimer" onclick="supprimer_reponse(this);">
            </p>
            `;
            r_multi = `
            <p id="p{_rnb}{_qnb}">
                <label for="m{_rnb}{_qnb}">Réponse {_rnbplusun} :</label>
                <input type="text" id="m{_rnb}{_qnb}" size="30" class="inputtext">
                <input type="checkbox" name="check{_qnb}" id="k{_rnb}{_qnb}">
                <label for="k{_rnb}{_qnb}">Correcte</label>
                <input type="button" id="a{_qnb}" class="btn" value="Ajouter réponse" onclick="ajouter_reponse(this);">
                <input type="button" id="d{_qnb}" class="btn" value="Supprimer" onclick="supprimer_reponse(this);">
            </p>
            `;
            r_drag = `
            <p id="p{_rnb}{_qnb}">
                <label for="o{_rnb}{_qnb}">Option {_rnbplusun} :</label>
                <input type="text" id="o{_rnb}{_qnb}" size="19" class="inputtext">
                <label for="r{_rnb}{_qnb}"> => </label>
                <input type="text" id="r{_rnb}{_qnb}" size="19" class="inputtext">
                <input type="button" id="a{_qnb}" class="btn" value="Ajouter réponse" onclick="ajouter_reponse(this);">
                <input type="button" id="d{_qnb}" class="btn" value="Supprimer" onclick="supprimer_reponse(this);">
            </p>
            `;
            r_sort = `
            <p id="p{_rnb}{_qnb}">
                <label for="s{_rnb}{_qnb}">Option {_rnbplusun} :</label>
                <input type="text" id="s{_rnb}{_qnb}" size="40" class="inputtext">
                <input type="button" id="a{_qnb}" class="btn" value="Ajouter réponse" onclick="ajouter_reponse(this);">
                <input type="button" id="d{_qnb}" class="btn" value="Supprimer" onclick="supprimer_reponse(this);">
            </p>
            `;
            
            r_entry = `
            <p id="p{_rnb}{_qnb}">
                <label for="e{_rnb}{_qnb}">Valeur acceptée {_rnb} :</label>
                <input type="text" id="e{_rnb}{_qnb}" size="34" class="inputtext code">
                <input type="button" id="a{_qnb}" class="btn" value="Ajouter réponse" onclick="ajouter_reponse(this);">
                <input type="button" id="d{_qnb}" class="btn" value="Supprimer" onclick="supprimer_reponse(this);">
            </p>
            `;
            
            one = `
            <Label>Choisir le type de question : </Label>
            <select id="qlist{_qnb}" onchange="changer(event, this.parentNode.id);" class="inputtext">
                <option value="one" selected>Choix unique</option>
                <option value="multi">Choix multiple</option>
                <option value="drag">Glisser déposer</option>
                <option value="sort">Ordonnée</option>
                <option value="entry">Saisie</option>
            </select>
            <p>
                <label for="points{_qnb}">Note : </label>
                <input id="points{_qnb}" size="4" value="2" class="inputtext"></input>
                <label for="temps{_qnb}">Temps (en seconde) : </label>
                <input id="temps{_qnb}" size="4" value="20" class="inputtext"></input>
            </p>
            <p>
                <label for="qhead{_qnb}">Votre Question :</label>
                <textarea id="qhead{_qnb}" rows="2" cols="60" class="inputtext"></textarea>
            </p>
            <p>
                <label for="code{_qnb}">Ajouter du code ?</label>
                <textarea id="code{_qnb}" rows="2" cols="60" class="inputtext code" spellcheck="false"></textarea>
                <br><span style="margin-left: 140px;"></span>
                <input type="radio" name="lang{_qnb}" value="python" id="lang{_qnb}0" checked> <label for="lang{_qnb}0">Python</label>
                <input type="radio" name="lang{_qnb}" value="html" id="lang{_qnb}1"> <label for="lang{_qnb}1">HTML</label>
                <input type="radio" name="lang{_qnb}" value="css" id="lang{_qnb}2"> <label for="lang{_qnb}2">CSS</label>
                <input type="radio" name="lang{_qnb}" value="javascript" id="lang{_qnb}3"> <label for="lang{_qnb}3">Javascript</label>
                <input type="radio" name="lang{_qnb}" value="php" id="lang{_qnb}4"> <label for="lang{_qnb}4">Php</label>
                <input type="radio" name="lang{_qnb}" value="pascal" id="lang{_qnb}5"> <label for="lang{_qnb}5">Pascal</label>
            </p>
            <p>
                <label for="c0{_qnb}">Correcte :</label>
                <input type="text" id="c0{_qnb}" size="40" class="inputtext">
            </p>
            <p id="p1{_qnb}">
                <label for="w1{_qnb}">Incorrecte 1 :</label>
                <input type="text" id="w1{_qnb}" size="40" class="inputtext">
                <input type="button" id="a{_qnb}" class="btn" value="Ajouter réponse" onclick="ajouter_reponse(this);">
            </p>
        `;
            multi = `
            <Label>Choisir le type de question : </Label>
            <select id="qlist{_qnb}" onchange="changer(event, this.parentNode.id);" class="inputtext">
                <option value="one">Choix unique</option>
                <option value="multi" selected>Choix multiple</option>
                <option value="drag">Glisser déposer</option>
                <option value="sort">Ordonnée</option>
                <option value="entry">Saisie</option>
            </select>
            <p>
                <label for="points{_qnb}">Note : </label>
                <input id="points{_qnb}" size="4" value="2" class="inputtext"></input>
                <label for="temps{_qnb}">Temps (en seconde) : </label>
                <input id="temps{_qnb}" size="4" value="20" class="inputtext"></input>
            </p>
            <p>
                <label for="qhead{_qnb}">Votre Question :</label>
                <textarea id="qhead{_qnb}" rows="2" cols="60" class="inputtext"></textarea>
            </p>
            <p>
                <label for="code{_qnb}">Ajouter du code ?</label>
                <textarea id="code{_qnb}" rows="2" cols="60" class="inputtext code" spellcheck="false"></textarea>
                <br><span style="margin-left: 140px;"></span>
                <input type="radio" name="lang{_qnb}" value="python" id="lang{_qnb}0" checked> <label for="lang{_qnb}0">Python</label>
                <input type="radio" name="lang{_qnb}" value="html" id="lang{_qnb}1"> <label for="lang{_qnb}1">HTML</label>
                <input type="radio" name="lang{_qnb}" value="css" id="lang{_qnb}2"> <label for="lang{_qnb}2">CSS</label>
                <input type="radio" name="lang{_qnb}" value="javascript" id="lang{_qnb}3"> <label for="lang{_qnb}3">Javascript</label>
                <input type="radio" name="lang{_qnb}" value="php" id="lang{_qnb}4"> <label for="lang{_qnb}4">Php</label>
                <input type="radio" name="lang{_qnb}" value="pascal" id="lang{_qnb}5"> <label for="lang{_qnb}5">Pascal</label>
            </p>
            <p>
                <label for="m0{_qnb}">Réponse 1 :</label>
                <input type="text" id="m0{_qnb}" size="30" class="inputtext">
                <input type="checkbox" name="check{_qnb}" id="k0{_qnb}">
                <label for="k0{_qnb}">Correcte</label>
            </p>
            <p id="p1{_qnb}">
                <label for="m1{_qnb}">Réponse 2 :</label>
                <input type="text" id="m1{_qnb}" size="30" class="inputtext">
                <input type="checkbox" name="check{_qnb}" id="k1{_qnb}">
                <label for="k1{_qnb}">Correcte</label>
                <input type="button" id="a{_qnb}" class="btn" value="Ajouter réponse" onclick="ajouter_reponse(this);">
            </p>
        `;
            drag = `
            <Label>Choisir le type de question : </Label>
            <select id="qlist{_qnb}" onchange="changer(event, this.parentNode.id);" class="inputtext">
                <option value="one">Choix unique</option>
                <option value="multi">Choix multiple</option>
                <option value="drag" selected>Glisser déposer</option>
                <option value="sort">Ordonnée</option>
                <option value="entry">Saisie</option>
            </select>
            <p>
                <label for="points{_qnb}">Note : </label>
                <input id="points{_qnb}" size="4" value="2" class="inputtext"></input>
                <label for="temps{_qnb}">Temps (en seconde) : </label>
                <input id="temps{_qnb}" size="4" value="20" class="inputtext"></input>
            </p>
            <p>
                <label for="qhead{_qnb}">Votre Question :</label>
                <textarea id="qhead{_qnb}" rows="2" cols="60" class="inputtext"></textarea>
            </p>
            <p>
                <label for="code{_qnb}">Ajouter du code ?</label>
                <textarea id="code{_qnb}" rows="2" cols="60" class="inputtext code" spellcheck="false"></textarea>
                <br><span style="margin-left: 140px;"></span>
                <input type="radio" name="lang{_qnb}" value="python" id="lang{_qnb}0" checked> <label for="lang{_qnb}0">Python</label>
                <input type="radio" name="lang{_qnb}" value="html" id="lang{_qnb}1"> <label for="lang{_qnb}1">HTML</label>
                <input type="radio" name="lang{_qnb}" value="css" id="lang{_qnb}2"> <label for="lang{_qnb}2">CSS</label>
                <input type="radio" name="lang{_qnb}" value="javascript" id="lang{_qnb}3"> <label for="lang{_qnb}3">Javascript</label>
                <input type="radio" name="lang{_qnb}" value="php" id="lang{_qnb}4"> <label for="lang{_qnb}4">Php</label>
                <input type="radio" name="lang{_qnb}" value="pascal" id="lang{_qnb}5"> <label for="lang{_qnb}5">Pascal</label>
            </p>
            <p>
                <label for="o0{_qnb}">Option 1 :</label>
                <input type="text" id="o0{_qnb}" size="19" class="inputtext">
                <label for="r0{_qnb}"> => </label>
                <input type="text" id="r0{_qnb}" size="19" class="inputtext">
            </p>
            <p id="p1{_qnb}">
                <label for="o1{_qnb}">Option 2 :</label>
                <input type="text" id="o1{_qnb}" size="19" class="inputtext">
                <label for="r1{_qnb}"> => </label>
                <input type="text" id="r1{_qnb}" size="19" class="inputtext">
                <input type="button" id="a{_qnb}" class="btn" value="Ajouter réponse" onclick="ajouter_reponse(this);">
            </p>
        `;
            sort = `
            <Label>Choisir le type de question : </Label>
            <select id="qlist{_qnb}" onchange="changer(event, this.parentNode.id);" class="inputtext">
                <option value="one">Choix unique</option>
                <option value="multi">Choix multiple</option>
                <option value="drag">Glisser déposer</option>
                <option value="sort" selected>Ordonnée</option>
                <option value="entry">Saisie</option>
            </select>
            <p>
                <label for="points{_qnb}">Note : </label>
                <input id="points{_qnb}" size="4" value="2" class="inputtext"></input>
                <label for="temps{_qnb}">Temps (en seconde) : </label>
                <input id="temps{_qnb}" size="4" value="20" class="inputtext"></input>
            </p>
            <p>
                <label for="qhead{_qnb}">Votre Question :</label>
                <textarea id="qhead{_qnb}" rows="2" cols="60" class="inputtext"></textarea>
            </p>
            <p>
                <label for="code{_qnb}">Ajouter du code ?</label>
                <textarea id="code{_qnb}" rows="2" cols="60" class="inputtext code" spellcheck="false"></textarea>
                <br><span style="margin-left: 140px;"></span>
                <input type="radio" name="lang{_qnb}" value="python" id="lang{_qnb}0" checked> <label for="lang{_qnb}0">Python</label>
                <input type="radio" name="lang{_qnb}" value="html" id="lang{_qnb}1"> <label for="lang{_qnb}1">HTML</label>
                <input type="radio" name="lang{_qnb}" value="css" id="lang{_qnb}2"> <label for="lang{_qnb}2">CSS</label>
                <input type="radio" name="lang{_qnb}" value="javascript" id="lang{_qnb}3"> <label for="lang{_qnb}3">Javascript</label>
                <input type="radio" name="lang{_qnb}" value="php" id="lang{_qnb}4"> <label for="lang{_qnb}4">Php</label>
                <input type="radio" name="lang{_qnb}" value="pascal" id="lang{_qnb}5"> <label for="lang{_qnb}5">Pascal</label>
            </p>
            <p>
                <label for="s0{_qnb}">Option 1 :</label>
                <input type="text" id="s0{_qnb}" size="40" class="inputtext">
            </p>
            <p id="p1{_qnb}">
                <label for="s1{_qnb}">Option 2 :</label>
                <input type="text" id="s1{_qnb}" size="40" class="inputtext">
                <input type="button" id="a{_qnb}" class="btn" value="Ajouter réponse" onclick="ajouter_reponse(this);">
            </p>
        `;
            
            entry = `
            <Label>Choisir le type de question : </Label>
            <select id="qlist{_qnb}" onchange="changer(event, this.parentNode.id);" class="inputtext">
                <option value="one">Choix unique</option>
                <option value="multi">Choix multiple</option>
                <option value="drag">Glisser déposer</option>
                <option value="sort">Ordonnée</option>
                <option value="entry" selected>Saisie</option>
            </select>
            <p>
                <label for="points{_qnb}">Note : </label>
                <input id="points{_qnb}" size="4" value="2" class="inputtext"></input>
                <label for="temps{_qnb}">Temps (en seconde) : </label>
                <input id="temps{_qnb}" size="4" value="20" class="inputtext"></input>
            </p>
            <p>
                <label for="qhead{_qnb}">Votre Question :</label>
                <textarea id="qhead{_qnb}" rows="2" cols="60" class="inputtext"></textarea>
            </p>
            <p>
                <label for="code{_qnb}">Ajouter du code ?</label>
                <textarea id="code{_qnb}" rows="2" cols="60" class="inputtext code" spellcheck="false"></textarea>
                <br><span style="margin-left: 140px;"></span>
                <input type="radio" name="lang{_qnb}" value="python" id="lang{_qnb}0" checked> <label for="lang{_qnb}0">Python</label>
                <input type="radio" name="lang{_qnb}" value="html" id="lang{_qnb}1"> <label for="lang{_qnb}1">HTML</label>
                <input type="radio" name="lang{_qnb}" value="css" id="lang{_qnb}2"> <label for="lang{_qnb}2">CSS</label>
                <input type="radio" name="lang{_qnb}" value="javascript" id="lang{_qnb}3"> <label for="lang{_qnb}3">Javascript</label>
                <input type="radio" name="lang{_qnb}" value="php" id="lang{_qnb}4"> <label for="lang{_qnb}4">Php</label>
                <input type="radio" name="lang{_qnb}" value="pascal" id="lang{_qnb}5"> <label for="lang{_qnb}5">Pascal</label>
            </p>
            <p>
                <label for="e0{_qnb}">Nombre de réponses :</label>
                <input type="text" id="e0{_qnb}" size="5" class="inputtext code" value="1">
            </p>
            <p id="p1{_qnb}">
                <label for="e1{_qnb}">Valeur acceptée 1 :</label>
                <input type="text" id="e1{_qnb}" size="34" class="inputtext code">
                <input type="button" id="a{_qnb}" class="btn" value="Ajouter réponse" onclick="ajouter_reponse(this);">
            </p>
        `;
            
            
            
            




            function generer(){
                
/*********************************************** en-tête de quiz *************************************************/
                var jsonHead = 'head = `{';
                var title = document.getElementById("title").value.replace(/"/gi, '\\\\"').replace(/</gi, '&#60;').replace(/>/gi, '&#62;');
                var subTitle = document.getElementById("subTitle").value;
                var author = document.getElementById("author").value.replace(/"/gi, '\\\\"').replace(/</gi, '&#60;').replace(/>/gi, '&#62;');
                var dateCreation = document.getElementById("datecreation").value.replace(/"/gi, '\\\\"');
                var description = document.getElementById("description").value.replace(/"/gi, '\\\\"').replace(/\n/gi, "<br>").replace(/</gi, '&#60;').replace(/>/gi, '&#62;');
                var norepeat = document.getElementById("norepeat").checked;
                
                jsonHead = 'head = `{' + `
    "title": "` + title + `",
    "subTitle": "` + subTitle + `",
    "author": "` + author + `",
    "date": "` + dateCreation + `",
    "description": "` + description + `",
    "norepeat": ` + norepeat + `,
    "quizid": ` + Date.now() + `
}` + '`;';

/*********************************************** contenu de quiz *************************************************/
                var json = '';
                if (nbq>0){
                    json = 'data = `[';
                    for(i=0; i<nbq; i++){
                        
                        qlist = document.getElementById('qlist' + i);
                        switch(qlist.value){
                            case 'one':
                                if(i > 0)
                                    json += `,
    {
        "type": "one"`;
                                else
                                    json += `
    {
        "type": "one"`;
                                points = document.getElementById('points' + i);
                                json += `,
        "points": ` + points.value;
                                temps = document.getElementById('temps' + i);
                                json += `,
        "temps": ` + temps.value;
                                qhead = document.getElementById('qhead' + i);
                                json += `,
        "question": "` + qhead.value.replace(/"/gi, '\\\\"').replace(/\n/gi, "<br>").replace(/</gi, '&#60;').replace(/>/gi, '&#62;') + `"`;
                                code = document.getElementById('code' + i);
                                json += `,
        "code": "` + code.value.replace(/"/gi, '\\\\"').replace(/\n/gi, '\\\\n').replace(/</gi, '&#60;').replace(/>/gi, '&#62;') + `"`;
                                lang = document.querySelector('input[name=lang'+i+']:checked');
                                json += `,
        "lang": "` + lang.value + `"`;
                                c0 = document.getElementById('c0' + i);
                                json += `,
        "options": ["` + c0.value.replace(/"/gi, '\\\\"').replace(/</gi, '&#60;').replace(/>/gi, '&#62;') + `"`;
                                w1 = document.getElementById('w1' + i);
                                json += `, "` + w1.value.replace(/"/gi, '\\\\"').replace(/</gi, '&#60;').replace(/>/gi, '&#62;') + `"`;
                                if(nbrep[i] > 2)
                                    for(j=2; j<nbrep[i]; j++){
                                        var w = document.getElementById('w' + j + i);
                                        json += `, "` + w.value.replace(/"/gi, '\\\\"').replace(/</gi, '&#60;').replace(/>/gi, '&#62;') + `"`;
                                    }
                                json += `]
    }`;
                                break;
                            case 'multi':
                                if(i > 0)
                                    json += `,
    {
        "type": "multi"`;
                                else
                                    json += `
    {
        "type": "multi"`;
                                points = document.getElementById('points' + i);
                                json += `,
        "points": ` + points.value;
                                temps = document.getElementById('temps' + i);
                                json += `,
        "temps": ` + temps.value;
                                qhead = document.getElementById('qhead' + i);
                                json += `,
        "question": "` + qhead.value.replace(/"/gi, '\\\\"').replace(/\n/gi, "<br>").replace(/</gi, '&#60;').replace(/>/gi, '&#62;') + `"`;
                                code = document.getElementById('code' + i);
                                json += `,
        "code": "` + code.value.replace(/"/gi, '\\\\"').replace(/\n/gi, '\\\\n').replace(/</gi, '&#60;').replace(/>/gi, '&#62;') + `"`;
                                lang = document.querySelector('input[name=lang'+i+']:checked');
                                json += `,
        "lang": "` + lang.value + `"`;
                                m0 = document.getElementById('m0' + i);
                                json += `,
        "options": [["`+m0.value.replace(/"/gi, '\\\\"').replace(/</gi, '&#60;').replace(/>/gi, '&#62;') + `"`;
                                k0 = document.getElementById('k0' + i);
                                json += `, ` + k0.checked + `]`;
                                m1 = document.getElementById('m1' + i);
                                json += `, ["` + m1.value.replace(/"/gi, '\\\\"').replace(/</gi, '&#60;').replace(/>/gi, '&#62;') + `"`;
                                k1 = document.getElementById('k1' + i);
                                json += `, ` + k1.checked + `]`;
                                if(nbrep[i] > 2)
                                    for(j=2; j<nbrep[i]; j++){
                                        var m = document.getElementById('m' + j + i);
                                        var k = document.getElementById('k' + j + i);
                                        json += `, ["` + m.value.replace(/"/gi, '\\\\"').replace(/</gi, '&#60;').replace(/>/gi, '&#62;') + `", ` + k.checked + `]`;
                                    }
                                json += `]
    }`;
                                break;
                            case 'drag':
                                if(i > 0)
                                    json += `,
    {
        "type": "drag"`;
                                else
                                    json += `
    {
        "type": "drag"`;
                                points = document.getElementById('points' + i);
                                json += `,
        "points": ` + points.value;
                                temps = document.getElementById('temps' + i);
                                json += `,
        "temps": ` + temps.value;
                                qhead = document.getElementById('qhead' + i);
                                json += `,
        "question": "` + qhead.value.replace(/"/gi, '\\\\"').replace(/\n/gi, "<br>").replace(/</gi, '&#60;').replace(/>/gi, '&#62;') + `"`;
                                code = document.getElementById('code' + i);
                                json += `,
        "code": "` + code.value.replace(/"/gi, '\\\\"').replace(/\n/gi, '\\\\n').replace(/</gi, '&#60;').replace(/>/gi, '&#62;') + `"`;
                                lang = document.querySelector('input[name=lang'+i+']:checked');
                                json += `,
        "lang": "` + lang.value + `"`;
                                o0 = document.getElementById('o0' + i);
                                json += `,
        "options": [["` + o0.value.replace(/"/gi, '\\\\"').replace(/</gi, '&#60;').replace(/>/gi, '&#62;') + `"`;
                                r0 = document.getElementById('r0' + i);
                                json += `, "` + r0.value.replace(/"/gi, '\\\\"').replace(/</gi, '&#60;').replace(/>/gi, '&#62;') + `"]`;
                                o1 = document.getElementById('o1' + i);
                                json += `, ["` + o1.value.replace(/"/gi, '\\\\"').replace(/</gi, '&#60;').replace(/>/gi, '&#62;') + `"`;
                                r1 = document.getElementById('r1' + i);
                                json += `, "` + r1.value.replace(/"/gi, '\\\\"').replace(/</gi, '&#60;').replace(/>/gi, '&#62;') + `"]`;
                                if(nbrep[i] > 2)
                                    for(j=2; j<nbrep[i]; j++){
                                        var o = document.getElementById('o' + j + i);
                                        var r = document.getElementById('r' + j + i);
                                        json += `, ["` + o.value.replace(/"/gi, '\\\\"').replace(/</gi, '&#60;').replace(/>/gi, '&#62;') + `", "` +  r.value.replace(/"/gi, '\\\\"').replace(/</gi, '&#60;').replace(/>/gi, '&#62;') + `"]`;
                                    }
                                json += `]
    }`;
                                break;
                            case 'sort':
                                if(i > 0)
                                    json += `,
    {
        "type": "sort"`;
                                else
                                    json += `
    {
        "type": "sort"`;
                                points = document.getElementById('points' + i);
                                json += `,
        "points": ` + points.value;
                                temps = document.getElementById('temps' + i);
                                json += `,
        "temps": ` + temps.value;
                                qhead = document.getElementById('qhead' + i);
                                json += `,
        "question": "` + qhead.value.replace(/"/gi, '\\\\"').replace(/\n/gi, "<br>").replace(/</gi, '&#60;').replace(/>/gi, '&#62;') + `"`;
                                code = document.getElementById('code' + i);
                                json += `,
        "code": "` + code.value.replace(/"/gi, '\\\\"').replace(/\n/gi, '\\\\n').replace(/</gi, '&#60;').replace(/>/gi, '&#62;') + `"`;
                                lang = document.querySelector('input[name=lang'+i+']:checked');
                                json += `,
        "lang": "` + lang.value + `"`;
                                s0 = document.getElementById('s0' + i);
                                json += `,
        "options": ["` + s0.value.replace(/"/gi, '\\\\"').replace(/</gi, '&#60;').replace(/>/gi, '&#62;') + `"`;
                                s1 = document.getElementById('s1' + i);
                                json += `, "` + s1.value.replace(/"/gi, '\\\\"').replace(/</gi, '&#60;').replace(/>/gi, '&#62;') + `"`;
                                if(nbrep[i] > 2)
                                    for(j=2; j<nbrep[i]; j++){
                                        var s = document.getElementById('s' + j + i);
                                        json += `, "` + s.value.replace(/"/gi, '\\\\"').replace(/</gi, '&#60;').replace(/>/gi, '&#62;') + `"`;
                                    }
                                json += `]
    }`;
                                break;
                            
                            case 'entry':
                                if(i > 0)
                                    json += `,
    {
        "type": "entry"`;
                                else
                                    json += `
    {
        "type": "entry"`;
                                points = document.getElementById('points' + i);
                                json += `,
        "points": ` + points.value;
                                temps = document.getElementById('temps' + i);
                                json += `,
        "temps": ` + temps.value;
                                qhead = document.getElementById('qhead' + i);
                                json += `,
        "question": "` + qhead.value.replace(/"/gi, '\\\\"').replace(/\n/gi, "<br>").replace(/</gi, '&#60;').replace(/>/gi, '&#62;') + `"`;
                                code = document.getElementById('code' + i);
                                json += `,
        "code": "` + code.value.replace(/"/gi, '\\\\"').replace(/\n/gi, '\\\\n').replace(/</gi, '&#60;').replace(/>/gi, '&#62;') + `"`;
                                lang = document.querySelector('input[name=lang'+i+']:checked');
                                json += `,
        "lang": "` + lang.value + `"`;
                                e0 = document.getElementById('e0' + i);
                                json += `,
        "options": [[` + e0.value;
                                e1 = document.getElementById('e1' + i);
                                json += `, "` + e1.value.replace(/"/gi, '\\\\"').replace(/</gi, '&#60;').replace(/>/gi, '&#62;').toUpperCase() + `"`;
                                if(nbrep[i] > 2)
                                    for(j=2; j<nbrep[i]; j++){
                                        var e = document.getElementById('e' + j + i);
                                        json += `, "` + e.value.replace(/"/gi, '\\\\"').replace(/</gi, '&#60;').replace(/>/gi, '&#62;').toUpperCase() + `"`;
                                    }
                                json += `]]
    }`;
                                break;
                        }
                    }
                    json += `
]`;
                    json +='`;';
                    download(subTitle + '.json',jsonHead + '\n\n' + json);
                }
                else
                alert('Vous devez créer au moins une question !');
            }
            
            
            
            
            
            
            
            function download(filename, text) {
                var element = document.createElement('a');
                element.setAttribute('href', 'data:json/plain;charset=utf-8,' + encodeURIComponent(text));
                element.setAttribute('download', filename);
                element.style.display = 'none';
                document.body.appendChild(element);
                element.click();
                document.body.removeChild(element);
            }
            
            function ajouter(){
                var elm = document.getElementById('hiddenEmptyQuestion'); 
                o = '<div id="q' + nbq + '" class="blocquestion">' + one.replace(/{_qnb}/gi, nbq) + '</div>\n        ';
                elm.insertAdjacentHTML('beforebegin', o);
                nbq+=1;
                nbrep.push(2);
                var p_d_q_btn = document.getElementById("p_delete_question_btn");
                p_d_q_btn.style.display = "block";
            }
            
            function supprimer_question(){
                if(nbq > 0){
                    _qnb = nbq - 1;
                    q_id = "q" + _qnb;
                    q_elmt = document.getElementById(q_id);
                    q_elmt.parentNode.removeChild(q_elmt);
                    nbrep.pop();
                    nbq -=1;
                    if(nbq == 0){
                        var p_d_q_btn = document.getElementById("p_delete_question_btn");
                    p_d_q_btn.style.display = "none";
                    }
                }
            }
            
            function changer(event, id){
                changer_question(event.target.value, id);
            }
            
            function changer_question(value, id){
                var _qnb = id.substring(1);
                var elm = document.getElementById(id);
                nbrep[_qnb] = 2;
                switch (value) {
                    case 'one':
                         elm.innerHTML = one.replace(/{_qnb}/gi, _qnb);
                        break;
                    case 'multi':
                        elm.innerHTML = multi.replace(/{_qnb}/gi, _qnb);
                        break;
                    case 'drag':
                        elm.innerHTML = drag.replace(/{_qnb}/gi, _qnb);
                        break;
                    case 'sort':
                        elm.innerHTML = sort.replace(/{_qnb}/gi, _qnb);
                        break;
                    case 'entry':
                        elm.innerHTML = entry.replace(/{_qnb}/gi, _qnb);
                        break;
                }
            }
            
            function ajouter_reponse(elmt){
                var p_elmt = elmt.parentNode;
                var p_p_id = elmt.parentNode.parentNode.id;
                var q = document.getElementById(p_p_id);
                var _qnb = p_p_id.substring(1);
                var qlist_id = "qlist" + _qnb;
                var qlist = document.getElementById(qlist_id);
                var _rnb = nbrep[_qnb];
                switch(qlist.value){
                    case "one": r = r_one.replace(/{_qnb}/gi, _qnb).replace(/{_rnb}/gi, _rnb);
                        break;
                    case "multi": r = r_multi.replace(/{_qnb}/gi, _qnb).replace(/{_rnb}/gi, _rnb).replace(/{_rnbplusun}/gi, _rnb+1);
                        break;
                    case "drag": r = r_drag.replace(/{_qnb}/gi, _qnb).replace(/{_rnb}/gi, _rnb).replace(/{_rnbplusun}/gi, _rnb+1);
                        break;
                    case "sort": r = r_sort.replace(/{_qnb}/gi, _qnb).replace(/{_rnb}/gi, _rnb).replace(/{_rnbplusun}/gi, _rnb+1);
                        break;
                    case "entry": r = r_entry.replace(/{_qnb}/gi, _qnb).replace(/{_rnb}/gi, _rnb).replace(/{_rnb}/gi, _rnb);
                        break;
                }
                a_id = "a" + _qnb;
                a = document.getElementById(a_id);
                p_elmt.removeChild(a);
                
                if(_rnb > 2){
                    d_id = "d" + _qnb;
                    d = document.getElementById(d_id);
                    p_elmt.removeChild(d);
                }
                
                q.insertAdjacentHTML('beforeend', r);
                nbrep[_qnb] +=1;
            }
            
            function supprimer_reponse(elmt){
                var id = elmt.id;
                var _qnb = id.substring(1);
                var _rnb = nbrep[_qnb];
                if(_rnb > 2){
                    var p = elmt.parentNode;
                    var p_p_elmt = elmt.parentNode.parentNode;
                    p_p_elmt.removeChild(p);
                    nbrep[_qnb] -= 1;
                    _rnb -= 1;
                    last_p = document.getElementById("p" + (_rnb-1) + _qnb);
                    if(_rnb > 2)
                        last_p.insertAdjacentHTML('beforeend', `<input type="button" id="a{_qnb}" class="btn" value="Ajouter réponse" onclick="ajouter_reponse(this);">
                <input type="button" id="d{_qnb}" class="btn" value="Supprimer" onclick="supprimer_reponse(this);">`.replace(/{_qnb}/gi, _qnb).replace(/{_rnb}/gi, _rnb));
                    else
                        last_p.insertAdjacentHTML('beforeend', `<input type="button" id="a{_qnb}" class="btn" value="Ajouter réponse" onclick="ajouter_reponse(this);">`.replace(/{_qnb}/gi, _qnb).replace(/{_rnb}/gi, _rnb));
                }
            }
            
            function edit_file(btn){
                
                let __nbq = nbq;
                for(let i = 0; i < __nbq; i++ )
                    supprimer_question();
                
                let scriptElm = document.getElementsByTagName('script');
                for(let i=0; i<scriptElm.length; i++)
                    if(scriptElm[i].getAttribute("src") == "json/" + jsonFile)
                        scriptElm[i].parentNode.removeChild(scriptElm[i]);
                jsonFile = btn.files[0].name;
                
                let headElm = document.getElementsByTagName('head');
                tag = document.createElement('script');
                tag.setAttribute("src", "json/" + btn.files[0].name);
                headElm[0].appendChild(tag);
                
                tag.onload = function() {
                    var jsonHead = JSON.parse(head);
                    document.getElementById("title").value = jsonHead.title.replace(/\\\\"/gi, '"').replace(/&#60;/gi, '<').replace(/&#62;/gi, '>');
                    document.getElementById("author").value = jsonHead.author.replace(/\\\\"/gi, '"').replace(/&#60;/gi, '<').replace(/&#62;/gi, '>');
                    document.getElementById("datecreation").value = jsonHead.date.replace(/\\\\"/gi, '"');
                    document.getElementById("description").value = jsonHead.description.replace(/\\\\"/gi, '"').replace(/<br>/gi, "\n").replace(/&#60;/gi, '<').replace(/&#62;/gi, '>');
                    document.getElementById("norepeat").checked = jsonHead.norepeat;
                    
                    var jsonData = JSON.parse(data);
                    for(let i = 0; i < jsonData.length; i++){
                        ajouter();
                        let element = document.getElementById("qlist" + i);
                        changer_question(jsonData[i].type, element.parentNode.id/*"q"+i*/);
                        document.getElementById("points" + i).value = jsonData[i].points;
                        document.getElementById("temps" + i).value = jsonData[i].temps;
                        document.getElementById("qhead" + i).value = jsonData[i].question.replace(/\\\\"/gi, '"').replace(/<br>/gi, "\n").replace(/&#60;/gi, '<').replace(/&#62;/gi, '>');
                        document.getElementById("code" + i).value = jsonData[i].code.replace(/\\\\"/gi, '"').replace(/<br>/gi, "\n").replace(/&#60;/gi, '<').replace(/&#62;/gi, '>');
                        for(let j = 0; j<6; j++) // 6 : nb language => py, html, css, js, php, pas
                            if(document.getElementById('lang' + i + j).value == jsonData[i].lang)
                                document.getElementById('lang' + i + j).checked = true;
                        
                        switch(jsonData[i].type){
                            case "one":
                                document.getElementById("c0"+i).value = jsonData[i].options[0].replace(/\\\\"/gi, '"').replace(/&#60;/gi, '<').replace(/&#62;/gi, '>');
                                document.getElementById("w1"+i).value = jsonData[i].options[1].replace(/\\\\"/gi, '"').replace(/&#60;/gi, '<').replace(/&#62;/gi, '>');
                                for(let j=2; j<jsonData[i].options.length; j++){
                                    ajouter_reponse(document.getElementById("a"+i));
                                    document.getElementById("w"+j+i).value = jsonData[i].options[j].replace(/\\\\"/gi, '"').replace(/&#60;/gi, '<').replace(/&#62;/gi, '>');
                                }
                                
                                break;
                            case "multi":
                                document.getElementById("m0"+i).value = jsonData[i].options[0][0].replace(/\\\\"/gi, '"').replace(/&#60;/gi, '<').replace(/&#62;/gi, '>');
                                document.getElementById("k0"+i).checked = jsonData[i].options[0][1];
                                document.getElementById("m1"+i).value = jsonData[i].options[1][0].replace(/\\\\"/gi, '"').replace(/&#60;/gi, '<').replace(/&#62;/gi, '>');
                                document.getElementById("k1"+i).checked = jsonData[i].options[1][1];
                                for(let j=2; j<jsonData[i].options.length; j++){
                                    ajouter_reponse(document.getElementById("a"+i));
                                    document.getElementById("m"+j+i).value = jsonData[i].options[j][0].replace(/\\\\"/gi, '"').replace(/&#60;/gi, '<').replace(/&#62;/gi, '>');
                                    document.getElementById("k"+j+i).checked = jsonData[i].options[j][1];
                                }
                                
                                break;
                            case "drag":
                                document.getElementById("o0"+i).value = jsonData[i].options[0][0].replace(/\\\\"/gi, '"').replace(/&#60;/gi, '<').replace(/&#62;/gi, '>');
                                document.getElementById("r0"+i).value = jsonData[i].options[0][1].replace(/\\\\"/gi, '"').replace(/&#60;/gi, '<').replace(/&#62;/gi, '>');
                                document.getElementById("o1"+i).value = jsonData[i].options[1][0].replace(/\\\\"/gi, '"').replace(/&#60;/gi, '<').replace(/&#62;/gi, '>');
                                document.getElementById("r1"+i).value = jsonData[i].options[1][1].replace(/\\\\"/gi, '"').replace(/&#60;/gi, '<').replace(/&#62;/gi, '>');
                                for(let j=2; j<jsonData[i].options.length; j++){
                                    ajouter_reponse(document.getElementById("a"+i));
                                    document.getElementById("o"+j+i).value = jsonData[i].options[j][0].replace(/\\\\"/gi, '"').replace(/&#60;/gi, '<').replace(/&#62;/gi, '>');
                                    document.getElementById("r"+j+i).value = jsonData[i].options[j][1].replace(/\\\\"/gi, '"').replace(/&#60;/gi, '<').replace(/&#62;/gi, '>');
                                }
                                
                                break;
                            case "sort":
                                document.getElementById("s0"+i).value = jsonData[i].options[0].replace(/\\\\"/gi, '"').replace(/&#60;/gi, '<').replace(/&#62;/gi, '>');
                                document.getElementById("s1"+i).value = jsonData[i].options[1].replace(/\\\\"/gi, '"').replace(/&#60;/gi, '<').replace(/&#62;/gi, '>');
                                for(let j=2; j<jsonData[i].options.length; j++){
                                    ajouter_reponse(document.getElementById("a"+i));
                                    document.getElementById("s"+j+i).value = jsonData[i].options[j].replace(/\\\\"/gi, '"').replace(/&#60;/gi, '<').replace(/&#62;/gi, '>');
                                }
                                
                                break;
                            case "entry":
                                document.getElementById("e0"+i).value = jsonData[i].options[0][0];
                                document.getElementById("e1"+i).value = jsonData[i].options[0][1].replace(/\\\\"/gi, '"').replace(/&#60;/gi, '<').replace(/&#62;/gi, '>').toLowerCase();
                                for(let j=2; j<jsonData[i].options[0].length; j++){
                                    ajouter_reponse(document.getElementById("a"+i));
                                    document.getElementById("e"+j+i).value = jsonData[i].options[0][j].replace(/\\\\"/gi, '"').replace(/&#60;/gi, '<').replace(/&#62;/gi, '>').toLowerCase();
                                }
                                
                                break;
                        }
                    }
                }
            }
            
            function _getDate(){
                let date = new Date();
                var j = date.getDate();
                var m = date.getMonth()+1;
                if(j < 10)
                    j = "0"+ j;
                if(m < 10)
                    m = "0"+ m;
                return j+"/"+m+"/"+date.getFullYear();
            }
            
            window.onload = function(){
                document.getElementById("title").value = '';
                document.getElementById("author").value = '';
                document.getElementById("datecreation").value = _getDate();
                document.getElementById("description").value = '';
                document.getElementById("norepeat").checked = false;
                document.getElementById("editbtn").value = '';
            };
