'use strict';


//for the canvas stuff, the model is: update data (in meme-data.js), and after it, render the data on the canvas.

function renderEditor() {
    renderEditorBasic();
    initCanvas();

    //update meme data:
    let memeBase = getCurrMeme();
    let meme = createMeme(memeBase.id, memeBase.categories);
    console.log('meme:', meme)
    updateMeme(meme);

    //draw basic meme:
    drawMeme();
}

function getEditorHtml() {
    let res = `<p class="text-box-simulate" style="position: absolute; z-index: -10; visibility: hidden;"></p>
    
    <section class="editor-page flex justify-center align-start">

    <wrapper class="main-canvas-holder center-childs">    
        <wrapper class="main-canvas-container">
            <canvas class="main-canvas"></canvas>
        </wrapper>
    </wrapper>

    <wrapper class="control-bar-container">

        <div class="control-bar flex column center-childs">
        
        
        <input class="text-picker" type="text" placeholder="Text line" onchange="onTextInputChange(this)">
        <div class="line-control-container flex">
        
            <button class="line-control-button center-childs" onclick="onMoveClick(-1)">
                <img class="rotate90" src="images/buttons/arrow.png" alt="up">
            </button>
            <button class="line-control-button center-childs" onclick="onMoveClick(1)">
                <img class="rotate270" src="images/buttons/arrow.png" alt="down">
            </button>
            <button class="line-control-button center-childs" onclick="onSelectDownClick()">
                <img src="images/buttons/chevron-down.png" alt="down">
            </button>
            <button class="line-control-button center-childs" onclick="onAddLine()">
                <img src="images/buttons/plus.png" alt="add">
            </button>
            <button class="line-control-button center-childs" onclick="onRemoveLine()">
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
            <img src="images/buttons/align-left.png" alt="">
        </button>
        <button class="text-control-button">
            <img src="images/buttons/align-center.png" alt="">
        </button>
        <button class="text-control-button">
            <img src="images/buttons/align-right.png" alt="">
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
        <button class="download-button">download</button>
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
    // data:
    IncSelectedLineFont()

    // DOM:
    refreshMeme()
}

function onDecFont() {
    // data:
    DecSelectedLineFont()

    // DOM:
    refreshMeme()
}

function onColorChange(elInput) {
    let val = elInput.value;

    //data:
    changeSelectedLineColor(val);
    changeDefaultColor(val);

    // DOM:
    refreshMeme();

}

function onMoveClick(sign) {
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
    // data:
    removeSelectedLine();

    // DOM:
    refreshMeme();
}