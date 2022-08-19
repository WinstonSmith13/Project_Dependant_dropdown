<?php

/*** Isset - Détermine si une variable est déclarée et est différente de null ***/

if (isset($_POST['selectedRegion']) && !empty($_POST['selectedRegion'])) {

    /***La méthode POST, quant à elle, transmet les informations du formulaire de manière masquée mais non cryptée.
     * Ici on récupère le code de la région dans la variable selectedRegion***/

    $selectedRegion = $_POST['selectedRegion'];
}

/*** file_get_contents — Lit tout un fichier dans une chaîne ici dans le fichier Departemens.json ***/
$dptJson = file_get_contents('data/departements.json');

/*** json_decode — Décode une chaîne JSON ***/
$dptTab = json_decode($dptJson);

/*** Création d'un tableau vide que l'on remplira avec les données des départements récupérées par la suite ***/
$dptList = [];

/*** Lorsque que l'on a besoin de la clé dans une boucle foreach, on utilise : $key=>$value  ***/
foreach ($dptTab as $key => $value) {

    /*** Nous voulons récupérer les informations reliées à la région selectionnée 
     * pour cela la valeur de notre formdata doit être égale a la valeur dans le json  ***/

    if ($selectedRegion == $value->region) {
        $selectedDept = $value->nom;

        /*** On ajoute les données dans le tableau créé plus haut  ***/
        array_push(
            $dptList,
            [$key => $selectedDept]

        );
    }
};

/*** json_encode — Retourne la représentation JSON d'une valeur  ***/
echo json_encode(['success' => true, 'content' => $dptList]);
