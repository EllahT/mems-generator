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
            doAddText(text[fontStyle], text[fontFillColor], text[fontStrokeColor], text[fontSize], text[fontFamily], text[x], text[y], text[text])
        })
    }
}

function onDownload(elLink) {
    const data = gCanvas.toDataURL();
    elLink.href = data;

    elLink.download = 'myFunnyMeme.jpg';
}

function onClear() {
    gCtx.fillStyle = 'lightgreen';
    gCtx.fillRect(0, 0, gCanvas.width, gCanvas.height);
}

function onAddText(el, txt) {
    el.value = '';

    let currFontFillColor = getCurrPrefs('fontFillColor');
    let currFontStrokeColor = getCurrPrefs('fontStrokeColor');
    let currFontSize = getCurrPrefs('fontSize');
    let currFontFamily = getCurrPrefs('fontFamily');
    let currFontStyle = getCurrPrefs('fontStyle');
    let currHorAlign = getCurrPrefs('horizontalAlignment');
    let x;

    switch (currHorAlign) {
        case 'right':
            x = gCanvas.width - (50 + (txt.length) * 13);
            break;

        case 'left':
            x = 50;
            break;

        case 'center':
            x = gCanvas.width / 2;
            break;
    }

    let y = getCurrPrefs('verticalAlignment');

    doAddText(currFontStyle, currFontFillColor, currFontStrokeColor, currFontSize, currFontFamily, x, y, txt);
    updateMeme(currFontStyle, currFontFillColor, currFontStrokeColor, currFontSize, currFontFamily, x, y, txt);
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

function onDeleteLine() {
    console.log('entered delete line', currLine);
}

// function onChangeDropDownDisplay() {
//     let elDropDown = document.querySelector('#fonts > div');
//     elDropDown.classList.toggle('hide');
// }