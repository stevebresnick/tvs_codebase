var H5PEditor = H5PEditor || {};
var ns = H5PEditor;

var currentStepNumber = 0;
var currentHotspotNumber = 0;
var currentQuestionNumber = 0;

function updateActionButtons() {
    try {
        //H5P.jQuery(".list-item-title-bar").hide();
        //H5P.jQuery(".title").hide();
        
        var thisObject = JSON.parse(localStorage.getItem("objectInfo"));
        if (thisObject.name.toLowerCase() === "interactivevideo") {
            if (((H5P.jQuery(".h5p-thumbnail video").length > 0) || (H5P.jQuery(".h5p-thumbnail iframe").length > 0)) && (H5P.jQuery("#actionButtonStep1").length === 1)) {
                H5P.jQuery("#actionButtonStep1")[0].className="actionButtonsChosen";
                if (currentStepNumber === 1) {
                    H5P.jQuery("#contentHeaderButtonBarDesc").html("Now add interactions");
                }
            }
            else {
                H5P.jQuery("#actionButtonStep1")[0].className="actionButtons";
            }

            if (H5P.jQuery(".h5p-interactions-container").children().length > 0) {
                H5P.jQuery("#actionButtonStep2")[0].className="actionButtonsChosen";
                if (currentStepNumber === 2) {
                    H5P.jQuery("#contentHeaderButtonBarDesc").html("Save when you are finished");
                    H5PIntegration.thisIV.IV.resizeControls();
                    H5PIntegration.thisIV.$bar.resize();
                }
            }
            else {
                H5P.jQuery("#actionButtonStep2")[0].className="actionButtons";
            }
        }
        else if (thisObject.name.toLowerCase() === "menu") {
            if ((H5P.jQuery(".fileThumb img").length > 0) && (H5P.jQuery("#actionButtonStep1").length === 1)) {
                H5P.jQuery("#actionButtonStep1")[0].className="actionButtonsChosen";
                if (currentStepNumber === 1) {
                    H5P.jQuery("#contentHeaderButtonBarDesc").html("Add the hotspots you wish to display");
                }
            }
            else {
                H5P.jQuery("#actionButtonStep1")[0].className="actionButtons";
            }

            if (H5P.jQuery('.listgroup').length > 0) {
                H5P.jQuery("#actionButtonStep2")[0].className="actionButtonsChosen";
                if (currentStepNumber === 2) {
                    H5P.jQuery("#contentHeaderButtonBarDesc").html("Save when you are finished");
                }
            }
            else {
                H5P.jQuery("#actionButtonStep2")[0].className="actionButtons";
            }

            H5P.jQuery('.workflowstep .content .field.list > .h5peditor-label').hide();
            H5P.jQuery('.workflowstep .content .field.library > .h5peditor-label').hide()
            H5P.jQuery('.listgroup .field .content .library:last > select').hide();

            if (H5P.jQuery('.libwrap:nth(' + (currentHotspotNumber) + ')').children().length > 0) {
                H5P.jQuery('.libwrap:nth(' + (currentHotspotNumber) + ')').children()[0].style.display="block";
            }
            //H5P.jQuery(".field.list .field .content").show();
            H5P.jQuery(".field.list .field .content .field.library").show();
        }
        else if (thisObject.name.toLowerCase() === "mle") {
            
            if (H5P.jQuery(".field.group:last > .title").length > 0) {
                H5P.jQuery(".field.group:last > .title")[0].style.height = "0px";
                H5P.jQuery(".field.group:last > .title")[0].style.borderBottom = "1px solid #ccc";
                H5P.jQuery(".field.group:last > .title")[0].style.padding = "0px";
            }
            
            if ((H5P.jQuery('.libwrap').children().length > 0) && (H5P.jQuery("#actionButtonStep1").length === 1)) {
                H5P.jQuery("#actionButtonStep1")[0].className="actionButtonsChosen";
                if (currentStepNumber === 1) {
                    H5P.jQuery("#contentHeaderButtonBarDesc").html("Now add questions");
                }
            }
            else {
                H5P.jQuery("#actionButtonStep1")[0].className="actionButtons";
            }

            if (((H5P.jQuery('.workflowstep:first > .content > .field.text > textarea').length > 0) && (H5P.jQuery('.workflowstep:first > .content > .field.text > textarea')[0].innerText !== "") && (H5P.jQuery('.workflowstep:first > .content > .field.text > textarea')[0].innerText !== "<br>")) && ((H5P.jQuery('.workflowstep:first > .content > .field.text > div > .nicEdit-main').length > 0) && (H5P.jQuery('.workflowstep:first > .content > .field.text > div > .nicEdit-main')[0].innerText !== "") && (H5P.jQuery('.workflowstep:first > .content > .field.text > div > .nicEdit-main')[0].innerText !== "<br>") && (H5P.jQuery('.workflowstep:first > .content > .field.text > div > .nicEdit-main')[0].innerText !== "<h1><br></h1>"))) {
                H5P.jQuery("#actionButtonStep2")[0].className="actionButtonsChosen";
                if (currentStepNumber === 2) {
                    H5P.jQuery("#contentHeaderButtonBarDesc").html("Now add questions");
                }
            }
            else {
                H5P.jQuery("#actionButtonStep2")[0].className="actionButtons";
            }

            if (H5P.jQuery('.listgroup').length > 0) {
                H5P.jQuery("#actionButtonStep3")[0].className="actionButtonsChosen";
                if (currentStepNumber === 3) {
                    H5P.jQuery("#contentHeaderButtonBarDesc").html("Save when you are finished");
                }
            }
            else {
                H5P.jQuery("#actionButtonStep3")[0].className="actionButtons";
            }
        }
    }
    catch (ex) {}

    setTimeout(updateActionButtons,500);
    
}

function validateContent() {
    var thisObject = JSON.parse(localStorage.getItem("objectInfo"));
    if (thisObject.name.toLowerCase() === "interactivevideo") {
        //Save interactive video
        if ((H5P.jQuery(".h5p-thumbnail video").length === 0) && (H5P.jQuery(".h5p-thumbnail iframe").length === 0)) {
            alert("You must upload a video");
            return false;
        }
    }
    else if (thisObject.name.toLowerCase() === "menu") {
        if (H5P.jQuery(".fileThumb img").length === 0) {
            alert("You must upload a background image");
            return false;
        }
    }
    else if (thisObject.name.toLowerCase() === "mle") {
        if (H5P.jQuery('.libwrap').children().length === 0) {
            alert("You must create content");
            return false;
        }
    }
    
    return true;
}

function saveContent() {
    if (validateContent()) {
        parent.document.getElementById("edit-submit").click();
    }
}

