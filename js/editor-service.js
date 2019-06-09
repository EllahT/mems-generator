'use strict'

let gPrefs;

let gMeme;

function initMeme() {
    gMeme = {
        selectedImgId: 'blank',
        txts: []
    }
    gPrefs = {
        fontStyle: 'filled',
        fontFillColor: 'white',
        fontStrokeColor: 'black',
        fontFamily: 'impact',
        fontSize: '3',
        horizontalAlignment: 1,
        line: 1
    }
}

function updatePickedImage(imgId) {
    gMeme.selectedImgId = imgId;
}

function getSelectedImageId() {
    return gMeme.selectedImgId;
}

function getCurrPrefs(prefType = 'all') {
    return (prefType === 'all')? gPrefs : gPrefs[prefType];
}

function updatePrefs(prefType, val) {
    gPrefs[prefType] = val;
}

function updateText(currFontStyle,currFontFillColor,currFontStrokeColor,currFontSize,currFontFamily,currHorAlign,line,txt) {   
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
    
    gMeme.txts.push(newText);
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
}

function updateCurrLine(line) {
    gPrefs.line = line;
}

function getCurrLine() {
    return gPrefs.line;
}

function updateAllPrefs(line) {
    const lineIdx = findIdxbyLine(line);
    const currText = gMeme.txts[lineIdx];

    onChangePrefs(false,'fontStyle',currText.fontStyle);
    onChangePrefs(false,'fontFillColor',currText.fontFillColor);
    onChangePrefs(false,'fontStrokeColor',currText.fontStrokeColor);
    onChangePrefs(false,'fontFamily',currText.fontFamily);
    onChangePrefs(false,'fontSize',currText.fontSize);
    onChangePrefs(false,'horAlign',currText.horAlign);
}

function getTextByLine(line) {
    const lineIdx = findIdxbyLine(line);

    return gMeme.txts[lineIdx].text;
}

// TODO: fixe edit line
// TODO: Line dragging

//BONUSE:
// 1. Allow using an image from your computer
// 2. Share on Facebook (use the sample code provided)
// 3. Website theme: celeb-meme, politic-meme, ani-meme, kid-meme, mondealmeme
// 4. Add props (sunglasses, hats, etc)
// 5. Option to drag and drop captions & props (also on mobile)
// 6. Use the new Web Share API to share your meme
// 7. i18n for Hebrew 


