'use strict';


//for the canvas stuff, the model is: update data (in meme-data.js), and after it, render the data on the canvas.

function renderEditor() {
    document.body.classList.remove('gallery-open');
    document.body.classList.add('editor-open');

    initCanvas();

    //update meme data:
    let memeBase = getCurrMemeBase();
    let meme = createMeme(memeBase.id, memeBase.categories);
    console.log('meme:', meme)
    updateMeme(meme);

    //draw basic meme:
    drawMeme();
}

function onTextInputChange(elInput) {
    // if there is no selected line - return:
    if (!getSelectedLine()) return;

    let val = elInput.value;

    //data:
    changeSelectedLineText(val);

    //dom:
    refreshMeme();
}

function onAddLine() {
    // data:
    let line = createLine();
    addLineToMeme(line);

    //change the selected line to this auto:
    selectLine(line.nthLine - 1);

    // DOM:
    refreshMeme()


}

function onIncFont() {
    // if there is no selected line - return:
    if (!getSelectedLine()) return;

    // data:
    IncSelectedLineFont()

    // DOM:
    refreshMeme()
}

function onDecFont() {
    // if there is no selected line - return:
    if (!getSelectedLine()) return;

    // data:
    DecSelectedLineFont()

    // DOM:
    refreshMeme()
}

function onColorChange(elInput) {
    let val = elInput.value;

    //data:
    if (getSelectedLine()) {
        changeSelectedLineColor(val);
    }
    changeDefaultColor(val);

    // DOM:
    refreshMeme();

}

function onChangeFont(elSelect) {
    let val = elSelect.value;

    //data:
    if (getSelectedLine()) {
        changeSelectedLineFont(val);
    }
    changeDefaultFont(val);

    // DOM:
    refreshMeme();
}

function onMoveClick(sign) {
    // if there is no selected line - return:
    if (!getSelectedLine()) return;

    // data:
    moveSelectedLine(sign);

    // DOM:
    refreshMeme();
}

function onSelectDownClick() {
    // data:
    // this function will be write only after we will create a text-area property:
    selectDown();

    // DOM:
    refreshMeme();
}

function onRemoveLine() {
    // if there is no selected line - return:
    if (!getSelectedLine()) return;

    // data:
    removeSelectedLine();

    // DOM:
    refreshMeme();
}

function onSaveMeme() {
    //get a meme with no selected boxes:
    selectLine();
    refreshMeme(function () {
        let meme = getCurrMeme();
        // addMemeToLocalStorage(meme);

        let elDownload = document.querySelector('.download-a');
        elDownload.href = getCanvasUrl();
        elDownload.setAttribute('download', '');

        // update DOM visuals:
        let elSave = document.querySelector('.save-a');
        elSave.classList.add('saved');
    });
}

function onToggleTextPicker() {
    let elControlBar = document.querySelector('.control-bar');
    elControlBar.classList.toggle('text-picker-open');
}

function unSave() {
    // update DOM visuals:
    let elSave = document.querySelector('.save-a');
    elSave.classList.remove('saved');

    let elDownload = document.querySelector('.download-a');
    elDownload.removeAttribute('download');
}

function onDownloadTry() {
    let elDownload = document.querySelector('.download-a');
    let elNoticeBox = document.querySelector('.control-bar .notice-box');

    if (!elDownload.hasAttribute('download')) {
        let msg = 'please save your new meme before download';
        sendControlBarNotice(msg);
    }
}

function sendControlBarNotice(msg, time = 3000) {
    let elNoticeBox = document.querySelector('.control-bar .notice-box');
    elNoticeBox.innerText = msg

    setTimeout(() => {
        elNoticeBox.innerText = '';
    }, time)
}