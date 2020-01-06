function GetRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function RunRadio() {
    let answers = document.getElementsByClassName("answer-item");
    let checkedIndex = GetRandomInt(0, answers.length);
    let radioId = answers[checkedIndex].id.replace("javatbd", "answer");
    let button = document.getElementById(radioId);
    button.checked = true;
    // TODO Numerical inputs need to be distinguished
    if (document.getElementById(radioId + 'othertext') != null)
        document.getElementById(radioId + 'othertext').value='dd test';
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
}

function ShortText() {
    let answers = document.getElementsByClassName("answer-item");
    answers[0].getElementsByClassName("form-control")[0].value = "Dummy data"
}

$(document).ready(function()  {
    let ddstatus = Cookies.get('runDD');
    if (ddstatus == "1") {
        // run the correct DD
        if (len(document.getElementsByClassName("list-radio")) > 0) {
            RunRadio();
        } else if(len(document.getElementsByClassName("array-flexible-row")) > 0) {
            RunArray();
        } else if(len(document.getElementsByClassName("text-short")) > 0) {
            RunArray();
        } else if(len(document.getElementsByClassName("boilerplate")) > 0) {
            $('#movenextbtn, #movesubmitbtn').trigger('click');
        }
    }
});
