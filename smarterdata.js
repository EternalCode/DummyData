function GetRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function RunRadio() {
    let answers = document.getElementsByClassName("answer-item");
    let checkedIndex = GetRandomInt(0, answers.length);
    let radioId = answers[checkedIndex].id.replace("javatbd", "answer");
    let isOther = false;
    let button;
    if (radioId.includes("other")) {
        // TODO Numerical inputs need to be distinguished
        // select button for other option
        isOther = true;
        radioId = radioId.replace("other", "");
        document.getElementById(radioId + 'othertext').value='dd test';
        button = document.getElementById("SOTH" + radioId.replace("answer", ""));
        button.checked = true;
    } else {
        button = document.getElementById(radioId);
        button.checked = true;
    }
    button.onclick();
    $('#movenextbtn, #movesubmitbtn').trigger('click');
}

function RunArray() {
    let answers = document.getElementsByClassName("radio-list");
    for (let row = 0; row < answers.length; row++) {
        if (answers[row].style.cssText == "display: none;")
            continue;
        let radios = answers[row].getElementsByClassName("answer-item");
        let checkedIndex = GetRandomInt(0, radios.length);
        let radioId = answers[row].id.replace("javatbd", "answer");
        let val = radios[checkedIndex].getElementsByClassName("radio").item(0).value
        checkedIndex += 1;
        radioId += "-" + val.toString();
        console.log(radioId);
        let button = document.getElementById(radioId);
        button.checked = true;
        button.onclick();
    }
    $('#movenextbtn, #movesubmitbtn').trigger('click');
}

function RunShortText() {
    let answers = document.getElementsByClassName("answer-item");
    answers[0].getElementsByClassName("form-control")[0].value = "Dummy data"
    $('#movenextbtn, #movesubmitbtn').trigger('click');
}

$(document).ready(function()  {
    let ddstatus = Cookies.get('runDD');
    if (ddstatus == "1") {
        // run the correct DD
        if ((document.getElementsByClassName("list-radio").length) > 0) {
            RunRadio();
        } else if (document.getElementsByClassName("array-flexible-row").length > 0) {
            RunArray();
        } else if (document.getElementsByClassName("text-short").length > 0) {
            RunShortText();
        } else if (document.getElementsByClassName("boilerplate").length > 0) {
            $('#movenextbtn, #movesubmitbtn').trigger('click');
        } else {
            $('#movenextbtn, #movesubmitbtn').trigger('click');
        }
    }

    // rotation tracker
    let rotTracker = Cookies.get('rotationTracker');
    let rotTracker2 = Cookies.get('rotationTracker2');
    let currentQid = document.getElementById("fieldnames").value.split("X")[2];
    if (rotTracker == "undefined"){
        // initialize rotation tracker and add the current question to it
        Cookies.set('rotTracker', currentQid)
        Cookies.set('rotTracker2', {QID})
    } else {
        rotTracker += "," + currentQid;
        Cookies.set('rotTracker', rotTracker);
        Cookies.set('rotTracker2', rotTracker2 + str({QID}));
    }

});
