'use strict';

let gCurrPage = 'gallery';

function renderPage() {
    renderCurrPage();
}

function onMemeImageSelect(elArticle) {
    let memeId = +elArticle.dataset.id;
    setCurrMeme(memeId);

    let newPage = 'editor';
    setCurrPage(newPage);
    renderPage();
}


function setCurrPage(newPage) {
    gCurrPage = newPage;
}

function renderCurrPage() {
    switch (gCurrPage) {
        case 'gallery':
            renderGallery();
            break;
        case 'editor':
            renderEditor();
            break;
        case 'about':
            renderAbout();
            break;
        default:
            break;
    }
}