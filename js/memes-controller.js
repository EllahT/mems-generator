'use strict'

let gCanvas;
let gCtx;

function init() {
    gCanvas = document.querySelector('.meme');
    gCtx = gCanvas.getContext('2d');

    gCanvas.width = window.innerWidth/2;
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
    
    let strHtmls = images.map(function(image){
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
    
    let strHtmls = keywords.map(function(keyword){
        
        return `<button class="keyword" onclick="onKeywordClick(event,'${keyword}')">${keyword}</button>`
    })
    
    return strHtmls.join('');
}

function onshowkeywords(ev,imageId) {
    ev.stopPropagation();
    const elKeywordsContainer = document.querySelector('div.keywords-'+imageId); 

    elKeywordsContainer.classList.toggle('hide');
    
    const elBtn = document.querySelector('button.keywords-'+imageId);
    
    elBtn.innerText = (elBtn.innerText === 'Show Keywords')? 'Hide Keywords' : 'Show Keywords';
}

function onKeywordClick(ev,keyword) {
    ev.stopPropagation();
    filterBy(keyword);
}

function onImageClicked(imgId){
    updatePickedImage(imgId);
    renderCanvas();
    onToggleGallery();
}

function renderCanvas() {
    const imgId = getSelectedImageId();
    const imgClass= 'img.img-'+imgId;
    const img = document.querySelector(imgClass);
    
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
}

function filterBy(keyword) {
    updateFilter(keyword);
    renderGallery();
}

function onDownload(elLink) {
    const data = gCanvas.toDataURL();
    elLink.href = data;
    
    elLink.download = 'myFunnyMeme.jpg';
}

function onClear() {
    gCtx.fillStyle = 'white';
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

    let strHtmls = keywordsArr.map(function(keyword){

        return `<button class="filter-item" style="font-size:${keyword[1]*1}rem" onclick="onKeywordClick(event,'${keyword[0]}')">${keyword[0]}</button>`
    })
    
    elList.innerHTML = strHtmls.join('');
}

function renderListFilter() {
    const keywordsObj = getKeywords();
    const elList = document.querySelector('.list-filter #keywords');
    
    const keywordsArr = Object.keys(keywordsObj);

    let strHtmls = keywordsArr.map(function(keyword){
        
        return `<option value="${keyword}"></option>`
    })
    
    elList.innerHTML = strHtmls.join('');
}
// function drawText(txt,x,y) {
    //     ctx.fillStyle = 'white'
    //     ctx.strokeStyle = 'green'
    //     ctx.font = "17px Arial";
    //     // ctx.fillText(txt, x, y);
    //     ctx.strokeText(txt, x, y);
    // }