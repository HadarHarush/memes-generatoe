'use strict';


//for the canvas stuff, the model is: update data (in meme-data.js), and after it, render the data on the canvas.

function renderEditor() {
    renderEditorBasic();
    initCanvas();

    //update meme data:
    let memeBase = getCurrMemeBase();
    let meme = createMeme(memeBase.id, memeBase.categories);
    console.log('meme:', meme)
    updateMeme(meme);

    //draw basic meme:
    drawMeme();
}

function getEditorHtml() {
    let res = `<p class="text-box-simulate" style="position: absolute; z-index: -10; visibility: hidden;"></p>
    
    <section class="editor-page flex justify-center align-start">

    <wrapper class="main-canvas-holder center-childs big-fat-modal">    
        <wrapper class="main-canvas-container">
            <canvas class="main-canvas"></canvas>
        </wrapper>
    </wrapper>

    <wrapper class="control-bar-container big-fat-modal">

        <div class="control-bar flex column center-childs">
        
        
        <input class="text-picker" type="text" placeholder="Text line" oninput="onTextInputChange(this)">
        <div class="line-control-container flex">
        
            <button class="line-control-button center-childs hide" onclick="onMoveClick(-1)">
                <img class="rotate90" src="images/buttons/arrow.png" alt="up">
            </button>
            <button class="line-control-button center-childs hide" onclick="onMoveClick(1)">
                <img class="rotate270" src="images/buttons/arrow.png" alt="down">
            </button>
            
            <button class="add-line-button line-control-button center-childs" onclick="onAddLine()">
                <img src="images/buttons/plus.png" alt="add">
            </button>

            <button class="select-down-button line-control-button center-childs" onclick="onSelectDownClick()">
                <img src="images/buttons/chevron-down.png" alt="down">
            </button>

            <button class="remove-line-button line-control-button center-childs" onclick="onRemoveLine()">
                <img src="images/buttons/remove.svg" alt="add">
            </button>

    </div>

    <div class="text-control-container grid">
        <button class="text-control-button" onclick="onIncFont()">
            <img src="images/buttons/inc-font.png" alt="">
        </button>
        <button class="text-control-button" onclick="onDecFont()">
            <img src="images/buttons/dec-font.png" alt="">
        </button>
        <button class="text-control-button">
            <input type="color" name="color-picker" onchange="onColorChange(this)">
        </button>

        <select name="font-select" id="" value="impact">
            <option value="impact" style="font-family: impact;">IMPACT</option>
            <option value="impact">IMPACT</option>
            <option value="impact">IMPACT</option>
            <option value="impact">IMPACT</option>
        </select>
    </div>

    <div class="emojis-control-container flex">

        <a class="emoji-image-container" href="">
            <img class="emoji-image" src="" alt="">
        </a>
        <a class="emoji-image-container" href="">
            <img class="emoji-image" src="" alt="">
        </a>
        <a class="emoji-image-container" href="">
            <img class="emoji-image" src="" alt="">
        </a>
        <a class="emoji-image-container" href="">
            <img class="emoji-image" src="" alt="">
        </a>
        <a class="emoji-image-container" href="">
            <img class="emoji-image" src="" alt="">
        </a>
        <a class="emoji-image-container" href="">
            <img class="emoji-image" src="" alt="">
        </a>
        <a class="emoji-image-container" href="">
            <img class="emoji-image" src="" alt="">
        </a>
    </div>

    <div class="general-control-container flex">
        <button class="share-button">share</button>
        <button class="save-button" onclick="onSaveMeme()">save</button>
        <a class="download-a" download>download</a>
    </div>
        
        </div>

        

    </wrapper>




</section>`;

    return res;
}

function renderEditorBasic() {
    let elPageContainer = document.querySelector('.page-content');

    elPageContainer.innerHTML = getEditorHtml();
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
    });

}