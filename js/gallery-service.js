'use strict'

let gFilter = 'all';

let gKeywords = {};

let gImgs;

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
