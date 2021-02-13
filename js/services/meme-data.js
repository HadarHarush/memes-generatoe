'use strict';

let gMeme;

let gCurrs = {
    text: {
        content: 'Your text here here here',
        size: 30,
        color: 'white',
        font: 'impact',
        padding: 10
    },
    pos: {
        x: null,
        y: 50
    },
    linesCount: 0,
}

function createMeme(imgId, categories) {
    let res = {
        imgUrl: `/memes-generatoe/images/memes/${imgId}.jpg`,
        categories,
        selectedLineIdx: 0,
        lines: [createLine()]
    }

    return res;
}

function updateLineData(line, property, newPos) {
    line[property] = newPos;
    refreshTextBoxData(line);
}

function selectLine(lineIdx) {
    gMeme.selectedLineIdx = lineIdx;
}

function findLineIdx(line) {
    let res;
    gMeme.lines.forEach((currLine, idx) => {
        if (line === currLine) {
            res = idx;
        };
    });

    return res;
}

function createLine() {
    let res = {
        nthLine: ++gCurrs.linesCount,
        text: {
            size: gCurrs.text.size,
            color: gCurrs.text.color,
            font: gCurrs.text.font,
            content: gCurrs.text.content,
            padding: gCurrs.text.padding
        },
        textBoxMeasures: null,
        textPos: null,
        textBoxPos: null
    }

    let linesCount = 1;
    if (gMeme) linesCount = gMeme.lines.length + 1

    res.textBoxMeasures = getTextBoxMeasures(res);
    res.textPos = getDefaultTextPos(linesCount, res.textBoxMeasures),
        res.textBoxPos = getTextBoxPos(res);

    return res;
}

function addLineToMeme(line) {
    gMeme.lines.push(line);
}

function getCurrMeme() {
    return gMeme;
}

function getTextBoxMeasures(line) {
    let textBox = document.querySelector('.text-box-simulate');

    // fill the demo box with all the line properties:
    textBox.innerText = line.text.content;
    textBox.style.fontSize = line.text.size + 'px';
    textBox.style.fontFamily = line.text.font;
    textBox.style.padding = line.text.padding + 'px';

    // get results:
    let boxWidth = textBox.offsetWidth;
    let boxHeight = textBox.offsetHeight;

    let res = {
        width: boxWidth,
        height: boxHeight,
    }
    return res;
}

function getTextBoxPos(line) {
    let width = line.textBoxMeasures.width;
    let height = line.textBoxMeasures.height;

    let lineYcenter = line.textPos.y - (line.text.size / 2);
    let boxPos = {
        x: line.textPos.x - (width / 2),
        y: lineYcenter - (height / 2)
    }

    return boxPos;
}

function updateMeme(newMeme) {
    gMeme = newMeme;
}

// function getSelectedLine() {
//     let idx = gMeme.selectedLineIdx;
//     return gMeme.lines[idx];
// }

function getSelectedLine() {
    let lineIdx = gMeme.selectedLineIdx;
    let line = gMeme.lines[lineIdx];
    return line;
}

function changeSelectedLineText(val) {
    let line = getSelectedLine();
    line.text.content = val;

    //refresh text-box data:
    refreshTextBoxData(line);
}

function changeSelectedLineColor(val) {
    let line = getSelectedLine();
    line.text.color = val;
}

function changeSelectedLineFont(val) {
    let line = getSelectedLine();
    line.text.font = val;
}

function removeSelectedLine() {
    let idx = gMeme.selectedLineIdx;
    gMeme.lines.splice(idx, 1);
}

function changeDefaultColor(val) {
    gCurrs.text.color = val;
}

function changeDefaultFont(val) {
    gCurrs.text.font = val;
}

function moveSelectedLine(sign) {
    let line = getSelectedLine();
    line.textPos.y -= sign * 2;

    refreshTextBoxData(line)
};

function IncSelectedLineFont() {
    let line = getSelectedLine();
    line.text.size += 2;

    refreshTextBoxData(line)
}

function DecSelectedLineFont() {
    let line = getSelectedLine();
    line.text.size -= 2;

    refreshTextBoxData(line)
}

function refreshTextBoxData(line) {
    line.textBoxMeasures = getTextBoxMeasures(line)
    line.textBoxPos = getTextBoxPos(line);
}

function getDefaultTextPos(lineNth, textBoxMeasures) {
    let canvasMeasures = getCanvasMeasures();
    let pos = {
        1: {
            x: getCanvasXCenter(),
            y: canvasMeasures.height / 8
        },
        2: {
            x: getCanvasXCenter(),
            y: (canvasMeasures.height / 8) * 7 - textBoxMeasures.height
        }
    }

    if (lineNth <= 2) return pos[lineNth];
    return {
        x: getCanvasXCenter(),
        y: getCanvasYCenter()
    }

    return pos[lineNth];
}

function findLineClicked(pos) {
    let linesCopy = gMeme.lines.slice();
    let linesCopyReverse = linesCopy.reverse();

    let res = linesCopy.find(line => {
        let minX = line.textBoxPos.x;
        let minY = line.textBoxPos.y;
        let maxX = line.textBoxPos.x + line.textBoxMeasures.width;
        let maxY = line.textBoxPos.y + line.textBoxMeasures.height;

        let bounderiesMap = {
            minX,
            minY,
            maxX,
            maxY
        }

        //check if the click was in all four textBox bounderies:
        return isClickInBounderies(pos, bounderiesMap)
    });
    return res;
}

function isClickInBounderies(pos, bounderiesMap) {
    let outOfBounderies = (pos.x < bounderiesMap.minX || pos.y < bounderiesMap.minY || pos.x > bounderiesMap.maxX || pos.y > bounderiesMap.maxY);

    return !outOfBounderies;
}

function getDist(newPos, lastPos) {
    return {
        x: newPos.x - lastPos.x,
        y: newPos.y - lastPos.y
    }
}