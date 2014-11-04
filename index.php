<?php
/**
 * Created by PhpStorm.
 * User: Philipp
 * Date: 22.10.2014
 * Time: 23:54
 */

?>

<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="icon" href="favicon.ico">
    <title>Sudoku Solver</title>
</head>

<body>
<div class="container">
    <div class="jumbotron">
        <h1>Sudoku Solver</h1>
        <h4>Simple <code>Javascript</code> Sudoku Solver programmed by <a href="http://ph91.de" target="_blank">
                <strong>Philipp Schreitmueller</strong></a></h4>
        <h4>Check out the source at <a href="https://github.com/Schreitmueller/JSudoku" target="_blank"><span
                    class="glyphicon glyphicon-cloud-download"></span><code>GitHub</code></a></h4>

        <p></p>
    </div>
</div>

<div class="container sudo">
    <div class="row">
        <div class="col-sm-4">
            <h3><span class="glyphicon glyphicon-paperclip"></span> Rules</h3>

            <p>Fill in numbers
                <code>1</code>
                to
                <code>9</code>
                in a way that the same single number
            </p>
            <ul>
                <li>may not appear twice in a line.</li>
                <li>may not appear twice in a row.</li>
                <li>may not appear twice in any of the 9 <code>3x3</code> subregions.</li>
            </ul>

        </div>
        <div class="col-sm-4">
            <form>
                <table class="text-center">
                    <colgroup>
                        <col>
                        <col>
                        <col>
                    <colgroup>
                        <col>
                        <col>
                        <col>
                    <colgroup>
                        <col>
                        <col>
                        <col>
                        <?php
                        for ($i = 0; $i < 9; $i++) {
                            if ($i == 0 | $i == 3 | $i == 6)
                                echo "<tbody>";
                            echo "<tr>";
                            for ($j = 0; $j < 9; $j++) {
                                echo '<td><input min="1" max="9" type="number"  id="' . $i . '|' . $j . '">';
                                // echo "<td>".$j;
                            }
                        }
                        ?>
                </table>


            </form>
        </div>
        <div class="col-sm-4">
            <p>

            <h3>The sudoku contains
                <mark class="text-success" id="isValid">no errors</mark>
                !
            </h3>
            <h3>Execution time
                <mark id="execTime" class="big"></mark>
                ms.
            </h3>

            <p>
                <a href="#" class="btn btn-info btn-lg" id="startSolve"><span class="glyphicon glyphicon-play"></span>
                    Solve it!</a>
                <a href="#" class="btn btn-info btn-lg" id="clearField"><span class="glyphicon glyphicon-trash"></span>
                    Clear</a>
            </p>
        </div>
    </div>
</div>


<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
<script src="js/magic.js"></script>
</body>
</html>
