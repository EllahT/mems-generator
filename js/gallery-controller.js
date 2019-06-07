'use strict'

function renderGallery() {
    let images = getImages();

    const elContainer = document.querySelector('.gallery-images-container');

    let strHtmls = images.map(function (image) {
        let imageKeywordsHtmls = getImageKeywordsHtml(image);

        return `<div class="image-card img-${image.id}">
            <h2 class="image-name">${image.name}</h2>
            <div class="image-container" onclick="onImageClicked('${image.id}')">
                <img class="img-${image.id}" src="${image.url}">
                <div class="image-screen"><h4>Pick this image as your meme background</h4></div>
            </div>
        
            <div class="image-keywords">
                <button class="btn keywords-${image.id}" onclick="onshowkeywords(event,'${image.id}')"><img src="img/icons/show-more.png" alt="show/hide keywords"></button>
                <div class="keywords-${image.id} hide">${imageKeywordsHtmls}</div>    
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
}

function onKeywordClick(ev, keyword) {
    ev.stopPropagation();
    filterBy(keyword);
}

function onImageClicked(imgId) {
    updatePickedImage(imgId);
    renderCanvas();
    let elEditor = document.querySelector('.editor');
    elEditor.scrollIntoView({ alignToTop: true, behavior: "smooth", block: "center" });
}

function filterBy(keyword) {
    showGallery();
    
    const elGallery = document.querySelector('.gallery-images-container');
    
    updateFilter(keyword);
    renderGallery();
    elGallery.scrollIntoView({ alignToTop: true, behavior: "smooth", block: "center"});
}

function onToggleGallery() {
    const elGallery = document.querySelector('.gallery-images-container');
    const elImg = document.querySelector('#gallery-display-changer');

    if (elGallery.classList.contains('hide')) {
        elGallery.classList.remove('hide');
        elImg.src="img/icons/shrink.png";
    } else {
        elGallery.classList.add('hide');
        elImg.src="img/icons/enlarge.png";
    }
}

function showGallery() {
    const elGallery = document.querySelector('.gallery-images-container');
    if (elGallery.classList.contains('hide')) elGallery.classList.remove('hide');
}

function onChangeGalleryStyle(type) {
    showGallery();
    
    const elGallery = document.querySelector('.gallery-images-container');

    if (type === "grid") {
        elGallery.classList.add('grid');
        elGallery.classList.remove('image-list');
    } else {
        elGallery.classList.add('image-list');
        elGallery.classList.remove('grid');
    }
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

        return `<button class="filter-item" style="font-size:${keyword[1] * 0.8}rem" onclick="onKeywordClick(event,'${keyword[0]}')">${keyword[0]}</button>`
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
