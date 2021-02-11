'use strict';

let gCtx;
let gElCanvas;
let gElContainer;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

let gClicksInfo = {
    pos: {
        x: 0,
        y: 0
    },
    mouseDown: false,
    movedBeforeMouseUp: false,
    mouseMoveLastDraw: null
}

function refreshMeme() {
    // clearCanvas();
    drawMeme();
}

function drawMeme() {
    //the image is allways the oldest layer:
    drawImage(gMeme.imgUrl);

    //all the other drawing assigments are located in the onload event of the image
}

function resizeCanvas() {
    gElContainer = document.querySelector('.main-canvas-container');
    gElCanvas = gElContainer.querySelector('canvas');
    let XYratio = getCurrMemeRatio();

    gElContainer.style.height = gElContainer.offsetWidth * (1 / XYratio) + 'px';

    gElCanvas.width = gElContainer.offsetWidth;
    gElCanvas.height = gElContainer.offsetHeight;
}

function initCanvas() {
    resizeCanvas();

    gCtx = gElCanvas.getContext('2d');
    clearCanvas()
    addCanvasListeners();
}


// Listeners:

function addCanvasListeners() {
    addMouseListeners()
    addTouchListeners()
    // window.addEventListener('resize', () => {
    //     resizeCanvas()
    //     clearCanvas()
    // })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove);

    gElCanvas.addEventListener('mousedown', onDown);

    document.addEventListener('mouseup', onUp);
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)

    gElCanvas.addEventListener('touchstart', onDown)

    gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    const pos = getEvPos(ev);
    let line = findLineClicked(pos)
    if (!line) return;

    gClicksInfo.mouseDown = true;
    gClicksInfo.mouseMoveLastDraw = pos;

    let idx = findLineIdx(line);
    selectLine(idx);
    console.log('gMeme selected idx:', gMeme.selectedLineIdx);
    //until here there is no bug
    refreshMeme()

    console.log('found!');

    document.body.style.cursor = 'grabbing';
    console.log('gMeme selected idx:', gMeme.selectedLineIdx);
}

function onMove(ev) {
    // return;

    if (gClicksInfo.mouseDown) {
        console.log('touchmove');

        let pos = getEvPos(ev);
        let dist = getDist(pos, gClicksInfo.mouseMoveLastDraw);

        let lastLineTextPos = getSelectedLine().textPos;

        let newPos = {
            x: lastLineTextPos.x + dist.x,
            y: lastLineTextPos.y + dist.y
        }
        console.log('gMeme selected idx:', gMeme.selectedLineIdx);

        updateLineData(getSelectedLine(), 'textPos', newPos);

        refreshMeme();

        //reset datas:
        gClicksInfo.mouseMoveLastDraw = pos;
        console.log('gMeme selected idx:', gMeme.selectedLineIdx);

    }
}

function onUp() {
    if (!gClicksInfo.mouseDown) return
    gClicksInfo.mouseDown = false;
    // if (!gClicksInfo.movedBeforeMouseUp) {
    //     selectLine(gClicksInfo.pos);
    // }
    document.body.style.cursor = '';
    console.log('gMeme selected idx:', gMeme.selectedLineIdx);
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}


function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
    gCtx.fillStyle = "#ffffff00";
    gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height);
}

function drawLine(line) {
    gCtx.beginPath();
    gCtx.font = `${line.text.size}px ${line.text.font}`;
    gCtx.fillStyle = line.text.color;
    gCtx.textAlign = "center";
    gCtx.fillText(line.text.content, line.textPos.x, line.textPos.y);

    gCtx.fill();
}

function drawImage(url, dx = 0, dy = 0) {
    let img = new Image();
    img.src = url;

    let drawingStatus = 'drawing';

    img.onload = function () {
        gCtx.drawImage(img, dx, dy, gElCanvas.width, gElCanvas.height);

        //draw lines from oldest to freshest:
        gMeme.lines.forEach(line => {
            drawLine(line);
        });

        //draw textBox to the selected line:
        let selectedLine = getSelectedLine();
        drawTextBox(selectedLine);
    };
}

function getCanvasXCenter() {
    let res = gElCanvas.offsetWidth / 2;
    return res
}

function getCanvasYCenter() {
    let res = gElCanvas.offsetHeight / 2;
    return res;
}

function drawTextBox(line) {
    let textBoxMeasures = line.textBoxMeasures;
    let textBoxPos = line.textBoxPos;

    gCtx.beginPath();
    gCtx.rect(textBoxPos.x, textBoxPos.y, textBoxMeasures.width, textBoxMeasures.height);
    gCtx.stroke();
}

function getCanvasMeasures() {
    return {
        width: gElCanvas.offsetWidth,
        height: gElCanvas.offsetHeight
    }
}