'use strict'

let gFilter = 'all';

let gKeywords = {};

let gImgs;

let gPrefs = {
    fontStyle: 'filled',
    fontFillColor: 'white',
    fontStrokeColor: 'black',
    fontFamily: 'impact',
    fontSize: '30px',
    horizontalAlignment: 'left',
    verticalAlignment: (window.innerHeight /3),
    currLine: 1
}

let gMeme = {
    selectedImgId: null,
    txts: []
}

function createImages() {
    const images = [
        createImage('Sounds of Music',1,['happy','free','fun','hils']),
        createImage('Trump',2,['politics','trump','man','america','big guy','finger']),
        createImage('Cute Dogs',3,['cute','peaceful','friendship','couples','night','good','dog','dogs','kisses','puppy']),
        createImage('Dog and Baby',4,['cute','peaceful','friendship','bed','night','good','dog','baby','sleeping']),
        createImage('Success Boy',5,['cute','funny','yay','baby','success','good','boy']),
        createImage('Cat',6,['cute','bed','sleeping','cat','peaceful']),
        createImage('Dancing Kids',7,['happy','dance','africa','celebration','boys','kids','boy','kid','together']),
        createImage('Willy Wonka',8,['interesting','fascinated','man','hat','purple']),
        createImage('Laughing Kid',9,['cute', 'kid', 'evil', 'plan', 'plotting','boy']),
        createImage('Trump',10,['politics','trump','man','america','big guy','finger']),
        createImage('History Channel Guy',11,['ploting','conspiracy','aliens','big hair','history']),
    ]
    
    gImgs = images;
}

function createImage(name,fileName,keywords) {
    const img = {
        id: makeId(),
        name: name,
        url: 'img/meme-imgs/'+fileName+'.jpg',
        keywords: keywords,
    }

    return img;
}

function initMeme() {
    gMeme.selectedImgId = gImgs[0].id;
    gPrefs = {
        fontStyle: 'filled',
        fontFillColor: 'white',
        fontStrokeColor: 'black',
        fontFamily: 'impact',
        fontSize: '30px',
        horizontalAlignment: 'left',
        verticalAlignment: 50,
        currLine: 1
    }
}

function getKeywords() {
    let keywordsMapByCount = gImgs.reduce(function(acc,img) {
        img.keywords.reduce(function(subAcc,keyword) {
            (subAcc[keyword])? subAcc[keyword]++ : subAcc[keyword] = 1;
            return subAcc;
        },acc);
    return acc;
    },{})

    gKeywords = keywordsMapByCount;
    return gKeywords;
}

function getImages() {
    if (gFilter === 'all') {
        return gImgs;
    } else {
        let filteredImages = gImgs.filter (function(image) {
            let match = image.keywords.find(function(keyword) {
                return (keyword === gFilter);
            })
            return (match);
            
        })
        return (filteredImages.length === 0)? gImgs : filteredImages;
    }
}

function updateFilter(keyword) {
    gFilter = keyword;
}

function getImageKeywords(image) {
    return image.keywords;
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