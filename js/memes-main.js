'use strict'

function init() {
    gCanvas = document.querySelector('.meme');
    gCtx = gCanvas.getContext('2d');

    gCanvas.width = window.innerWidth / 1.5;
    gCanvas.height = window.innerHeight / 2;

    createImages();
    initMeme();
    renderFilter();
    renderGallery();
    renderCanvas();
    onClear();
}

function onToggleHide(theClass) {
    const el = document.querySelector(theClass);
    el.classList.toggle('hide');
}