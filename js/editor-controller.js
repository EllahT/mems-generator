'use strict'

let gCanvas;
let gCtx;

function renderCanvas() {
    const imgId = getSelectedImageId();
    
    if (imgId !== 'blank') {
        const imgClass = 'img.img-' + imgId;
        const img = document.querySelector(imgClass);

        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
    
    } else {
    
        gCtx.fillStyle = 'white';
        gCtx.fillRect(0, 0, gCanvas.width, gCanvas.height);    

    }

    const texts = getMemeTexts();
    
    if (texts.length > 0) {
        texts.forEach(function(text){
            doAddText(text.fontStyle, text.fontFillColor, text.fontStrokeColor, text.fontSize, text.fontFamily, text.horAlign, text.line, text.text)
        })
    }
}

function onDownload(elLink) {
    const data = gCanvas.toDataURL();
    elLink.href = data;

    elLink.download = 'myFunnyMeme.jpg';
}

function onClear() {
    gCtx.fillStyle = 'white';
    gCtx.fillRect(0, 0, gCanvas.width, gCanvas.height);
    initMeme();
}

function onAddText(el, txt) {
    el.value = '';

    const line = getCurrPrefs('line');
    
    if (isThereLine(line)) {
        if (confirm('you are trying to edit line number '+line+' to switch what\'s in it, click OK')) {
            deleteLine(line)
            renderCanvas();
        }else return;
    }

    let currFontFillColor = getCurrPrefs('fontFillColor');
    let currFontStrokeColor = getCurrPrefs('fontStrokeColor');
    let currFontSize = (gCanvas.height/25*getCurrPrefs('fontSize'));
    let currFontFamily = getCurrPrefs('fontFamily');
    let currFontStyle = getCurrPrefs('fontStyle');
    let currHorAlign = getCurrPrefs('horizontalAlignment');

    doAddText(currFontStyle, currFontFillColor, currFontStrokeColor, currFontSize, currFontFamily, currHorAlign, line, txt);
    updateMeme(currFontStyle, currFontFillColor, currFontStrokeColor, currFontSize, currFontFamily, currHorAlign, line, txt);
}

function doAddText(currFontStyle, currFontFillColor, currFontStrokeColor, currFontSize, currFontFamily, currHorAlign, line, txt) {
    let x = ((gCanvas.width/5)*currHorAlign);

    let y = (gCanvas.height/6)*line;

    gCtx.fillStyle = currFontFillColor;
    gCtx.strokeStyle = currFontStrokeColor;
    const str = currFontSize + 'px ' + currFontFamily;
    gCtx.font = str;

    if (currFontStyle === 'filled') {
        gCtx.fillText(txt, x, y);
        gCtx.strokeText(txt, x, y);
    } else {
        gCtx.strokeText(txt, x, y);
    }

    scrollToSec(false,'meme');
}

function onChangePrefs(ev, prefType, val) {
    if (ev !== false) ev.preventDefault();
    const elPicked = document.querySelector('.'+prefType);
    elPicked.innerText = val;
    
    updatePrefs(prefType, val);
}

function onChangeVerticalAlignment(ev, direction) {
    ev.preventDefault();

    changeVerticalAlignment(direction);
    const val = getCurrPrefs('line');
    const elPicked = document.querySelector('.line');
    elPicked.innerText = val;

    renderCanvas();
}

function onEditLine() {
    const line = prompt('which line do you want to edit? (1-5)');
    
    if (findIdxbyLine(+line) === -1) {
        alert('there is nothing there!');
        return;
    }
    const lineText = getTextByLine(line);
    const elInput = document.querySelector('.text-input');
    elInput.value = lineText;

    updateAllPrefs(line);
    updateCurrLine(line);
    updateCurrLineSnapAndFocus(line);
}

function updateCurrLineSnapAndFocus(newLine) {
    const elCurrLine = document.querySelector('.curr-line');
    elCurrLine.innerText = newLine;

    document.querySelector(".text-input").focus();
}

function onAddLine() {
    const currLines = getCurrLinesCount();
    const currLine = getCurrPrefs('line');
    
    let newLine; 

    if (currLines <= 1) {
        newLine = 5;
    } else {
        (currLine === 5)? newLine = 2 : newLine = currLine+1;
    }

    updateCurrLine(newLine);
    updateCurrLineSnapAndFocus(newLine);
}

function doAddLine() {
    const currLines = getCurrLinesCount();
    
}

function onDeleteLine() {
    const line = getCurrLine();
    if (confirm('you are trying to delete line number '+line+' are you sure?')) {
        deleteLine(line)
        renderCanvas();
    }else return;
}