'use strict'

let gCanvas;
let gCtx;
let gBigCanvas;
let gBigCtx;

function renderCanvas(canvas, ctx, isBig = false) {
    const imgId = getSelectedImageId();
    
    if (imgId !== 'blank') {
        const img = document.querySelector('img.big-img-' + imgId);

        if (isBig === false) {
            const size = getMaxSize(img);
        
            canvas.width = size.width;
            canvas.height = size.height;
        
        } else {
            canvas.width = img.width;
            canvas.height = img.height;
        }
        
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    
    } else {
    
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);    

    }

    const texts = getMemeTexts();
    
    if (texts.length > 0) {
        texts.forEach(function(text){
            doAddText(canvas,ctx,text.fontStyle, text.fontFillColor, text.fontStrokeColor, text.fontSize, text.fontFamily, text.horAlign, text.line, text.text)
        })
    }
}

function onDownload(elLink) {
    gBigCanvas = document.querySelector('.big-canvas');
    gBigCtx = gBigCanvas.getContext('2d');

    renderCanvas(gBigCanvas,gBigCtx,true);

    const data = gBigCanvas.toDataURL();
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
            renderCanvas(gCanvas,gCtx);
        }else return;
    }

    let currFontFillColor = getCurrPrefs('fontFillColor');
    let currFontStrokeColor = getCurrPrefs('fontStrokeColor');
    let currFontSize = (getCurrPrefs('fontSize'));
    let currFontFamily = getCurrPrefs('fontFamily');
    let currFontStyle = getCurrPrefs('fontStyle');
    let currHorAlign = getCurrPrefs('horizontalAlignment');

    doAddText(gCanvas,gCtx,currFontStyle, currFontFillColor, currFontStrokeColor, currFontSize, currFontFamily, currHorAlign, line, txt);
    updateMeme(currFontStyle, currFontFillColor, currFontStrokeColor, currFontSize, currFontFamily, currHorAlign, line, txt);
}

function doAddText(canvas,ctx,currFontStyle, currFontFillColor, currFontStrokeColor, currFontSize, currFontFamily, currHorAlign, line, txt) {
    let x = ((canvas.width/5)*currHorAlign);

    let y = (canvas.height/6)*line;

    ctx.fillStyle = currFontFillColor;
    ctx.strokeStyle = currFontStrokeColor;
    const str = (canvas.height/25*currFontSize) + 'px ' + currFontFamily;
    ctx.font = str;

    if (currFontStyle === 'filled') {
        ctx.fillText(txt, x, y);
        ctx.strokeText(txt, x, y);
    } else {
        ctx.strokeText(txt, x, y);
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

    renderCanvas(gCanvas,gCtx);
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
        renderCanvas(gCanvas,gCtx);
    }else return;
}

function getMaxSize(img) {
    let currWidth = 0;
    let currHeight = 0;
    let r = 0.1;
        
    while (currWidth < (window.innerWidth/1.5) && currHeight < (window.innerHeight/2) && currWidth < img.width && currHeight < img.height) {
        currWidth = img.width * r;
        currHeight = img.height * r;
        r = r + 0.1;
    }

    return {width: currWidth, height: currHeight};
}