function setHotspotType(hotspotNumber, type) {
    if (type === 1) {
        H5P.jQuery('.listgroup .field .content .library > select')[hotspotNumber].value = "H5P.Text 1.1";
    }
    else if (type === 2) {
        H5P.jQuery('.listgroup .field .content .library > select')[hotspotNumber].value = "H5P.Video 1.1";
    }
    else if (type === 3) {
        H5P.jQuery('.listgroup .field .content .library > select')[hotspotNumber].value = "H5P.Image 1.0";
    }
    else if (type === 4) {
        H5P.jQuery('.listgroup .field .content .library > select')[hotspotNumber].value = "H5P.URL 1.1";
    }
    else if (type === 5) {
        H5P.jQuery('.listgroup .field .content .library > select')[hotspotNumber].value = "H5P.PDF 1.0";
    }
    H5P.jQuery('.listgroup .field .content .library:last > select').change();
    
    setTimeout(goToHotspot,250,hotspotNumber,type);
}


function deleteThisQuestion(questionNumber) {
    debugger;
    H5P.jQuery("div.remove")[questionNumber].click();
    goToStep(3);
}

function deleteThisHotspot(hotspotNumber) {
    H5P.jQuery("div.remove")[hotspotNumber].click();
    goToStep(2);
}

function goToHotspot(hotspotNumber,type) {
    currentHotspotNumber = hotspotNumber;
    H5P.jQuery('.listgroup .field.group .content').hide();
    H5P.jQuery('.listgroup .field.group .content').children().hide();
    for (var i = 0; i < H5P.jQuery('.listgroup').length; i++) {
        if (i !== hotspotNumber) {
            H5P.jQuery('.listgroup')[i].style.display="none";
            H5P.jQuery('.listgroup .field.group')[i].style.display="none";
            if (H5P.jQuery("#contentHeaderActionSubbar span").length > 0) {
                H5P.jQuery("#contentHeaderActionSubbar span:nth(" + i + ")")[0].style.color = "lightgray";
            }
        }
        else {
            H5P.jQuery('.listgroup')[i].style.display="block";
            H5P.jQuery('.listgroup .field.group')[i].style.display="block";
            if (H5P.jQuery("#contentHeaderActionSubbar span").length > 0) {
                H5P.jQuery("#contentHeaderActionSubbar span:nth(" + i + ")")[0].style.color = "black";
            }
        }
    }
    
    for (var j = 0; j< H5P.jQuery('.listgroup .field.group .content').length; j++) {
        for (var k = 0; k < H5P.jQuery('.listgroup .field.group .content')[j].children.length; k++) {
            if (k === 0) {
                //left align
                H5P.jQuery('.listgroup .field.group .content')[j].children[k].style.display="block";
                H5P.jQuery('.listgroup .field.group .content')[j].children[k].style.float="left";
                H5P.jQuery('.listgroup .field.group .content')[j].children[k].style.width="45%";
                H5P.jQuery('.listgroup .field.group .content')[j].children[k].style.border="0px";
            }
            else if (k === 1) {
                //hide
                H5P.jQuery('.listgroup .field.group .content')[j].children[k].style.display="none";
            }
            else if (k === 2) {
                H5P.jQuery('.listgroup .field.group .content')[j].children[k].style.display="block";
                H5P.jQuery('.listgroup .field.group .content')[j].children[k].style.float="right";
                H5P.jQuery('.listgroup .field.group .content')[j].children[k].style.width="46%";
                H5P.jQuery('.listgroup .field.group .content')[j].children[k].style.border="0px";
                
                var deleteHtml = "<p style='float:right;'><span onclick='deleteThisHotspot(" + (j) + ");' style='cursor:pointer;'><img src='/sites/default/files/images/trash.svg' style='height:20px;' /></span></p>";
                if (H5P.jQuery('.listgroup .field.group .content')[j].children[k].children[0].children[0].innerHTML.indexOf("deleteThisHotspot") === -1) {
                    H5P.jQuery('.listgroup .field.group .content')[j].children[k].children[0].children[0].innerHTML += deleteHtml;
                }
                
            }
            else {
                //right align
                H5P.jQuery('.libwrap')[hotspotNumber].style.display="block";
                H5P.jQuery('.listgroup .field.group .content')[j].children[k].style.float="right";
                H5P.jQuery('.listgroup .field.group .content')[j].children[k].style.width="45%";
                H5P.jQuery('.listgroup .field.group .content')[j].children[k].style.border="0px";
            }
            
        }
    }
    
    setTimeout(function(){
        if (H5P.jQuery('.libwrap').length === 0) { return;}
        hideExtraLibraryOptionsPart(hotspotNumber,type);
    }, 500);
    
}

function goToQuestion(questionNumber) {
    currentQuestionNumber = questionNumber;
    
    
    for (var a=0; a < H5P.jQuery('.workflowstep:first > .content > .field.list > .h5peditor-widget-wrapper > .h5p-ul > .h5p-li').length; a++) {
        H5P.jQuery('.workflowstep:first > .content > .field.list > .h5peditor-widget-wrapper > button').hide();
        if (a === questionNumber) {
            H5P.jQuery('.workflowstep:first > .content > .field.list > .h5peditor-widget-wrapper > .h5p-ul > .h5p-li:nth(' + a + ')').show();
            H5P.jQuery('.workflowstep:first > .content > .field.list > .h5peditor-widget-wrapper > .h5p-ul > .h5p-li:nth(' + a + ') > .content > .field.library > .libwrap').show();
            debugger;
            var deleteHtml = "<p style='float:right;'><span onclick='deleteThisQuestion(" + (a) + ");' style='cursor:pointer;'><img src='/sites/default/files/images/trash.svg' style='height:20px;' /></span></p>";
            if (H5P.jQuery('.workflowstep:first > .content > .field.list > .h5peditor-widget-wrapper > .h5p-ul > .h5p-li:nth(' + a + ') > .content > .field.library > .libwrap')[0].innerHTML.indexOf('deleteThisQuestion') === -1) {
                H5P.jQuery('.workflowstep:first > .content > .field.list > .h5peditor-widget-wrapper > .h5p-ul > .h5p-li:nth(' + a + ') > .content > .field.library > .libwrap').prepend(deleteHtml);
            }
        }
        else {
            H5P.jQuery('.workflowstep:first > .content > .field.list > .h5peditor-widget-wrapper > .h5p-ul > .h5p-li:nth(' + a + ')').hide();
            H5P.jQuery('.workflowstep:first > .content > .field.list > .h5peditor-widget-wrapper > .h5p-ul > .h5p-li:nth(' + a + ') > .content > .field.library > .libwrap').hide();
        }
    }
    
    for (var i = 0; i < H5P.jQuery('.workflowstep:first > .content > .field.list > .h5peditor-widget-wrapper > .h5p-ul > .h5p-li').length; i++) {
        if (i !== questionNumber) {
            if ((H5P.jQuery("#contentHeaderActionSubbar span").length > 0) && (H5P.jQuery("#contentHeaderActionSubbar span:nth(" + i + ")").length > 0)) {
                H5P.jQuery("#contentHeaderActionSubbar span:nth(" + i + ")")[0].style.color = "lightgray";
            }
        }
        else {
            if ((H5P.jQuery("#contentHeaderActionSubbar span").length > 0) && (H5P.jQuery("#contentHeaderActionSubbar span:nth(" + i + ")").length > 0)) {
                H5P.jQuery("#contentHeaderActionSubbar span:nth(" + i + ")")[0].style.color = "black";
            }
        }
    }
}

