function GetRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function RunRadio(mode, n = undefined) {
    let answers = document.getElementsByClassName("answer-item");
    let checkedIndex = GetRandomInt(0, answers.length - 1);
    let radioId = answers[checkedIndex].id.replace("javatbd", "answer");
    let button = document.getElementById(radioId);
    button.checked = true;
    // TODO Numerical inputs need to be distinguished
    if (document.getElementById(radioId + 'othertext') != null)
        document.getElementById(radioId + 'othertext').value='dd test';
    button.onclick();
    $('#movenextbtn, #movesubmitbtn').trigger('click');
}

$(document).ready(function()  {
    let ddstatus = Cookies.get('runDD');
    if (ddstatus == "1"):
        RunRadio();
});
