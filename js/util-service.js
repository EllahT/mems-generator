'use strict'

function makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function saveToStorage(key, value) {
    var strValue = JSON.stringify(value);
    localStorage.setItem(key, strValue);
}

function loadFromStorage(key) {
    return JSON.parse(localStorage.getItem(key))
}

function onAddClassToEl(className, newClass) {
    const el = document.querySelector('.' + className);
    el.classList.add(newClass);
}

function onRemoveClassToEl(className, removedClass) {
    const el = document.querySelector('.' + className);
    el.classList.remove(removedClass);
}

function onToggleClassToEl(className, toggeledClass) {
    const el = document.querySelector('.' + className);
    el.classList.toggle(toggeledClass);
}

function onToggleHide(className) {
    const el = document.querySelector('.' + className);
    el.classList.toggle('hide');
}