function hideExtraLibraryOptionsPart(hotspotNumber,type) {
    for (var m = 1; m < H5P.jQuery('.libwrap')[hotspotNumber].children.length; m++) {
        if (H5P.jQuery('.libwrap')[hotspotNumber].children[m].className.indexOf("h5p-link-widget") === -1) {
            H5P.jQuery('.libwrap')[hotspotNumber].children[m].style.display="none";
        }
    }

    if (H5P.jQuery('.listgroup .field .content .library > select')[hotspotNumber].value === "-") {
        //If there is no type yet set, make sure they can pick the type.
        if (type !== undefined && type !== null) {
            setTimeout(setHotspotType,500,hotspotNumber,type);
        }
    }
    H5P.jQuery('.libwrap')[hotspotNumber].style.display="block";
    H5P.jQuery('.listgroup .field.group .content:nth(' + hotspotNumber + ')').show();
}


function addNewQuestion(type) {
    //Determine new question number
    var newQuestionNumber = H5P.jQuery('.workflowstep:first > .content > .field.list > .h5peditor-widget-wrapper > .h5p-ul > .h5p-li').length;
    H5P.jQuery('.workflowstep:first > .content > .field.list > .h5peditor-widget-wrapper > button').click();
    H5P.jQuery('.workflowstep:first > .content > .field.list > .h5peditor-widget-wrapper > .h5p-ul > .h5p-li').hide();
    setTimeout(addNewQuestionStep2,500,newQuestionNumber,type);
}

function addNewQuestionStep2(newQuestionNumber,type) {
    if (localStorage.getItem("loadingLibraries") == 1) {
        localStorage.setItem("loadingLibraries",0);
        setTimeout(addNewQuestionStep3,500,newQuestionNumber,type);
    }
    else {setTimeout(addNewQuestionStep2,500,newQuestionNumber,type);}
}


function addNewQuestionStep3(newQuestionNumber,type) {
    if (type === 1) {
        H5P.jQuery('.workflowstep:first > .content > .field.list > .h5peditor-widget-wrapper > .h5p-ul > .h5p-li:nth(' + newQuestionNumber + ') > .content > .field.library > select')[0].value="H5P.SingleChoiceSet 1.3";
    }
    if (type === 2) {
        H5P.jQuery('.workflowstep:first > .content > .field.list > .h5peditor-widget-wrapper > .h5p-ul > .h5p-li:nth(' + newQuestionNumber + ') > .content > .field.library > select')[0].value="H5P.MultiChoice 1.5";
    }
    if (type === 3) {
        H5P.jQuery('.workflowstep:first > .content > .field.list > .h5peditor-widget-wrapper > .h5p-ul > .h5p-li:nth(' + newQuestionNumber + ') > .content > .field.library > select')[0].value="H5P.Blanks 1.4";
    }
    if (type === 4) {
        H5P.jQuery('.workflowstep:first > .content > .field.list > .h5peditor-widget-wrapper > .h5p-ul > .h5p-li:nth(' + newQuestionNumber + ') > .content > .field.library > select')[0].value="H5P.Summary 1.4";
    }
    
    
    H5P.jQuery('.workflowstep:first > .content > .field.list > .h5peditor-widget-wrapper > .h5p-ul > .h5p-li:nth(' + newQuestionNumber + ') > .content > .field.library > select').change();
    H5P.jQuery('.workflowstep:first > .content > .field.list > .h5peditor-widget-wrapper > .h5p-ul > .h5p-li:nth(' + newQuestionNumber + ') > .content > .field.library > select').hide();
    
    goToStep(3);
    goToQuestion(newQuestionNumber);
}

function addContent(type) {
    H5P.jQuery('.workflowstep:first > .content > .field.library').hide();
    if (type === 1) {
        H5P.jQuery('.workflowstep:first > .content > .field.library > select')[0].value="H5P.Text 1.1";
    }
    if (type === 2) {
        H5P.jQuery('.workflowstep:first > .content > .field.library > select')[0].value="H5P.Video 1.1";
    }
    if (type === 3) {
        H5P.jQuery('.workflowstep:first > .content > .field.library > select')[0].value="H5P.Image 1.0";
    }
    if (type === 4) {
        H5P.jQuery('.workflowstep:first > .content > .field.library > select')[0].value="H5P.URL 1.1";
    }
    if (type === 5) {
        H5P.jQuery('.workflowstep:first > .content > .field.library > select')[0].value="H5P.PDF 1.0";
    }
    
    H5P.jQuery('.workflowstep:first > .content > .field.library > select').change();
    
    setTimeout(goToStep,1000,1);
}


