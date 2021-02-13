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
        id: 4,
        rootUrl: 'images/memes/4.jpg',
        url: 'images/memes/4.jpg',
        categories: ['happy', 'woman']
    },
    {
        id: 5,
        rootUrl: 'images/memes/5.jpg',
        url: 'images/memes/5.jpg',
        categories: ['happy', 'woman']
    },
    {
        id: 6,
        rootUrl: 'images/memes/6.jpg',
        url: 'images/memes/6.jpg',
        categories: ['happy', 'woman']
    },
    {
        id: 7,
        rootUrl: 'images/memes/7.jpg',
        url: 'images/memes/7.jpg',
        categories: ['happy', 'woman']
    },
    {
        id: 8,
        rootUrl: 'images/memes/8.jpg',
        url: 'images/memes/8.jpg',
        categories: ['happy', 'woman']
    },
    {
        id: 9,
        rootUrl: 'images/memes/9.jpg',
        url: 'images/memes/9.jpg',
        categories: ['happy', 'woman']
    },
    {
        id: 11,
        rootUrl: 'images/memes/11.jpg',
        url: 'images/memes/11.jpg',
        categories: ['happy', 'woman']
    },
    {
        id: 12,
        rootUrl: 'images/memes/12.jpg',
        url: 'images/memes/12.jpg',
        categories: ['happy', 'woman']
    },
    {
        id: 13,
        rootUrl: 'images/memes/13.jpg',
        url: 'images/memes/13.jpg',
        categories: ['happy', 'woman']
    },
    {
        id: 14,
        rootUrl: 'images/memes/14.jpg',
        url: 'images/memes/14.jpg',
        categories: ['happy', 'woman']
    },
    {
        id: 15,
        rootUrl: 'images/memes/15.jpg',
        url: 'images/memes/15.jpg',
        categories: ['happy', 'woman']
    },
    {
        id: 16,
        rootUrl: 'images/memes/16.jpg',
        url: 'images/memes/16.jpg',
        categories: ['happy', 'woman']
    }



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