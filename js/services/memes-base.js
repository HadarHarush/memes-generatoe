'use strict';

let gCurrMemeImage = null;

let gMemesImages = [
    {
        id: 1,
        rootUrl: 'images/memes/1.jpg',
        url: 'images/memes/1.jpg',
        categories: ['happy', 'woman']
    },
    {
        id: 2,
        rootUrl: 'images/memes/2.jpg',
        url: 'images/memes/2.jpg',
        categories: ['happy', 'woman']
    },
    {
        id: 3,
        rootUrl: 'images/memes/3.jpg',
        url: 'images/memes/3.jpg',
        categories: ['happy', 'woman']
    },
    {
        id: 19,
        rootUrl: 'images/memes/19.jpg',
        url: 'images/memes/19.jpg',
        categories: ['happy', 'woman']
    },
    {
        id: 3,
        rootUrl: 'images/memes/3.jpg',
        url: 'images/memes/3.jpg',
        categories: ['happy', 'woman']
    },
    {
        id: 3,
        rootUrl: 'images/memes/3.jpg',
        url: 'images/memes/3.jpg',
        categories: ['happy', 'woman']
    },
    {
        id: 3,
        rootUrl: 'images/memes/3.jpg',
        url: 'images/memes/3.jpg',
        categories: ['happy', 'woman']
    },
    {
        id: 3,
        rootUrl: 'images/memes/3.jpg',
        url: 'images/memes/3.jpg',
        categories: ['happy', 'woman']
    },
    {
        id: 3,
        rootUrl: 'images/memes/3.jpg',
        url: 'images/memes/3.jpg',
        categories: ['happy', 'woman']
    },
    {
        id: 3,
        rootUrl: 'images/memes/3.jpg',
        url: 'images/memes/3.jpg',
        categories: ['happy', 'woman']
    },
    {
        id: 3,
        rootUrl: 'images/memes/3.jpg',
        url: 'images/memes/3.jpg',
        categories: ['happy', 'woman']
    },
    {
        id: 3,
        rootUrl: 'images/memes/3.jpg',
        url: 'images/memes/3.jpg',
        categories: ['happy', 'woman']
    },
    {
        id: 3,
        rootUrl: 'images/memes/3.jpg',
        url: 'images/memes/3.jpg',
        categories: ['happy', 'woman']
    },
    {
        id: 3,
        rootUrl: 'images/memes/3.jpg',
        url: 'images/memes/3.jpg',
        categories: ['happy', 'woman']
    },



];

function getMemes() {
    return gMemesImages;
}

function getCurrMemeBase() {
    return gCurrMemeImage;
}



function setCurrMeme(memeId) {
    let memes = getMemes();
    let meme = memes.find(item => {
        return memeId === item.id;
    });
    gCurrMemeImage = meme;
}

function getCurrMemeRatio() {
    let img = new Image();
    img.src = gCurrMemeImage.url;

    return (img.width / img.height);
}