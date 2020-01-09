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
        document.getElementById(radioId + 'othertext').value='2000';
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

function RotationTracker() {
    let rotTracker = Cookies.get('rotationTracker');
    let currentQid = document.getElementById("fieldnames").value.split("X")[2];
    if (rotTracker == undefined){
        // initialize rotation tracker and add the current question to it
        Cookies.set('rotationTracker', currentQid)
    } else {
        if (rotTracker.includes(currentQid))
            return;
        rotTracker += "," + currentQid;
        Cookies.set('rotationTracker', rotTracker);
    }
}

function RunDD() {
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
}

function setpMode(value) {
    Cookies.set('pMode', (value).toString());
}

function ParseModeText() {
    // <p-o></p-o> = Phone only
    // <e-t></e-t> = Email and Text
    let mode = Cookies.get('pMode');
    if (mode == undefined)
        return
    try {
        mode = parseInt(mode);
    } catch (err) {
        console.log("Couldn't convert pMode to int. PMode is: " + mode);
        return
    }
    switch (mode) {
        case 1:
            // phone mode, hide all email and text tags
            let ettags = document.getElementsByTagName("E-T");
            for (let i = 0; i < ettags.length; i++) {
                ettags[i].parentNode.removeChild(ettags[i]);
            }
            break;
        case 2:
        case 3:
            // email/text mode, hide all phone tags
            let ptags = document.getElementsByTagName("P-O");
            for (let i = 0; i < ptags.length; i++) {
                ptags[i].parentNode.removeChild(ptags[i]);
            }
            break;
    };
}

$(document).ready(function()  {
    // Dummy Data
    RunDD();
    // rotation tracker
    RotationTracker();
    // PMode substitutions
    ParseModeText();
});
