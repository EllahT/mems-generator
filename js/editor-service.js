'use strict'

let gPrefs = {
    fontStyle: 'filled',
    fontFillColor: 'white',
    fontStrokeColor: 'black',
    fontFamily: 'impact',
    fontSize: '50',
    horizontalAlignment: 'left',
    verticalAlignment: (window.innerHeight /3),
    currLine: 1
}

let gMeme = {
    selectedImgId: null,
    txts: []
}

function initMeme() {
    gMeme.selectedImgId = gImgs[0].id;
    gPrefs = {
        fontStyle: 'filled',
        fontFillColor: 'white',
        fontStrokeColor: 'black',
        fontFamily: 'impact',
        fontSize: '50',
        horizontalAlignment: 'left',
        verticalAlignment: 50,
        currLine: 1
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

function updateMeme(currFontStyle,currFontFillColor,currFontStrokeColor,currFontSize,currFontFamily,x,y,txt) {   
    const newText = {
        fontStyle: currFontStyle,
        fontFillColor: currFontFillColor,
        fontStrokeColor: currFontStrokeColor,
        fontFamily: currFontFamily,
        fontSize: currFontSize,
        x: x,
        y: y,
        text: txt
    }
    
    gMeme.txts.push(newText);

}

function getMemeTexts() {
    return gMeme.txts;
}
// control box
// Optional set of controls: font family, font color, font size, L-R alignment, UpDown alignment arrows, delete line.
// 4. “Add-Line” Button.
// 5. “Download” Button/Link of the created Meme image
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