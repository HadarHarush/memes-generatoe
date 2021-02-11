'use strict';


function renderGallery() {
    let elPageContainer = document.querySelector('.page-content');

    elPageContainer.innerHTML = getGalleryHtml();
}

function getGalleryHtml() {
    let categoriesHtml = getCategoriesBarHtml();
    let cardsHtml = getMemeCardsHtml();

    let res = `<section class="gallery-page main-container">
    <nav class="memes-nav">
        <div class="search-box">
            <input type="text">
        </div>

        ${categoriesHtml}
    </nav>

    <section class="memes-gallery">
        ${cardsHtml}
    </section>
</section>`;

    return res;
}

function getCategoriesBarHtml() {
    let categories = getCategories();

    let liHtml = categories.map(item => {
        return `<li class="category-button">${item.name}</li>`;
    }).join('');

    let res = `<ul class="categories-bar">
                    ${liHtml}
                    <li class="category-button">More...</li>
                </ul>`;

    return res;
}

function getMemeCardsHtml() {
    let memes = getMemes();

    let res = memes.map(item => {
        return `<article class="meme-preview-box" onclick="onMemeImageSelect(this)" data-id="${item.id}">
                    <img src="${item.rootUrl}" alt="">
                </article>`
    }).join('');

    return res;
}