function addNewHotspot(type) {
    H5P.jQuery("#addNewHotspot")[0].click();
    var hotspotNumber = H5P.jQuery('.listgroup').length - 1;
    var hotSpotType = "";
    H5P.jQuery(".workflowstep > img").remove();
    
    if (type === 1) {
        H5P.jQuery('.listgroup .field .content .library > select')[hotspotNumber].value = "H5P.Text 1.1";
        hotSpotType = "  <span onclick='goToHotspot(" + hotspotNumber + ");' style='cursor:pointer;width: 1em;height: 1em;text-align: center;border: 1px solid #ccc;padding: 0.25em;color: #333;background: -webkit-linear-gradient(top,#fff 0,#f2f2f2 100%);' class='fa fa-letter-T-o fa-1x'></span>";
    }
    else if (type === 2) {
        H5P.jQuery('.listgroup .field .content .library > select')[hotspotNumber].value = "H5P.Video 1.1";
        hotSpotType = "  <span onclick='goToHotspot(" + hotspotNumber + ");' style='cursor:pointer;width: 1em;height: 1em;text-align: center;border: 1px solid #ccc;padding: 0.25em;color: #333;background: -webkit-linear-gradient(top,#fff 0,#f2f2f2 100%);' class='fa fa-film fa-1x'></span>";
    }
    else if (type === 3) {
        H5P.jQuery('.listgroup .field .content .library > select')[hotspotNumber].value = "H5P.Image 1.0";
        hotSpotType = "  <span onclick='goToHotspot(" + hotspotNumber + ");' style='cursor:pointer;width: 1em;height: 1em;text-align: center;border: 1px solid #ccc;padding: 0.25em;color: #333;background: -webkit-linear-gradient(top,#fff 0,#f2f2f2 100%);' class='fa fa-file-photo-o fa-1x'></span>";
    }
    else if (type === 4) {
        H5P.jQuery('.listgroup .field .content .library > select')[hotspotNumber].value = "H5P.URL 1.1";
        hotSpotType = "  <span onclick='goToHotspot(" + hotspotNumber + ");' style='cursor:pointer;cursor:pointer;width: 1em;height: 1em;text-align: center;border: 1px solid #ccc;padding: 0.25em;color: #333;background: -webkit-linear-gradient(top,#fff 0,#f2f2f2 100%);' class='fa fa-file-photo-o fa-1x'></span>";
    }
    else if (type === 5) {
        H5P.jQuery('.listgroup .field .content .library > select')[hotspotNumber].value = "H5P.PDF 1.0";
        hotSpotType = "  <span onclick='goToHotspot(" + hotspotNumber + ");' style='cursor:pointer;cursor:pointer;width: 1em;height: 1em;text-align: center;border: 1px solid #ccc;padding: 0.25em;color: #333;background: -webkit-linear-gradient(top,#fff 0,#f2f2f2 100%);' class='fa fa-file-photo-o fa-1x'></span>";
    }
    
    H5P.jQuery("#contentHeaderActionSubbar")[0].innerHTML += hotSpotType;
    
    H5P.jQuery('.listgroup .field .content .library:last > select').change();

    goToHotspot(H5P.jQuery('.listgroup .field.group .content .library .libwrap').length - 1,type);
}


