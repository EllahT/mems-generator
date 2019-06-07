'use strict'

let gPrefs;

let gMeme;

function initMeme() {
    gMeme = {
        selectedImgId: gImgs[0].id,
        txts: []
    }
    gPrefs = {
        fontStyle: 'filled',
        fontFillColor: 'white',
        fontStrokeColor: 'black',
        fontFamily: 'impact',
        fontSize: '50',
        horizontalAlignment: 1,
        verticalAlignment: 2
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

function updateMeme(currFontStyle,currFontFillColor,currFontStrokeColor,currFontSize,currFontFamily,x,y,txt,line) {   
    const newText = {
        fontStyle: currFontStyle,
        fontFillColor: currFontFillColor,
        fontStrokeColor: currFontStrokeColor,
        fontFamily: currFontFamily,
        fontSize: currFontSize,
        x: x,
        y: y,
        text: txt,
        line: line
    }
    
    gMeme.txts.push(newText);
}

function getCurrLines() {
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
// 6. First two lines shall be at the TOP and BOTTOM of canvas, further lines at the center
// 7. Line dragging is not a must and shall be implemented only in case you implemented all above functions first


// 1. Allow using an image from your computer
// 2. Share on Facebook (use the sample code provided)
// 3. Website theme: celeb-meme, politic-meme, ani-meme, kid-meme, mondealmeme
// 4. Add props (sunglasses, hats, etc)
// 5. Option to drag and drop captions & props (also on mobile)
// 6. Use the new Web Share API to share your meme
// 7. i18n for Hebrew 


//mobile: download a bigger pic