const grid = document.querySelector("#grid");

let gridPixels = 40;
grid.style.width = `${gridPixels}vw`;
grid.style.height = `${gridPixels}vw`;


let originalColor = 'white';
let normalModeColor = 'black';
let chosenColor = '';
let shadeColor = null;
let gridToAdd;
let rowToAdd;
let removed = 0;
let gridSize = 16;
let mode = 'black';

function createGrid(gridSize){
    while(grid.firstChild){
        grid.removeChild(grid.firstChild);
    }

    for(let i=0; i<gridSize; i++){
        rowToAdd = document.createElement('div');
        rowToAdd.classList.add('row');
        grid.appendChild(rowToAdd);
        for (let j=0; j<gridSize; j++){
            gridToAdd = document.createElement('div');
            gridToAdd.classList.add('gridPart');

            gridToAddSize = String((gridPixels/gridSize));
            gridToAdd.style.width = gridToAddSize +'vw';
            gridToAdd.style.height = gridToAddSize +'vw';

            rowToAdd.appendChild(gridToAdd);
        }
    }
    const gridParts = document.querySelectorAll('.gridPart');
    gridPartList = Array.from(gridParts)

    gridPartList.forEach((gridPart) => {
        gridPart.addEventListener('mouseenter', () =>{
            if(mode=='black') gridPart.style.backgroundColor = normalModeColor;
            else if (mode=='random') gridPart.style.backgroundColor = random_rgba();
            else if (mode=='shades') gridPart.style.backgroundColor = changeMode(mode, 'shades');
            else if (mode=='eraser') gridPart.style.backgroundColor = originalColor;
            else if (mode=='choice') gridPart.style.backgroundColor = styleChoice.style.backgroundColor;
        })
    });
}

function changeGridSize(){
    gridSize = prompt("ENTER NEW GRID SIZE: (must be between 0 and 100)");
}

function random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
}

function shader(gridPart) {
    if (gridPart.style.filter == "") {
      gridPart.style.filter = "brightness(90%)";
    } else if (gridPart.style.filter != "brightness(0%)") {
      current_brightness = gridPart.style.filter.slice(-4, -2);
      current_brightness -= 10;
      gridPart.style.filter = "brightness(" + current_brightness + "%)";
    }
  }

function changeMode(mode, nextMode){
    if(mode=='black'){
        gridPartList.forEach((gridPart) => {
            gridPart.removeEventListener('mouseenter', () =>{
                gridPart.style.backgroundColor = normalModeColor;
            })
        });        
    }
    else if (mode=='random'){
        gridPartList.forEach((gridPart) => {
            gridPart.removeEventListener('mouseenter', () =>{
                gridPart.style.backgroundColor = random_rgba();
            })
        });
    }
    else if(mode=='shades'){
        gridPartList.forEach((gridPart) => {
            gridPart.removeEventListener('mouseenter', () => {
                if(gridPart.style.backgroundColor[3] == '('){
                    let colorString = gridPart.style.backgroundColor.slice(4);
                    let colorArray = colorString.split(',');
                    let newColor = parseInt(colorArray[0]) - 26;
                    newColor = Math.max(newColor, 0);
                    gridPart.style.backgroundColor = 'rgb(' + newColor + ',' + newColor + ',' + newColor + ')';
                }
                else{
                        gridPart.style.backgroundColor = '#e5e5e5';
                }
            });
        });        
    }
    else if(mode=='eraser'){
        gridPartList.forEach((gridPart) => {
            gridPart.removeEventListener('mouseenter', () =>{
                gridPart.style.backgroundColor = originalColor;
            })
        });        
    }
    else if(mode=='choice'){
        gridPartList.forEach((gridPart) =>{
            gridPart.removeEventListener('mouseenter', () =>{
                gridPart.style.backgroundColor = styleChoice.style.backgroundColor;
            })
        })
    }    
    if (nextMode=='random'){
        gridPartList.forEach((gridPart) => {
            gridPart.addEventListener('mouseenter', () =>{
                gridPart.style.backgroundColor = random_rgba();
            })
        });
    }
    else if(nextMode=='black'){
        gridPartList.forEach((gridPart) => {
            gridPart.addEventListener('mouseenter', () =>{
                gridPart.style.backgroundColor = normalModeColor;
            })
        });        
    }
    else if(nextMode=='shades'){
        gridPartList.forEach((gridPart) => {
            gridPart.addEventListener('mouseenter', () => {
                console.log(gridPart.style.backgroundColor);
                if(gridPart.style.backgroundColor[3] == '('){
                    let colorString = gridPart.style.backgroundColor.slice(4);
                    let colorArray = colorString.split(',');
                    let newColor = parseInt(colorArray[0]) - 26;
                    newColor = Math.max(newColor, 0);
                    gridPart.style.backgroundColor = 'rgb(' + newColor + ',' + newColor + ',' + newColor + ')';
                }
                else{
                        gridPart.style.backgroundColor = '#e5e5e5';
                }
            });
        });        
    }
    else if(nextMode=='eraser'){
        gridPartList.forEach((gridPart) => {
            gridPart.addEventListener('mouseenter', () =>{
                gridPart.style.backgroundColor = originalColor;
            })
        });        
    }
    else if(nextMode=='choice'){
        gridPartList.forEach((gridPart) =>{
            gridPart.addEventListener('mouseenter', () =>{
                gridPart.style.backgroundColor = styleChoice.style.backgroundColor;
            })
        })
    }
    console.log(mode + " became " + nextMode)
    mode = nextMode;    
}


const gridParts = document.querySelectorAll('.gridPart');
gridPartList = Array.from(gridParts)

const clearButton = document.querySelector('.clear');
const changeSizeButton = document.querySelector('#changeSize');
const randomButton = document.querySelector('#randomButton');
const blackButton = document.querySelector("#blackButton");
const shadesButton = document.querySelector('#shadesButton');
const eraserButton = document.querySelector('#eraserButton');
const styleChoice = document.querySelector('#styleSpan');


clearButton.addEventListener('click', ()=> {
    gridPartList.forEach((gridPart) => {
        gridPart.style.backgroundColor = originalColor;
    })
});

clearButton.addEventListener('click', ()=>{
    createGrid(gridSize);
});

changeSizeButton.addEventListener('click', () =>{
    changeGridSize();
    createGrid(gridSize);
    changeMode(mode, mode);
});

randomButton.addEventListener('click', ()=>{
    changeMode(mode, 'random');
    mode = 'random';
});

blackButton.addEventListener('click', ()=>{
    changeMode(mode, 'black');
    mode = 'black';
});

shadesButton.addEventListener('click', ()=>{
    changeMode(mode, 'shades');
    mode='shades';
});

eraserButton.addEventListener('click', () =>{
    changeMode(mode, 'eraser');
    mode='eraser';
});

styleChoice.addEventListener('click', () =>{
    changeMode(mode, 'choice');
    mode='choice';
});


createGrid(gridSize);