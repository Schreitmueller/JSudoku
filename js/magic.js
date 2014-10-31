/**
 * Created by Philipp on 26.10.2014.
 * Start of API
 */

var SUDOKU = SUDOKU || {};

SUDOKU.checkValidity = function (x, y, number, field) {
    // check row
    for (var i = 0; i < 9; i++) {
        // row
        if (field[y][i] == number)
            return false;
        // column
        if (field[i][x] == number)
            return false;
        // square
        var quadx = 0;
        var quady = 0;
        var nextPos = y*9+x;// +1;
        if (nextPos % 9 <= 2)
            quadx = 0;
        else if (nextPos % 9 <= 5)
            quadx = 3;
        else
            quadx = 6;

        if (nextPos <= 26)
            quady = 0;
        else if (nextPos <= 53)
            quady = 3;
        else
            quady = 6;
        if (field[quady + Math.floor(((i + 1) / 3)) % 3][(i + 1) % 3 + quadx] == number)
            return false;
    }
    return true;

};

SUDOKU.isEqual = function (s1, s2) {
    for (var i = 0; i < 9; i++)
        for (var j = 0; j < 9; j++)
            if (s1[i][j] != s2[i][j])
                return false;
    return true;
};

SUDOKU.isCurrentlyValid = function (field) {
    for (var i = 0; i < 9; i++)
        for (var j = 0; j < 9; j++) {
            var x = field[i][j];
            if (x != 0) {
                field[i][j] = 0;
                if (!this.checkValidity(j, i, x, field))
                    return false;
                else
                    field[i][j] = x;
            }
        }
    return true;
};

SUDOKU.getInput = function () {
    var field = SUDOKU.getEmptyField();
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            var t = document.getElementById(i + "|" + j).value;
            field[i][j] = (t != "") ? parseInt(t) : 0;
        }
    }
    return field;
};

SUDOKU.setInput = function (field) {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            document.getElementById(i + "|" + j).value = field[i][j];
        }
    }
};
SUDOKU.getNextState = function (field) {
    var stack = [];
    var nextX = 0;
    var nextY = 0;
    var isSet = 0;
    for (var y = 0; y < 9; y++) {
        for (var x = 0; x < 9; x++) {
            if (field[y][x] == 0) {
                nextX = x;
                nextY = y;
                isSet = 1;
                break;
            }
        }
        if (isSet == 1)
            break;
    }
    for (var z = 1; z <= 9; z++) {
        if (SUDOKU.checkValidity(nextX, nextY, z, field)) {
            var newEntry = this.copyState(field);
            newEntry[nextY][nextX] = z;
            stack.push(newEntry);
        }
    }
    return stack;
};
SUDOKU.copyState = function (field) {
    var ret = this.getEmptyField();
    for (var i = 0; i < 9; i++)
        for (var j = 0; j < 9; j++)
            ret[i][j] = field[i][j];

    return ret;
}
SUDOKU.getCount = function (field) {
    var count = 0;
    for (var i = 0; i < 9; i++)
        for (var j = 0; j < 9; j++)
            if (field[i][j] != 0)
                count++;
    return count;
};
SUDOKU.getEmptyField = function () {
    return [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]]
};
SUDOKU.contains = function (x, list) {
    for (var i = 0; i < list.length; i++) {
        if (this.isEqual(x, list[i]))
            return i;
    }
    return -1;
};

SUDOKU.solve = function (field) {
    var best = 0;
    var open = [];
    var closed = [];
    if (!SUDOKU.isCurrentlyValid(field))
        return null;
    open.push(field);
    while (open.length != 0) {
        var x = open.pop();
        var curCount = SUDOKU.getCount(x);
        if (curCount > best) {
            best = curCount;
            SUDOKU.setInput(x);
        }
        console.log("Current best:" + best + "\n");
        if (curCount == 81) {
            return x;
        } else {
            closed.push(x);
            var next = SUDOKU.getNextState(x);
            for (var i = 0; i < next.length; i++) {
                var y = next[i];
                if ((SUDOKU.contains(y, open) == -1) && (SUDOKU.contains(y, closed)) == -1) {
                    open.push(y);
                }
            }

        }
    }
    return null;
};

var UI = UI || {};

UI.setTime = function(text){
    $("#execTime").text(text);
};
UI.setValid = function(success){
    if(success){
        $("#isValid").text("no errors");
        $("#isValid").addClass("text-success");
        $("#isValid").removeClass("text-danger");
    }else{
        $("#isValid").text("errors");
        $("#isValid").addClass("text-danger");
        $("#isValid").removeClass("text-success");
    }
};

/*
* End of API
* Accessing DOM
* */
$(document).ready(function () {
    $("input").change(function (event) {
        event.preventDefault();
        var field = SUDOKU.getInput();
        if (SUDOKU.isCurrentlyValid(field)) {
            $("#isValid").text("valid");
            $("#isValid").parent().parent().addClass("text-success");
            $("#isValid").parent().parent().removeClass("text-danger")

        } else {
            $("#isValid").html("not valid");
            $("#isValid").parent().parent().addClass("text-danger");
            $("#isValid").parent().parent().removeClass("text-danger");

        }

    });
    $("#startSolve").click(function (event) {
        event.preventDefault();
        var field = SUDOKU.getInput();
        var start= Date.now();
        var solution = SUDOKU.solve(field);
        var end= Date.now();
        $('input[type="number"]').attr("disabled");
        $("#execTime").text(end-start);

        if (solution != null) {
            SUDOKU.setInput(solution);
            $("#startSolve").children().addClass("glyphicon glyphicon-ok");
        }
    });
    $("#clearField").click(function (event) {
        event.preventDefault();
        $("#startSolve").children().removeClass("glyphicon-ok");
        $('input[type="number"]').val("");
        $('input[type="number"]').removeAttr("disabled");
    });
});
