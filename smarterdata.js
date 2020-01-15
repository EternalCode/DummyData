// js cookie 3.0.0
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self,function(){var n=e.Cookies,r=e.Cookies=t();r.noConflict=function(){return e.Cookies=n,r}}())}(this,function(){"use strict";var e={read:function(e){return e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent)},write:function(e){return encodeURIComponent(e).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,decodeURIComponent)}};function t(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)e[r]=n[r]}return e}return function n(r,o){function i(e,n,i){if("undefined"!=typeof document){"number"==typeof(i=t({},o,i)).expires&&(i.expires=new Date(Date.now()+864e5*i.expires)),i.expires&&(i.expires=i.expires.toUTCString()),n=r.write(n,e),e=encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape);var c="";for(var u in i)i[u]&&(c+="; "+u,!0!==i[u]&&(c+="="+i[u].split(";")[0]));return document.cookie=e+"="+n+c}}return Object.create({set:i,get:function(t){if("undefined"!=typeof document&&(!arguments.length||t)){for(var n=document.cookie?document.cookie.split("; "):[],o={},i=0;i<n.length;i++){var c=n[i].split("="),u=c.slice(1).join("=");'"'===u[0]&&(u=u.slice(1,-1));try{var f=e.read(c[0]);if(o[f]=r.read(u,f),t===f)break}catch(e){}}return t?o[t]:o}},remove:function(e,n){i(e,"",t({},n,{expires:-1}))},withAttributes:function(e){return n(this.converter,t({},this.attributes,e))},withConverter:function(e){return n(t({},this.converter,e),this.attributes)}},{attributes:{value:Object.freeze(o)},converter:{value:Object.freeze(r)}})}(e,{path:"/"})});
function GetRandomInt(min,max){min=Math.ceil(min);max=Math.floor(max);return Math.floor(Math.random()*(max-min))+min;}

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

/*
* <runDD> - Runs DD for following questions
* <pauseDD> - Stops DD for current question
* <stopDD> - Stops DD for remaining
*/
function RunDD() {
    let ddstatus = Cookies.get('runDD');
    let run = document.getElementsByTagName("runDD").length;
    let pause = document.getElementsByTagName("pauseDD").length;
    let stop = document.getElementsByTagName("stopDD").length;
    if (ddstatus == "1" && pause == 0 && stop == 0) {
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
    } else if (stop > 0) {
        Cookies.set("runDD", 0);
    } else if (run > 0) {
        Cookies.remove('rotationTracker');
        Cookies.set('runDD', '1');
        RunDD();
    }
}

function RotateItems() {
    // get rotation type, list or inline
    let rotations = document.getElementsByTagName("rot");
    let useUl = false;
    if (rotations.length == 0) {
        rotations = document.getElementsByTagName("rotul");
        if (rotations.length > 0)
            useUl = true;
        else
            return;
    }
    // get filtered list items
    let options = rotations[0].innerHTML.split("\n").join("").match(/[^\[\]]+/g);
    options = options.filter((el) => el && el.trim() != '');
    let anchored = [];
    for (let i = 0; i < options.length; i++) {
        let content = options[i].match(/\(([^)]+)\)/);
        if (content != "" && content != null) {
            content = content[1];
            options[i] = options[i].replace("(" + content + ")", "");
            options[i] = [options[i], content];
        } else {
            content = [];
            options[i] = [options[i], content];
        }
        // get anchored items and their indexes
        if (options[i][0].startsWith("$$")) {
            options[i][0] = options[i][0].slice(2, options[i][0].length);
            anchored.push({item: options[i][0], index : i, ansOpts : options[i][1]});
            options[i] = undefined;
        }
    }
    options = options.filter((el) => el && el[0].trim() != '');
    let result = useUl ? "<ul>" : "";
    let prefix = useUl ? "<li>" : "";
    let suffix = useUl ? "</li>" : "";
    let ansList = document.getElementsByClassName("answers-list").item(0);
    let ans = document.getElementsByClassName("answer-item");
    let answerOptions = [];

    for (let i = ans.length - 1; i >= 0; i--) {
        answerOptions.push(ans.item(0));
        ansList.removeChild(ans.item(0));
    }
    let counter = 0;
    while ((options.length + anchored.length) != 0) {
        if (anchored.length > 0) {
            if (anchored[0].index == counter) {
                result += prefix + anchored[0].item + suffix;
                let opts = anchored[0].ansOpts;
                if (opts.length > 0) {
                    opts = opts.split(",");
                    for (let i = 0; i < opts.length; i++) {
                        ansList.append(answerOptions[opts[parseInt(i)]]);
                        answerOptions[opts[parseInt(i)]] = undefined;
                    }
                }
                // convert
                anchored.splice(0, 1);
                counter++;
                continue;
            }
        }
        let index = Math.floor(Math.random() * options.length);
        let opts = options[index][1];
        if (opts.length > 0) {
            opts = opts.split(",");
            for (let i = 0; i < opts.length; i++) {
                ansList.append(answerOptions[parseInt(opts[i])]);
                answerOptions[parseInt(opts[i])] = undefined;
            }
        }
        result += prefix + options[index][0] + suffix;
        options.splice(index, 1);
        counter++;
	}
    for (let i = 0; i < answerOptions.length; i++) {
        if (answerOptions[i] != undefined)
            ansList.append(answerOptions[i]);
    }
    result += useUl ? "</ul>" : "";
    $(rotations[0]).replaceWith(result);
    RotateItems();
}

function SetpMode(value) {
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
        console.log("Couldn't convert pMode to int. pMode is: " + mode);
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


function AnswersFlip() {
    // start point
    // end points
    let ansFlip = document.getElementsByTagName("ansFlip");
    if (ansFlip.length == 0)
        return;
    let data = ansFlip.getAttribute("data-ans");
    data = data.replace("(", "").replace(")", "").trim().split(",");
    let start = parseInt(data[0]);
    let end = parseInt(data[1]);

    let ansList = document.getElementsByClassName("answers-list").item(0);
    let ans = document.getElementsByClassName("answer-item");

    let answerOptions = [];

    for (let i = ans.length - 1; i >= 0; i--) {
        answerOptions.push(ans.item(0));
        ansList.removeChild(ans.item(0));
    }
    // get a sub array of values between start and end
    let arrFlipped = answerOptions.slice(start, end + 1);
    if (GetRandomInt(0, 100) >= 50)
        arrFlipped.reverse();
    for (let i = 0; i < answerOptions.length; i++) {
        if (i >= start && i <= end) {
            ansList.append(arrFlipped[i - start]);
        } else {
            ansList.append(answerOptions[i]);
        }
    }
}


function AnswerInsertWord() {
    let toInsert = document.getElementsByTagName("ansInsWord");
    if (toInsert.length < 1)
        return;
    toInsert = toInsert[0].innerText.split(",");
    var ans = document.getElementsByClassName("answer-item").item(parseInt(toInsert[1])).getElementsByClassName("label-text label-clickable").item(0);
    $("<br><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + toInsert[0] + "<p>").insertAfter($(ans));
    toInsert = document.getElementsByTagName("ansInsWord");
    $(toInsert).replaceWith("");
}



$(document).ready(function()  {
    // Dummy Data
    RunDD();
    // rotation tracker
    RotationTracker();
    // PMode substitutions
    ParseModeText();
    RotateItems();
    AnswersFlip();
    AnswerInsertWord();
});
