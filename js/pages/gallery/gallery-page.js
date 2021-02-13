'use strict';

function renderGallery() {
    let elMemesNav = document.querySelector('.memes-nav');
    let elMemesGallery = document.querySelector('.memes-gallery');

    elMemesNav.innerHTML = getMemesNavHtml();
    elMemesGallery.innerHTML = getMemesGalleryHtml();

    document.body.classList.remove('editor-open');
    document.body.classList.add('gallery-open');
}

function getMemesNavHtml() {
    let categories = getCategories();

    let liHtml = categories.map(item => {
        return `<li class="category-button">${item.name}</li>`;
    }).join('');

    let res = `<div class="search-box">
    <input type="text" placeholder="SEARCH" maxlength="7" size="10">
</div>
<ul class="categories-bar clean-list flex">
                    ${liHtml}
                    <li class="category-button">More...</li>
                </ul>`;

    return res;
}

function getMemesGalleryHtml() {
    let memes = getMemes();

    let res = memes.map(item => {
        return `<article class="meme-preview-box center-childs" onclick="onMemeImageSelect(this)" data-id="${item.id}">
                    <img src="${item.rootUrl}" alt="">
                </article>`
    }).join('');

    return res;
}