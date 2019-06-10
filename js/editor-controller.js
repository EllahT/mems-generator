'use strict'

let gCanvas;
let gCtx;
let gBigCanvas;
let gBigCtx;
let gIsEditing = true;
let gImageFromUser;
let gDraggingLine;

function renderCanvas(canvas = gCanvas, ctx = gCtx, isBig= false) {   
    let img;
    const imgId = getSelectedImageId();

    if (imgId === 'blank') {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else {
        if (imgId === 'user-image') {

            img = gImageFromUser;
        } else {
            img = document.querySelector('img.big-img-' + imgId);
        }

        if (isBig === false) {
            const size = getMaxSize(img);
            canvas.width = size.width;
            canvas.height = size.height;
        } else {
                canvas.width = img.width;
                canvas.height = img.height;
            }
        
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);    
    }

    const texts = getMemeTexts();
    
    if (texts.length > 0) {
        texts.forEach(function(text){

            if (text.actualX && text.actualY) {
                doAddText(canvas,ctx,text.fontStyle, text.fontFillColor, text.fontStrokeColor, text.fontSize, text.fontFamily, text.actualX, text.actualY, text.text);
            } else {
                let x = ((canvas.width/5)*text.horAlign);
                let y = (canvas.height/6)*text.line;
                doAddText(canvas,ctx,text.fontStyle, text.fontFillColor, text.fontStrokeColor, text.fontSize, text.fontFamily, x, y, text.text);
            }

            
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

function onAddText(ev, el, txt) {
    
    const line = getCurrPrefs('line');
    const currFontFillColor = getCurrPrefs('fontFillColor');
    const currFontStrokeColor = getCurrPrefs('fontStrokeColor');
    const currFontSize = getCurrPrefs('fontSize');
    const currFontFamily = getCurrPrefs('fontFamily');
    const currFontStyle = getCurrPrefs('fontStyle');
    const currHorAlign = getCurrPrefs('horAlign');
    
    if (isThereLine(line) && gIsEditing === false) {
        if (confirm('you are trying to edit line number '+line+' to switch what\'s in it, click OK')) {
            deleteLine(line)
            renderCanvas();
        } else return;
    }

    gIsEditing = true;

    if (ev.key === 'Enter') {
        el.value = '';
        gIsEditing = false;
        onAddLine();
    }

    if (ev.key === 'Backspace') {
        renderCanvas();
        updateTextObj(currFontStyle, currFontFillColor, currFontStrokeColor, currFontSize, currFontFamily, currHorAlign, line, txt);
    }

    updateTextObj(currFontStyle, currFontFillColor, currFontStrokeColor, currFontSize, currFontFamily, currHorAlign, line, txt);
    renderCanvas();
}

function doAddText(canvas,ctx,currFontStyle, currFontFillColor, currFontStrokeColor, currFontSize, currFontFamily, x, y, txt) {

    ctx.fillStyle = currFontFillColor;
    ctx.strokeStyle = currFontStrokeColor;
    ctx.font = (canvas.height/25*currFontSize) + 'px ' + currFontFamily;

    if (currFontStyle === 'filled') {
        ctx.fillText(txt, x, y);
        ctx.strokeText(txt, x, y);
    } else {
        ctx.strokeText(txt, x, y);
    }
}

function onChangePrefs(ev, prefType, val) {
    if (ev !== false) ev.preventDefault();
    const elPicked = document.querySelector('.picked.'+prefType);
    elPicked.innerText = val;
    
    updatePrefs(prefType, val);
    updateControlBox(prefType,val);
    renderCanvas();
}

function onChangeVerticalAlignment(ev, direction) {
    ev.preventDefault();

    changeVerticalAlignment(direction);
    const val = getCurrPrefs('line');
    const elPicked = document.querySelector('.curr-line');
    elPicked.innerText = val;

    renderCanvas();
}

function updateControlBox(prefType,val) {
    if (prefType === 'fontStyle' || prefType === 'fontFamily' || prefType === 'horAlign') {
        const elItems = document.querySelectorAll('.'+prefType+'-item');        
        
        elItems.forEach (function (item){
            item.classList = prefType+'-item';
            if (prefType === 'horAlign') {
                if (+item.dataset.value === val) {
                    item.classList.add('input-picked');
                }
            } else {
                if (item.dataset.value === val) {
                    item.classList.add('input-picked');
                }
            }
            
        })
    } else { 
        const elInput = document.querySelector('.'+prefType+'-input');
        elInput.value = val;
    }
}

function onEditLine() {
    const lineStr = prompt('which line do you want to edit? (1-5)');
    const line = parseInt(lineStr);
    doEditLine(line);
}

function doEditLine(line) {
    gIsEditing = true;
    
    const lineText = getTextByLine(line);
    const elInput = document.querySelector('.text-input');
    elInput.value = lineText;

    updateAllPrefs(getTextObjByLine(line));
    updateCurrLine(line);
    updateCurrLineSpanAndFocus(line);
}

function updateCurrLineSpanAndFocus(newLine) {
    const elCurrLine = document.querySelector('.curr-line');
    elCurrLine.innerText = (newLine === 1)? 'the first line' : (newLine === 5)? 'the last line' : 'line number ' +newLine;

    document.querySelector('.text-input').focus();
}

function onAddLine() {
    const currLines = getCurrLinesCount();
    const currLine = getCurrPrefs('line');
    
    let newLine; 

    if (currLines <= 1) {
        newLine = 5;
    } else {
        newLine = (currLine === 5)? 2 : currLine+1;
    }

    updateCurrLine(newLine);
    updateCurrLineSpanAndFocus(newLine);
    document.querySelector('.text-input').value = '';
}

function onDeleteLine() {
    const line = getCurrLine();
    if (confirm('you are trying to delete line number '+line+' are you sure?')) {
        deleteLine(line)
        renderCanvas();
    } else return;
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

function updateAllPrefs(currText) {
    onChangePrefs(false,'fontStyle',currText.fontStyle);
    onChangePrefs(false,'fontFillColor',currText.fontFillColor);
    onChangePrefs(false,'fontStrokeColor',currText.fontStrokeColor);
    onChangePrefs(false,'fontFamily',currText.fontFamily);
    onChangePrefs(false,'fontSize',currText.fontSize);
    onChangePrefs(false,'horAlign',currText.horAlign);
}

function onFileInputChange(ev) {
    handleImageFromInput(ev, selectImageFromUser)
}

function handleImageFromInput(ev, onImageReady) {
    document.querySelector('.share-container').innerHTML = ''
    let reader = new FileReader();

    reader.onload = function (event) {
        let img = new Image();
        img.onload = onImageReady.bind(null, img)
        img.src = event.target.result;
    }

    reader.readAsDataURL(ev.target.files[0]);
}

function selectImageFromUser(img) {
    updatePickedImage('user-image');
    gImageFromUser = img;
    scrollToSec(false, 'editor');   
    renderCanvas();
}

function checkLine(y) {    
    const ratio = gCanvas.height/6;
    
    let line = -1;
    
    for (let i = 1; i < 6; i++) {
        if (y > ratio*(i-1) && y < ratio*i) {
            line = i;
            break;
        }
    }

    return line;
}

function onEditByClick(ev) {
    if (gDraggingLine) return;
    
    const {offsetY} = ev;
    const line = checkLine(offsetY);
    doEditLine(line);
}

function onStartDraging(ev) {
    if (gDraggingLine) return;
    const {offsetY} = ev;
    const line = checkLine(offsetY);
    updateCurrLine(line);
    gDraggingLine = line;
}

function onDragging(ev) {
    if (!gDraggingLine) return;
    const {offsetX, offsetY} = ev;
    updatePrefs('actualX',offsetX);
    updatePrefs('actualY',offsetY);
    renderCanvas();
}

function onStopDraging() {
    
    gDraggingLine = null;
}

