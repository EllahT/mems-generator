'use strict'

let gCanvas;
let gCtx;

function init() {
    gCanvas = document.querySelector('.meme');
    gCtx = gCanvas.getContext('2d');

    gCanvas.width = window.innerWidth / 2;
    gCanvas.height = 300;

    createImages();
    initMeme();
    renderFilter();
    renderGallery();
    renderCanvas();
}

function renderGallery() {
    let images = getImages();

    const elContainer = document.querySelector('.gallery-images-container');

    let strHtmls = images.map(function (image) {
        let imageKeywordsHtmls = getImageKeywordsHtml(image);

        return `<div class="image-container container-img-${image.id}" onclick="onImageClicked('${image.id}')">
        <h2 class="image-name">${image.name}</h2>
        <img class="img-${image.id}" src="${image.url}">
        <div class="image-keywords">
        <div class="keywords-${image.id} hide">${imageKeywordsHtmls}</div>    
        <button class="btn keywords-${image.id}" onclick="onshowkeywords(event,'${image.id}')">Show Keywords</button>
        </div>
        </div>`
    })

    elContainer.innerHTML = strHtmls.join('');;
}

function getImageKeywordsHtml(image) {
    let keywords = getImageKeywords(image);

    let strHtmls = keywords.map(function (keyword) {

        return `<button class="keyword" onclick="onKeywordClick(event,'${keyword}')">${keyword}</button>`
    })

    return strHtmls.join('');
}

function onshowkeywords(ev, imageId) {
    ev.stopPropagation();
    const elKeywordsContainer = document.querySelector('div.keywords-' + imageId);

    elKeywordsContainer.classList.toggle('hide');

    const elBtn = document.querySelector('button.keywords-' + imageId);

    elBtn.innerText = (elBtn.innerText === 'Show Keywords') ? 'Hide Keywords' : 'Show Keywords';
}

function onKeywordClick(ev, keyword) {
    ev.stopPropagation();
    filterBy(keyword);
}

function onImageClicked(imgId) {
    updatePickedImage(imgId);
    renderCanvas();
    let elEditor = document.querySelector('.editor');
    elEditor.scrollIntoView({ alignToTop: true, behavior: "smooth" });
}

function renderCanvas() {
    const imgId = getSelectedImageId();
    const imgClass = 'img.img-' + imgId;
    const img = document.querySelector(imgClass);

    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);

    const texts = getMemeTexts();
    if (texts.length > 0) {
        texts.forEach(onAddText)
    }
}

function filterBy(keyword) {
    updateFilter(keyword);
    renderGallery();
    let elGallery = document.querySelector('.gallery-images-container');
    elGallery.scrollIntoView({ alignToTop: true, behavior: "smooth" });
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

function onToggleGallery() {
    const elGallery = document.querySelector('.gallery');
    elGallery.classList.toggle('hide');
}

function renderFilter() {
    renderListFilter();
    renderBlockFilter();
}

function renderBlockFilter() {
    const keywordsObj = getKeywords();
    const elList = document.querySelector('.block-filter .tags-container');

    const keywordsArr = Object.entries(keywordsObj);

    let strHtmls = keywordsArr.map(function (keyword) {

        return `<button class="filter-item" style="font-size:${keyword[1] * 1}rem" onclick="onKeywordClick(event,'${keyword[0]}')">${keyword[0]}</button>`
    })

    elList.innerHTML = strHtmls.join('');
}

function renderListFilter() {
    const keywordsObj = getKeywords();
    const elList = document.querySelector('.list-filter #keywords');

    const keywordsArr = Object.keys(keywordsObj);

    let strHtmls = keywordsArr.map(function (keyword) {

        return `<option value="${keyword}"></option>`
    })

    elList.innerHTML = strHtmls.join('');
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
    gCtx.font = currFontSize + ' ' + currFontFamily;

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
        changeDropDownDisplay();
    }

    updatePrefs(prefType, val);
}

function onChangeVerticalAlignment(direction) {
    console.log('entered change ver align', direction);

}

function onDeleteLine() {
    console.log('entered delete line', currLine);
}

function changeDropDownDisplay() {
    let elDropDown = document.querySelector('#fonts > div');
    elDropDown.classList.toggle('hide');
}