function goToStep(stepNumber) {
    currentStepNumber = stepNumber;
    localStorage.setItem("currentWorkflowStep", stepNumber);
    var thisObject = JSON.parse(localStorage.getItem("objectInfo"));
    H5P.jQuery("#contentHeaderActionBar").show();
    H5P.jQuery("#contentHeaderButtonBarDesc").show();
    
    if (H5P.jQuery("#contentHeaderButtonBar")[0].innerHTML.indexOf("Select the background") > -1) {
        H5P.jQuery("#contentHeaderButtonBar")[0].innerHTML = H5P.jQuery("#contentHeaderButtonBar")[0].innerHTML.replace("<p>Select the background button below to get started</p><br><br>","");
    }
    H5P.jQuery(".workflowstep > img").remove();
    
    if (stepNumber === 3) {
        if (!validateContent()) {
            return;
        }
        
        var headerBarDescHtml = "";
        
        if (thisObject.name.toLowerCase() === "mle") {
            H5P.jQuery('.workflowstep:first > .content > .field.list > .h5peditor-widget-wrapper > button').hide();
            H5P.jQuery(".content > .field.list").show();
            H5P.jQuery("#contentHeaderActionSubbar").show();
            H5P.jQuery(".field.group:last").show();
            
            H5P.jQuery(".workflowstep > .content > .field.list > .h5peditor-widget-wrapper > .h5p-ul > .h5p-li > .content > .field.library > select").hide();
            
            headerBarDescHtml = "<div><span style='vertical-align:super;'>" + thisObject.steps[(stepNumber-1)].headerdesc + "   </span></div>";
        
            H5P.jQuery("#contentHeaderButtonBarDesc")[0].innerHTML = headerBarDescHtml;
            H5P.jQuery('.content > .field.library > .h5peditor-label').hide();
            var questionType = "<label style='font-size:1.2em;'>Existing Questions</label><label class='fa fa-angle-double-right fa-1x' style='font-weight:700;padding-right:0.2em;padding-left:0.2em;'></label>";
            if (H5P.jQuery('.content > .field.library').length > 0) {
                for (var i = 0; i < H5P.jQuery('.workflowstep:first > .content > .field.list > .h5peditor-widget-wrapper > .h5p-ul > .h5p-li').length; i++) {
                    var opacityCSS = "";
                    if (i > 0) {H5P.jQuery('.workflowstep:first > .content > .field.list > .h5peditor-widget-wrapper > .h5p-ul > .h5p-li')[i].style.display="none";opacityCSS="color:lightgray;"}

                    debugger;
                    switch (H5P.jQuery('.workflowstep:first > .content > .field.list > .h5peditor-widget-wrapper > .h5p-ul > .h5p-li > .content > .field.library > select option:selected')[i].value.toLowerCase()) {
                        case "h5p.summary 1.4":
                            questionType += "  <span class='fa fa-summary-question fa-1x' onclick='goToQuestion(" + i + ");' style='cursor:pointer;width: 1em;height: 1em;text-align: center;border: 1px solid #ccc;padding: 0.25em;color: #333;background: -webkit-linear-gradient(top,#fff 0,#f2f2f2 100%);" + opacityCSS + "'></span>";
                            break;
                        case "h5p.multichoice 1.5":
                            questionType += "  <span class='fa fa-multi-choice fa-1x' onclick='goToQuestion(" + i + ");' style='cursor:pointer;width: 1em;height: 1em;text-align: center;border: 1px solid #ccc;padding: 0.25em;color: #333;background: -webkit-linear-gradient(top,#fff 0,#f2f2f2 100%);" + opacityCSS + "'></span>";
                            break;
                        case "h5p.singlechoice 1.3":
                            questionType += "  <span class='fa fa-single-choice fa-1x' onclick='goToQuestion(" + i + ");' style='cursor:pointer;width: 1em;height: 1em;text-align: center;border: 1px solid #ccc;padding: 0.25em;color: #333;background: -webkit-linear-gradient(top,#fff 0,#f2f2f2 100%);" + opacityCSS + "'></span>";
                            break;
                        case "h5p.blanks 1.4":
                            questionType += "  <span class='fa fa-fill-in-blanks fa-1x' onclick='goToQuestion(" + i + ");' style='cursor:pointer;width: 1em;height: 1em;text-align: center;border: 1px solid #ccc;padding: 0.25em;color: #333;background: -webkit-linear-gradient(top,#fff 0,#f2f2f2 100%);" + opacityCSS + "'></span>";
                            break;
                    }
                }
            }
            H5P.jQuery("#contentHeaderActionSubbar")[0].innerHTML = questionType;
            H5P.jQuery("#contentHeaderActionBar")[0].innerHTML = "<span class='fa fa-multi-choice fa-2x' title='Single or Multiple Choice' style='cursor:pointer;width: 1em;height: 1em;text-align: center;border: 1px solid #ccc;padding: 0.25em;color: #333;background: -webkit-linear-gradient(top,#fff 0,#f2f2f2 100%);' onclick='addNewQuestion(2);'></span>   <span class='fa fa-fill-in-blanks fa-2x' style='cursor:pointer;width: 1em;height: 1em;text-align: center;border: 1px solid #ccc;padding: 0.25em;color: #333;background: -webkit-linear-gradient(top,#fff 0,#f2f2f2 100%);' title='Fill in the Blanks' onclick='addNewQuestion(3);'></span>   <span class='fa fa-summary-question fa-2x' style='cursor:pointer;width: 1em;height: 1em;text-align: center;border: 1px solid #ccc;padding: 0.25em;color: #333;background: -webkit-linear-gradient(top,#fff 0,#f2f2f2 100%);' title='Summary Question' onclick='addNewQuestion(4);'></span>";
        }
        if (thisObject.name.toLowerCase() === "mle") {goToQuestion(0);}
        goToQuestion(0);
    }
    else if (stepNumber === 2) {
        if (!validateContent()) {
            return;
        }
        else {
            if (thisObject.name.toLowerCase() === "interactivevideo") {
                H5P.jQuery(".workflowstep .field.group:first").show();
                H5P.jQuery(".field.group.workflowstep .content img[class!='h5p-remove']").hide();
                H5P.jQuery(".contentHeaderActionBar").hide();
            }
            else if (thisObject.name.toLowerCase() === "menu") {
                H5P.jQuery("#contentHeaderActionSubbar").show();
                H5P.jQuery(".workflowstep .field.group").hide();
                H5P.jQuery(".sp-container").hide();
                
                H5P.jQuery(".contentHeaderActionBar").show();
            }
            else if (thisObject.name.toLowerCase() === "mle") {
                H5P.jQuery(".field.group:last").hide();
                H5P.jQuery('.workflowstep:first > .content > .field.list > .h5peditor-widget-wrapper > button').hide();
                H5P.jQuery(".workflowstep:first > .content > .field.text").show();
                //H5P.jQuery(".content > .field.library").hide();
                H5P.jQuery("#contentHeaderActionSubbar").hide();
                H5P.jQuery(".contentHeaderActionBar").hide();
            }
        }
        
        var headerBarDescHtml = "";
        if (thisObject.name.toLowerCase() === "interactivevideo") {
            headerBarDescHtml = "<div><span style='vertical-align:super;'>" + thisObject.steps[(stepNumber-1)].headerdesc + "   </span></div>";
            H5PIntegration.thisIV.setActive();
        }
        else if (thisObject.name.toLowerCase() === "menu") {
            headerBarDescHtml = "<div><span style='vertical-align:super;'>" + thisObject.steps[(stepNumber-1)].headerdesc + "   </span></div>";
        
            H5P.jQuery("#contentHeaderButtonBarDesc")[0].innerHTML = headerBarDescHtml;

            //debugger;
            H5P.jQuery('.field .library > select').hide();
            var hotSpotType = "<label style='font-size:1.2em;'>Existing Hotspots</label><label class='fa fa-angle-double-right fa-1x' style='font-weight:700;padding-right:0.2em;padding-left:0.2em;'></label>";
            if (H5P.jQuery('.listgroup').length > 0) {
                for (var i = 0; i < H5P.jQuery('.listgroup').length; i++) {
                    var opacityCSS = "";
                    if (i > 0) {H5P.jQuery('.listgroup')[i].style.display="none";opacityCSS="color:lightgray;"}

                    switch (H5P.jQuery('.listgroup .library > select')[i].value.toLowerCase()) {
                        case "h5p.text 1.1":
                            hotSpotType += "  <span class='fa fa-letter-T-o fa-1x' onclick='goToHotspot(" + i + ");' style='cursor:pointer;width: 1em;height: 1em;text-align: center;border: 1px solid #ccc;padding: 0.25em;color: #333;background: -webkit-linear-gradient(top,#fff 0,#f2f2f2 100%);" + opacityCSS + "'></span>";
                            break;
                        case "h5p.video 1.1":
                            hotSpotType += "  <span class='fa fa-film fa-1x' onclick='goToHotspot(" + i + ");' style='cursor:pointer;width: 1em;height: 1em;text-align: center;border: 1px solid #ccc;padding: 0.25em;color: #333;background: -webkit-linear-gradient(top,#fff 0,#f2f2f2 100%);" + opacityCSS + "'></span>";
                            break;
                        case "h5p.image 1.0":
                            hotSpotType += "  <span class='fa fa-file-photo-o fa-1x' onclick='goToHotspot(" + i + ");' style='cursor:pointer;width: 1em;height: 1em;text-align: center;border: 1px solid #ccc;padding: 0.25em;color: #333;background: -webkit-linear-gradient(top,#fff 0,#f2f2f2 100%);" + opacityCSS + "'></span>";
                            break;
                        case "h5p.url 1.1":
                            hotSpotType += "  <span class='fa fa-link fa-1x' onclick='goToHotspot(" + i + ");' style='cursor:pointer;width: 1em;height: 1em;text-align: center;border: 1px solid #ccc;padding: 0.25em;color: #333;background: -webkit-linear-gradient(top,#fff 0,#f2f2f2 100%);" + opacityCSS + "'></span>";
                            break;
                        case "h5p.pdf 1.0":
                            hotSpotType += "  <span class='fa fa-link fa-1x' onclick='goToHotspot(" + i + ");' style='cursor:pointer;width: 1em;height: 1em;text-align: center;border: 1px solid #ccc;padding: 0.25em;color: #333;background: -webkit-linear-gradient(top,#fff 0,#f2f2f2 100%);" + opacityCSS + "'></span>";
                            break;
                    }
                }
            }
            else {
                //If no hotspots show the background image
                H5P.jQuery(".fileThumb img:first").clone().appendTo(".workflowstep");
            }
            H5P.jQuery("#contentHeaderActionSubbar")[0].innerHTML = hotSpotType;
            
            H5P.jQuery("#contentHeaderActionBar")[0].innerHTML = "<span class='fa fa-letter-T-o fa-2x' title='Click to add text' style='cursor:pointer;width: 1em;height: 1em;text-align: center;border: 1px solid #ccc;padding: 0.25em;color: #333;background: -webkit-linear-gradient(top,#fff 0,#f2f2f2 100%);' onclick='addNewHotspot(1);'></span>   <span class='fa fa-film fa-2x' title='Click to add video' style='cursor:pointer;width: 1em;height: 1em;text-align: center;border: 1px solid #ccc;padding: 0.25em;color: #333;background: -webkit-linear-gradient(top,#fff 0,#f2f2f2 100%);' onclick='addNewHotspot(2);'></span>   <span class='fa fa-file-photo-o fa-2x' style='cursor:pointer;width: 1em;height: 1em;text-align: center;border: 1px solid #ccc;padding: 0.25em;color: #333;background: -webkit-linear-gradient(top,#fff 0,#f2f2f2 100%);' title='Click to add graphic' onclick='addNewHotspot(3);'></span>   <!--span class='fa fa-link fa-2x' style='cursor:pointer;width: 1em;height: 1em;text-align: center;border: 1px solid #ccc;padding: 0.25em;color: #333;background: -webkit-linear-gradient(top,#fff 0,#f2f2f2 100%);' title='Click to add link' onclick='addNewHotspot(4);'></span>   <span class='fa fa-file-pdf-o fa-2x' style='cursor:pointer;width: 1em;height: 1em;text-align: center;border: 1px solid #ccc;padding: 0.25em;color: #333;background: -webkit-linear-gradient(top,#fff 0,#f2f2f2 100%);' title='Click to add link' onclick='addNewHotspot(5);'></span-->";
        }
        else if (thisObject.name.toLowerCase() === "mle") {
            H5P.jQuery(".content > .field.list").hide();
            H5P.jQuery(".workflowstep:first > .content > .field.text").show();
            
            headerBarDescHtml = "<div><span style='vertical-align:super;'>" + thisObject.steps[(stepNumber-1)].headerdesc + "   </span></div>";
        
            H5P.jQuery("#contentHeaderButtonBarDesc")[0].innerHTML = headerBarDescHtml;
        }
        
        H5P.jQuery('.workflowstep .content .field.list > .h5peditor-label').hide();
        H5P.jQuery('.workflowstep .content .field.library > .h5peditor-label').hide()
        if (thisObject.name.toLowerCase() === "menu") {goToHotspot(0);}
    }
    else if (stepNumber === 1) {
        if (thisObject.name.toLowerCase() === "interactivevideo") {
            H5P.jQuery(".workflowstep .field.group:first").show();
            H5P.jQuery(".workflowstep .field.group:first .title").click();
            H5P.jQuery(".workflowstep .field.group:first .title").hide();
            
            H5P.jQuery('.workflowstep .field.group:first .content:first').show();
            var videoContent = H5P.jQuery('.workflowstep .field.group:first .content:first')[0];
            if ((videoContent !== undefined) && (videoContent !== null)) {
                    for (var k = 0; k < videoContent.children.length; k++) {
                        if (k === 0) {
                            //left align
                            videoContent.children[k].style.float="left";
                            videoContent.children[k].style.width="45%";
                            videoContent.children[k].style.border="0px";
                        }
                        else if ((k === 1) || (k === 4)) {
                            //hide
                            videoContent.children[k].style.display="none";
                        }
                        else if (k === 2) {
                            videoContent.children[k].style.float="right";
                            videoContent.children[k].style.width="46%";
                            videoContent.children[k].style.border="0px";
                            videoContent.children[k].style.display="block";
                        }
                        else {
                            //right align
                            videoContent.children[k].style.float="right";
                            videoContent.children[k].style.width="45%";
                            videoContent.children[k].style.border="0px";
                            videoContent.children[k].style.display="none";
                            videoContent.children[k].style.padding="10px";
                        }
                    }
                }
            
            H5P.jQuery(".field.video .h5p-copyright-button").hide();
            H5P.jQuery(".field.video .h5peditor-label").hide();
            H5P.jQuery(".h5peditor-field-description").hide();
            H5P.jQuery('.workflowstep .field.group:first .content:first .content').show();
            H5P.jQuery(".field.interactiveVideo").hide();
        }
        else if (thisObject.name.toLowerCase() === "menu") {
            H5P.jQuery(".workflowstep .field.group").hide();
            H5P.jQuery(".sp-container").show();
            H5P.jQuery("#contentHeaderActionSubbar").hide();
            H5P.jQuery(".contentHeaderActionBar").hide();
        }
        else if (thisObject.name.toLowerCase() === "mle") {
            H5P.jQuery('.workflowstep:first > .content > .field.library > select').hide();
            var headerBarDescHtml = "";
            
            headerBarDescHtml = "<div><span style='vertical-align:super;'>" + thisObject.steps[(stepNumber-1)].headerdesc + "   </span></div>";
            H5P.jQuery("#contentHeaderButtonBarDesc")[0].innerHTML = headerBarDescHtml;
            
            H5P.jQuery("#contentHeaderActionBar")[0].innerHTML = "<span class='fa fa-file-photo-o fa-2x' style='cursor:pointer;width: 1em;height: 1em;text-align: center;border: 1px solid #ccc;padding: 0.25em;color: #333;background: -webkit-linear-gradient(top,#fff 0,#f2f2f2 100%);' title='Click to add graphic' onclick='addContent(3);'></span>   <span class='fa fa-film fa-2x' style='cursor:pointer;width: 1em;height: 1em;text-align: center;border: 1px solid #ccc;padding: 0.25em;color: #333;background: -webkit-linear-gradient(top,#fff 0,#f2f2f2 100%);' title='Click to add video' onclick='addContent(2);'></span>   <span class='fa fa-file-pdf-o fa-2x' style='cursor:pointer;width: 1em;height: 1em;text-align: center;border: 1px solid #ccc;padding: 0.25em;color: #333;background: -webkit-linear-gradient(top,#fff 0,#f2f2f2 100%);' title='Click to add PDF' onclick='addContent(5);'></span>   <span class='fa fa-link fa-2x' style='cursor:pointer;width: 1em;height: 1em;text-align: center;border: 1px solid #ccc;padding: 0.25em;color: #333;background: -webkit-linear-gradient(top,#fff 0,#f2f2f2 100%);' title='Click to add Url' onclick='addContent(4);'></span>";
            
            H5P.jQuery(".field.group:last").hide();
            H5P.jQuery("#contentHeaderActionSubbar").hide();
            H5P.jQuery(".contentHeaderActionBar").show();
            H5P.jQuery('.workflowstep .content .field.library > .h5peditor-label').hide();
            
            if ((H5P.jQuery('.workflowstep:first > .content > .field.library > select option:selected').length > 0) && ((H5P.jQuery('.workflowstep:first > .content > .field.library > select option:selected')[0].value.toLowerCase().indexOf("h5p.image") > -1) || (H5P.jQuery('.workflowstep:first > .content > .field.library > select option:selected')[0].value.toLowerCase().indexOf("h5p.video") > -1))) {
                for (var i = 0; i < H5P.jQuery('.workflowstep:first > .content > .field.library > .libwrap').children().length; i++) {
                    if (i > 0) {H5P.jQuery('.workflowstep:first > .content > .field.library > .libwrap').children()[i].style.display="none";}
                }
            }
        }
        
        //if (H5P.jQuery("#contentHeaderActionBar").length > 0) {H5P.jQuery("#contentHeaderActionBar")[0].innerHTML = "<span style='padding-right:20px;vertical-align:top;'>" + JSON.parse(localStorage.getItem("objectInfo")).steps[(stepNumber-1)].buttonlabel + "</span>";}
        if (H5P.jQuery("#contentHeaderButtonBarDesc").length > 0) {H5P.jQuery("#contentHeaderButtonBarDesc")[0].innerHTML = "<div>" + JSON.parse(localStorage.getItem("objectInfo")).steps[(stepNumber-1)].headerdesc + "</div>";}
    }
    
    H5P.jQuery(".h5peditor .libwrap").show();
    
    try {
        for (var i = 0; i < document.getElementsByClassName("workflowstep")[0].children[0].children.length; i++) {
            if ((stepNumber !== i) && (i !== 0)) {
                //Note i=0 represents the workflow header div.
                document.getElementsByClassName("workflowstep")[0].children[0].children[i].style.display="none";
            }
            else {
                document.getElementsByClassName("workflowstep")[0].children[0].children[i].style.display="block";
            }
        }
    }
    catch (ex) {}
    
    
    if (stepNumber === 0) {
        setTimeout(updateActionButtons,2000);
       // if (H5PEditor.contentId === undefined) {
            var thisObject = JSON.parse(localStorage.getItem("objectInfo"));
            if (thisObject.name.toLowerCase() === "interactivevideo") {
                H5P.jQuery(".workflowstep .field.group:first").show();
            }
            else if (thisObject.name.toLowerCase() === "menu") {
                //Require the user to start the workflow when creating new content
                H5P.jQuery(".workflowstep .field.group").hide();
                H5P.jQuery(".sp-container").hide();

                if (H5P.jQuery("#contentHeaderButtonBar")[0].innerHTML.indexOf("Select the background") === -1) {
                H5P.jQuery("#contentHeaderButtonBar")[0].innerHTML = "<p>Select the background button below to get started</p><br /><br />" + H5P.jQuery("#contentHeaderButtonBar")[0].innerHTML;  
                }
                H5P.jQuery("#contentHeaderActionBar").hide();
                H5P.jQuery("#contentHeaderButtonBarDesc").hide();
            }
            if (thisObject.name.toLowerCase() === "mle") {
                H5P.jQuery(".workflowstep .field.group:first").show();
            }
            
            setTimeout(goToStep,1000,1);
        //}
    }
}

