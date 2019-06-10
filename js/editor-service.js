'use strict'
const prefsKey = 'userMemePrefs';

let gPrefs;

let gMeme;

function initMeme() {
    gMeme = {
        selectedImgId: 'blank',
        txts: []
    }
    
    let prefs = loadFromStorage(prefsKey);

    if (!prefs) {
        gPrefs = {
            fontStyle: 'filled',
            fontFillColor: '#ffffff',
            fontStrokeColor: '#000000',
            fontFamily: 'Impact',
            fontSize: '3',
            horAlign: 1,
        }
    } else gPrefs = prefs;

    gPrefs.line = 1;
}

function getSelectedImageId() {
    return gMeme.selectedImgId;
}

function updatePickedImage(imgId) {
    gMeme.selectedImgId = imgId;
}

function getCurrPrefs(prefType = 'all') {
    return (prefType === 'all')? gPrefs : gPrefs[prefType];
}

function updatePrefs(prefType, val) {
    gPrefs[prefType] = val;
    
    const currText = getTextObjByLine(getCurrLine());

    if (currText) {
        currText[prefType] = val;
    }

    savePrefs();
}

function updateTextObj(currFontStyle,currFontFillColor,currFontStrokeColor,currFontSize,currFontFamily,currHorAlign,line,txt) {   
    const newText = {
        fontStyle: currFontStyle,
        fontFillColor: currFontFillColor,
        fontStrokeColor: currFontStrokeColor,
        fontFamily: currFontFamily,
        fontSize: currFontSize,
        horAlign: currHorAlign,
        line: line,
        text: txt,
    }
    
    const lineIdx = findIdxbyLine(line);

    (lineIdx === -1)? gMeme.txts.push(newText) : gMeme.txts[lineIdx] = newText;
}

function getCurrLinesCount() {
    return gMeme.txts.length;
}

function getMemeTexts() {
    return gMeme.txts;
}

function deleteLine(line) {
    const lineIdx = findIdxbyLine(line);
    gMeme.txts.splice(lineIdx,1);    
}

function isThereLine(line) {
    const lineIdx = findIdxbyLine(line);
    return (lineIdx !== -1);
}

function findIdxbyLine(line) {
    return gMeme.txts.findIndex(function(text) {
        return text.line === line;
    })
}

function changeVerticalAlignment(direction) {
    const line = getCurrPrefs('line');
    const lineIdx = findIdxbyLine(line);
    
    let newLine = (direction === '+')? line+1 : line-1;

    if (newLine < 1 || newLine > 5) {
        alert('can\'t move out of the canvas');
        return;
    }

    if (gMeme.txts[lineIdx]) {
        gMeme.txts[lineIdx].line = newLine;
    }
    
    gPrefs.line = newLine;
    savePrefs();
}

function updateCurrLine(line) {
    gPrefs.line = line;
}

function getCurrLine() {
    return gPrefs.line;
}

function getTextByLine(line) {
    const lineIdx = findIdxbyLine(line);

    return gMeme.txts[lineIdx].text;
}

function getTextObjByLine(line) {
    const lineIdx = findIdxbyLine(line);

    return gMeme.txts[lineIdx];
}

function savePrefs() {
    saveToStorage(prefsKey, gPrefs);
}

// TODO: Line dragging

//BONUSE:
// 1. Allow using an image from your computer
// 2. Share on Facebook (use the sample code provided)
// 3. Website theme: celeb-meme, politic-meme, ani-meme, kid-meme, mondealmeme
// 4. Add props (sunglasses, hats, etc)
// 5. Option to drag and drop captions & props (also on mobile)
// 6. Use the new Web Share API to share your meme
// 7. i18n for Hebrew 