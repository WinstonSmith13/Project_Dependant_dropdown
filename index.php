<?php
$title = 'Régions et départements de France métropolitaine.';
?>

<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?= $title ?></title>
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <style>
        #regions {
            background-color: #9e2020;
            color: #fff;
        }

        #departements {
            background-color: #45ed42
        }
    </style>
</head>

<body>
    <div class="container mt-2 mb-5">
        <div class="row">
            <div class="col">
                <div class="h-100 p-5 text-bg-dark rounded-3">
                    <header>
                        <h1><?= $title ?></h1>
                    </header>
                </div>
            </div>
        </div>
    </div>
    <div class="container">
        <form autocomplete="off">
            <div class="row">
                <div class="col-6">
                    <div class="row">
                        <div class="col">
                            <div class="card">
                                <div class="card-body">
                                    <div class="form-group">
                                        <label for="regions" class="form-label">Veuillez sélectionner une région :</label>
                                        <select id="regions" class="form-select">
                                            <option value="0">Faites votre choix...</option>


                                            <!-- Recupération des données dans le json pour l'affichage des options Regions -->

                                            <?php
                                            $regionJson = file_get_contents('data/regions.json');
                                            $data = json_decode($regionJson, true);
                                            foreach ($data as $key => $value) {
                                                echo "<option id =" . $key . "  value=" . $key . ">" . $value . "</option>";
                                            }
                                            ?>


                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="card">
                                <div class="card-body d-none " id="dept_zone">
                                    <label for="departements" class="form-label">Veuillez sélectionner une département :</label>
                                    <select id="departements" class="form-select">
                                        <option value="0">Faites votre choix...</option>

                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-6">
                    <div class="card">
                        <div class="card-body" id="map">

                            <!-- Affichage de la carte -->

                            <?php
                            $svg = file_get_contents('imgs/france-regions.svg');
                            echo $svg;
                            ?>

                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>

    <script src="js/bootstrap.bundle.min.js"></script>
    <script src="js/regions.js"></script>
</body>

</html>