/**
 * Create a worflow of fields.
 *
 * @param {mixed} parent
 * @param {object} field
 * @param {mixed} params
 * @param {function} setValue
 * @returns {ns.Workflow}
 */
ns.Workflow = function (parent, field, params, setValue) {
  // Support for events
  H5P.EventDispatcher.call(this);
  //debugger;

  if (field.label === undefined) {
    field.label = field.name;
  }
  else if (field.label === 0) {
    field.label = '';
  }

  this.parent = parent;
  this.passReadies = true;
  this.params = params;
  this.setValue = setValue;
  this.library = parent.library + '/' + field.name;

  if (field.deprecated !== undefined && field.deprecated) {
    this.field = H5P.cloneObject(field, true);
    var empties = 0;
    for (var i = 0; i < this.field.fields.length; i++) {
      var f = this.field.fields[i];
      if (params !== undefined && params[f.name] === '') {
        delete params[f.name];
      }
      if (params === undefined || params[f.name] === undefined) {
        f.widget = 'none';
        empties++;
      }
    }
    if (i === empties) {
      this.field.fields = [];
    }
  }
  else {
    this.field = field;
  }

  if (this.field.optional === true) {
    // If this field is optional, make sure child fields are aswell
    for (var j = 0; j < this.field.fields.length; j++) {
      this.field.fields[j].optional = true;
    }
  }
    
  H5P.jQuery('.common').hide();
};

