'use strict'

let gCanvas;
let gCtx;

function renderCanvas() {
    const imgId = getSelectedImageId();
    
    const imgClass = 'img.img-' + imgId;
    const img = document.querySelector(imgClass);

    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);

    const texts = getMemeTexts();
    
    if (texts.length > 0) {
        texts.forEach(function(text){
            doAddText(text.fontStyle, text.fontFillColor, text.fontStrokeColor, text.fontSize, text.fontFamily, text.x, text.y, text.text)
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

function onAddText(line, el, txt) {
    el.value = '';

    if (isThereLine(line)) {
        if (confirm('there is a line a that spot, do you want to switch them?')) {
            onDeleteLine(line)
        }else return;
    }

    let currFontFillColor = getCurrPrefs('fontFillColor');
    let currFontStrokeColor = getCurrPrefs('fontStrokeColor');
    let currFontSize = getCurrPrefs('fontSize');
    let currFontFamily = getCurrPrefs('fontFamily');
    let currFontStyle = getCurrPrefs('fontStyle');
    let currHorAlign = getCurrPrefs('horizontalAlignment');
    
    let x = ((gCanvas.width/6)*currHorAlign);

    let y = (gCanvas.height/10)*line;

    doAddText(currFontStyle, currFontFillColor, currFontStrokeColor, currFontSize, currFontFamily, x, y, txt);
    updateMeme(currFontStyle, currFontFillColor, currFontStrokeColor, currFontSize, currFontFamily, x, y, txt, line);
}

function doAddText(currFontStyle, currFontFillColor, currFontStrokeColor, currFontSize, currFontFamily, x, y, txt) {
    
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
}

function onChangePrefs(ev, prefType, val) {
    if (prefType === 'fontFamily') {
        ev.preventDefault();
        onChangeDropDownDisplay();
    }

    updatePrefs(prefType, val);
}

function onChangeVerticalAlignment(direction) {
    console.log('entered change ver align', direction);

}

function onAddLine() {
    let currLines = getCurrLines();

    if (currLines < 2) {
        onRemoveClassToEl('last-line','hide');

    } else {
        doAddLine();
    }
}

function doAddLine() {
    const currLines = getCurrLines();
    const elContainer = document.querySelector('.text-lines');
}

function onDeleteLine(line) {
    deleteLine(line);
    renderCanvas();
}