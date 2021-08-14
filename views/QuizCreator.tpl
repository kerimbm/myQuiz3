<!DOCTYPE html>
<html>
    <head>
        <title>Quiz Creator</title>
        <meta charset="utf-8">
        <link rel="stylesheet" href="css/QuizCreator.css">
        <script src='js/QuizCreator.js'></script>
    </head>
    <body>
        <div id="contener">
            <div id="version">Quiz creator 1.0</div>
            <div id="quizhead">
                <p>
                    <label for="title">Titre de quiz : </label>
                    <input type="text" size="60" class="inputtext" id="title">
                </p>
                <p>
                    <label for="subTitle">Sous-titre de quiz (nom du fichie json) : </label>
                    <input type="text" size="40" class="inputtext" id="subTitle">
                </p>
                <p>
                    <label for="author">Auteur : </label>
                    <input type="text" size="50" class="inputtext" id="author">
                </p>
                <p>
                    <label for="datecreation">Date de création : </label>
                    <input type="text" size="20" class="inputtext" id="datecreation">
                </p>
                <p>
                    <label for="description">Description : </label>
                    <textarea rows="2" cols="60" class="inputtext" id="description"></textarea>
                </p>
                <p>
                    <input type="checkbox" id="norepeat">
                    <label for="norepeat">Empêcher les élèves à refaire le quiz.</label>
                </p>
            </div>
            <div id="quizbody">
                <div id="hiddenEmptyQuestion"></div> 
                
                <div>
                    <p id="p_delete_question_btn" style="display: none;">
                        <input type="button" class="btn" value="Supprimer question" onclick="supprimer_question();">
                    </p>
                    <div id="quizfooter">
                        <input type="button" class="btn" value="Ajouter question" onclick="ajouter();">
                        <input type="button" class="btn" value="Télécharger le fichier JSON" onclick="generer();">
                        <input type="file" accept=".json" id="editbtn" onchange="edit_file(this);">
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>