ns.WorkflowGroup = function (parent, field, params, setValue) {
  // Support for events
  H5P.EventDispatcher.call(this);

  if (field.label === undefined) {
    field.label = field.name;
  }
  else if (field.label === 0) {
    field.label = '';
  }

  this.parent = parent;
  this.passReadies = true;
  this.params = params;
  this.setValue = setValue;
  this.library = parent.library + '/' + field.name;

  if (field.deprecated !== undefined && field.deprecated) {
    this.field = H5P.cloneObject(field, true);
    var empties = 0;
    for (var i = 0; i < this.field.fields.length; i++) {
      var f = this.field.fields[i];
      if (params !== undefined && params[f.name] === '') {
        delete params[f.name];
      }
      if (params === undefined || params[f.name] === undefined) {
        f.widget = 'none';
        empties++;
      }
    }
    if (i === empties) {
      this.field.fields = [];
    }
  }
  else {
    this.field = field;
  }

  if (this.field.optional === true) {
    // If this field is optional, make sure child fields are aswell
    for (var j = 0; j < this.field.fields.length; j++) {
      this.field.fields[j].optional = true;
    }
  }
  H5P.jQuery('.common').hide();
};

// Extends the event dispatcher
ns.Workflow.prototype = Object.create(H5P.EventDispatcher.prototype);
ns.Workflow.prototype.constructor = ns.Workflow;

/**
 * Append workflow to its wrapper.
 *
 * @param {jQuery} $wrapper
 * @returns {undefined}
 */
