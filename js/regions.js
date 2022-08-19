window.onload = () => {

    /*** on renome l'objet JavaScript document ***/
    let d = document;

    /*** definition des variables pour cibler les id du DOM ***/
    let selection = d.querySelector("#regions");
    let franceRegions = d.querySelector("#France-Regions");
    let choixDept = d.querySelector("#departements");
    let path = d.querySelectorAll("path");
    let departementsId = d.querySelector('#dept_zone');


    /*** Création de l'événement au moment du choix d'une région ***/
    selection.addEventListener('change', () => {

        let region = selection.value;

        /*** Création d'un nouvel objet  ***/
        let regionData = new FormData();

        /*** Ajout du couple Clé-Valeur, la valeur de la selection de la région ***/
        regionData.append("selectedRegion", region);

        /*** Par défault on veut que les régions soit de couleur noir ***/
        d.querySelectorAll("g").forEach(couleurRegion => {
            couleurRegion.setAttribute('fill', '#000')
        });

        /*** De la même manière, on veut que par défault les départements soit de couleur noir ***/
        path.forEach(field => {
            field.setAttribute('fill', '');
        });


        /*** Pour que les départements ne s'ajoutent pas à la suite dans notre fenêtre déroulante ***/
        choixDept.innerHTML = '<option value="0">Faites votre choix...</option>'


        /*** Appel de la fonction changement de couleur de la région ***/
        changeColorRegion();

        /*** L'API Fetch fournit une interface JavaScript pour l'accès et 
         * la manipulation des parties de la pipeline HTTP, comme les requêtes et les réponses. 
         * Cela fournit aussi une méthode globale fetch() qui procure un moyen facile et 
         * logique de récupérer des ressources à travers le réseau de manière asynchrone. ***/

        fetch('data.php', {

            /*** On fourni des options à la requête - methode = POST -   ***/
            method: 'POST',

            /*** Le mixin Body définit les méthodes suivantes pour extraire le corps (
             * implémenté autant par la Request que par la Response). 
             * Elles retournent toutes une promesse qui sera éventuellement résolue - formdata()***/

            body: regionData


            /*** Recupération de la response après passage dans le fichier PHP ***/
        }).then(response => {
            return response.json();
        }).then(data => {
            if (data.success === true) {

                /*** Si nous récupérons des données alors nous pouvons afficher la fenêtre des départements ***/
                departementsId.classList.remove('d-none');

                /*** À présent récupérons les informations du json pour avoir le nom et le numéro des départements ***/
                let dept = data.content;

                for (let keys in dept) {
                    var Dept = dept[keys];


                    /*** Pour continuer nous avons besoin de la key et la valeur ***/
                    var numDept = Object.keys(Dept);
                    var nomDept = Object.values(Dept);

                    /*** Celles-ci nous permettent maintenant grâce à JS(concaténation) de modifier le DOM et d'écrire du HTML ***/
                    let ajoutDept = `<option id="${numDept}" value="dept-${numDept}">${nomDept}</option>`;

                    /*** Ajout des options dans la fenêtre ouvrante des departements ***/
                    choixDept.innerHTML += ajoutDept;

                };

                /*** À présent que nous avons les options de départements dans la fenêtre ouvrante
                 * on met en place un evenement qui permettra de changer la couleur du département 
                 * en fonction du choix ***/

                choixDept.addEventListener('change', () => {

                    /*** On cible path dans le SVG et pour chaque elements on lui ajoute un attribut Fill vide ***/
                    path.forEach(field => {
                        field.setAttribute('fill', '');

                        /*** Si la valeur du choix du département est égale à l'id du path alors la couleur verte est appliquée ***/
                        if (field.id === choixDept.value) {
                            field.setAttribute('fill', '#45ed42');
                        }
                    });
                });
            };
        });


    });

    /*** Fonction permettant la coloration des régions en fonction de la selection dans la fenêtre ouvrante ***/
    function changeColorRegion() {

        /*** En fonction de la valeur de la selection de la region on cible un id "Region" dans le SVG que l'on colore  ***/
        let regions = selection.value;
        let idRegions = "#" + regions;
        let regionsChoisies = franceRegions.querySelector(idRegions);
        regionsChoisies.setAttribute('fill', '#9e2020');
    };

};