ns.Workflow.prototype.appendTo = function ($wrapper) {
  var that = this;
  //debugger;
    
  //JFM TO DO:  Grab the right title...
  //In workflows action buttons are part of the header area
  try {
    parent.document.getElementById("edit-submit").style.display="none";  
    parent.document.getElementById("edit-delete").style.display="none";
  }
  catch (ex) {}
  
  //

  if (this.field.steps.length === 0) {
    // No fields or all are deprecated
    this.setValue(this.field);
    return;
  }

  // Add fieldset wrapper for workflow
  this.$workflow = ns.$('<fieldset/>', {
    'class': 'field group workflowstep',
    appendTo: $wrapper
  });
  // Add content container
  var $content = ns.$('<div/>', {
    'class': 'content',
    appendTo: this.$workflow
  });
        
  if (((new Date() - new Date(JSON.parse(localStorage.getItem("objectInfoSetTime")))) / 1000) > 10) {
      localStorage.setItem("objectInfo",JSON.stringify(this.field));
      localStorage.setItem("objectInfoSetTime",JSON.stringify(new Date().toString()));
  }

  var headerHtml = "<div name='contentHeaderButtonBar' id='contentHeaderButtonBar'>";
  for (var i = 0; i < this.field.steps.length; i++) {
      headerHtml += "<button class='actionButtons' id='actionButtonStep" + (i+1) + "' type='button' onclick='goToStep(" + (i+1) + ");'>";
      headerHtml += this.field.steps[i].buttonlabel;
      headerHtml += "</button>  ";
  }
    
  headerHtml += "<button class='actionButtons' id='actionButtonSave' type='button' onclick='saveContent();'>Save</button>";
  headerHtml += "</div>";
  headerHtml += "<div name='contentHeaderButtonBarDesc' id='contentHeaderButtonBarDesc' class='contentHeaderButtonBarDesc'>" + this.field.steps[0].headerdesc + "</div>";
  headerHtml += "<div name='contentHeaderActionBar' id='contentHeaderActionBar' class='contentHeaderActionBar'>" + this.field.steps[0].buttonlabel + "</div>";  
headerHtml += "<div name='contentHeaderActionSubbar' id='contentHeaderActionSubbar' class='contentHeaderActionSubbar'></div>";  
  headerHtml += "<p><br /></p>";
  
  
  var headerElem = document.createElement("div");
  headerElem.innerHTML = headerHtml;
  $content.append(headerElem);

  if (this.field.steps.length === 1) {
    $content.addClass('h5peditor-single');
    this.children = [];
    var field = this.field.steps[0];
    var widget = field.widget === undefined ? field.type : field.widget;
    this.children[0] = new ns.widgets[widget](this, field, this.params, function (field, value) {
      that.setValue(that.field, value);
    });
    this.children[0].appendTo($content);
  }
  else {
    if (this.params === undefined) {
      this.params = {};
      this.setValue(this.field, this.params);
    }
    
    ns.processSemanticsChunk(this.field.steps, this.params, $content, this);
  }
    
  H5P.jQuery(".h5peditor .group > .content:first").show();
};

ns.WorkflowGroup.prototype.appendTo = function ($wrapper) {
  var that = this;
  //debugger;
    
  if (this.field.fields.length === 0) {
    // No fields or all are deprecated
    this.setValue(this.field);
    return;
  }
    //JFM>> Build the workflow here and handle any new workflow widget types

  // Add fieldset wrapper for workflow
  this.$workflowgroup = ns.$('<fieldset/>', {
    'class': 'field group',
    appendTo: $wrapper
  });
  // Add content container
  var $content = ns.$('<div/>', {
    'class': 'workflow-group-content',
    appendTo: this.$workflowgroup
  });

  if (this.field.fields.length === 1) {
    $content.addClass('h5peditor-single');
  }
  else {
    if (this.params === undefined) {
      this.params = {};
      this.setValue(this.field, this.params);
    }
      
    ns.processSemanticsChunk(this.field.fields, this.params, $content, this);
  }
};

/**
 * Find summary to display in group header.
 */
ns.Workflow.prototype.findSummary = function () {
  var that = this;
  var summary;
  for (var j = 0; j < this.children.length; j++) {
    var child = this.children[j];
    if (child.field === undefined) {
      continue;
    }
    var params = this.field.fields.length === 1 ? this.params : this.params[child.field.name];
    var widget = ns.getWidgetName(child.field);

    if (widget === 'text') {
      if (params !== undefined && params !== '') {
        summary = params.replace(/(<([^>]+)>)/ig, "");
      }

      child.$input.change(function () {
        var params = that.field.fields.length === 1 ? that.params : that.params[child.field.name];
        if (params !== undefined && params !== '') {
          that.setSummary(params.replace(/(<([^>]+)>)/ig, ""));
        }
      });
      break;
    }
    else if (widget === 'library') {
      if (params !== undefined) {
        summary = child.$select.children(':selected').text();
      }
      child.change(function (library) {
        that.setSummary(library.title);
      });
      break;
    }
  }
  this.setSummary(summary);
};

/**
 * Set the given group summary.
 *
 * @param {string} summary
 * @returns {undefined}
 */
ns.Workflow.prototype.setSummary = function (summary) {
  var summaryText;

  // Parse html
  var summaryTextNode = ns.$.parseHTML(summary);

  if (summaryTextNode !== null) {
    summaryText = summaryTextNode[0].nodeValue;
  }

  if (summaryText !== undefined) {
    summaryText = this.field.label + ': ' + (summaryText.length > 48 ? summaryText.substr(0, 45) + '...' : summaryText);
  }
  else {
    summaryText = this.field.label;
  }

  this.$workflow.children('.title').html(summaryText);
};

/**
 * Validate all children.
 */
ns.Workflow.prototype.validate = function () {
  var valid = true;

  if (this.children !== undefined) {
    for (var i = 0; i < this.children.length; i++) {
      if (this.children[i].validate() === false) {
        valid = false;
      }
    }
  }

  return valid;
};

ns.WorkflowGroup.prototype.validate = function () {
  var valid = true;

  if (this.children !== undefined) {
    for (var i = 0; i < this.children.length; i++) {
      if (this.children[i].validate() === false) {
        valid = false;
      }
    }
  }

  return valid;
};


/**
 * Allows ancestors and widgets to do stuff with our children.
 *
 * @public
 * @param {Function} task
 */
ns.Workflow.prototype.forEachChild = function (task) {
  for (var i = 0; i < this.children.length; i++) {
    task(this.children[i], i);
  }
};

ns.WorkflowGroup.prototype.forEachChild = function (task) {
  for (var i = 0; i < this.children.length; i++) {
    task(this.children[i], i);
  }
};

/**
 * Collect functions to execute once the tree is complete.
 *
 * @param {function} ready
 * @returns {undefined}
 */
ns.Workflow.prototype.ready = function (ready) {
  this.parent.ready(ready);
  goToStep(0);
};
ns.WorkflowGroup.prototype.ready = function (ready) {
  this.parent.ready(ready);
};

/**
 * Remove this item.
 */
ns.Workflow.prototype.remove = function () {
  if (this.$workflow !== undefined) {
    ns.removeChildren(this.children);
    this.$workflow.remove();
  }
};
ns.WorkflowGroup.prototype.remove = function () {
  if (this.$workflowgroup !== undefined) {
    ns.removeChildren(this.children);
    this.$workflowgroup.remove();
  }
};

// Tell the editor what widget we are.
ns.widgets.workflow = ns.Workflow;
ns.widgets.workflowgroup = ns.WorkflowGroup;
