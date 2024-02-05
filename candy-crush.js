document.addEventListener('DOMContentLoaded', ()=>{
    const gameBoard = document.querySelector('.game-board');
    const scoreBoard = document.querySelector('.score-board');
    const width = 8;
    const boxes = [];
    let score = 0;
    let highScore = localStorage.getItem('HighScore') || 0;
    const boxColors =[
        'red',
        'yellow',
        'green',
        'blue',
        'purple',
        'orange'
    ]

    const createBoxes = ()=>{
        for(let i=0; i< (width*width); i++){
            let box = document.createElement('div');
            box.setAttribute('draggable',true);
            box.id=i;
            box.style.backgroundColor = boxColors[Math.floor(Math.random()*boxColors.length)];
            gameBoard.appendChild(box);
            boxes.push(box);
        }
    }

    
    let scoreBox = document.createElement('div');
    scoreBox.classList.add('score-box');
    scoreBoard.appendChild(scoreBox);

    let highScoreBox = document.createElement('div');
    highScoreBox.classList.add('Highscore-box');
    scoreBoard.appendChild(highScoreBox);
    highScoreBox.innerText= `HighScore: ${highScore}`;
    

    createBoxes();

    //Drag the boxes(candies)
    let colorBeingDragged;
    let colorBeingReplaced;
    let boxIdBeingDragged;
    let boxIdBeingReplaced;

    boxes.forEach((e)=>e.addEventListener('dragstart',dragStart));
    boxes.forEach((e)=>e.addEventListener('dragend',dragEnd));
    boxes.forEach((e)=>e.addEventListener('dragover',dragOver));
    boxes.forEach((e)=>e.addEventListener('dragenter',dragEnter));
    boxes.forEach((e)=>e.addEventListener('dragleave',dragLeave));
    boxes.forEach((e)=>e.addEventListener('drop',dragDrop));

    function dragStart(){
        colorBeingDragged = this.style.backgroundColor;
        boxIdBeingDragged = parseInt(this.id);

    }

    function dragOver(e){
        e.preventDefault();
        
    }

    function dragEnter(e){
        e.preventDefault();
        
    }
    
    function dragLeave(){
        
    }
    
    function dragDrop(){
        colorBeingReplaced=this.style.backgroundColor;
        boxIdBeingReplaced=parseInt(this.id);
        this.style.backgroundColor = colorBeingDragged
        boxes[boxIdBeingDragged].style.backgroundColor = colorBeingReplaced;
        
    }

    function dragEnd(){
        let validMoves = [
            boxIdBeingDragged - 1,
            boxIdBeingDragged - width,
            boxIdBeingDragged + 1,
            boxIdBeingDragged + width
        ];

        let validMove = validMoves.includes(boxIdBeingReplaced);

        if(boxIdBeingReplaced && validMove){
            boxIdBeingReplaced = null;
        }else if (boxIdBeingReplaced && !validMove){
            boxes[boxIdBeingReplaced].style.backgroundColor = colorBeingReplaced;
            boxes[boxIdBeingDragged].style.backgroundColor = colorBeingDragged;
        }else{
            boxes[boxIdBeingDragged].style.backgroundColor = colorBeingDragged;
        }
    }

    const moveDown = () =>{
        for (let i = 0; i < 55; i++) {
            if(boxes[i+width].style.backgroundColor === ''){
                boxes[i+width].style.backgroundColor = boxes[i].style.backgroundColor;
                boxes[i].style.backgroundColor = '';
                // let firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
                // let isFirstRow = firstRow.includes(i);
                // if(isFirstRow && boxes[i].style.backgroundColor === ''){
                //     boxes[i].style.backgroundColor = boxColors[Math.floor(Math.random()*boxColors.length)];
                // }
            }
        }
    }

    const fillEmptyBoxes = () =>{
        for (let i = 0; i < 55; i++){
            let firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
            let isFirstRow = firstRow.includes(i);
            if(isFirstRow && boxes[i].style.backgroundColor === ''){
                boxes[i].style.backgroundColor = boxColors[Math.floor(Math.random()*boxColors.length)];
            }
        }
    }

    const checkRowForThree = () =>{
        for(let i=0; i < 61; i++){
            let rowOfThree = [i, i+1, i+2];
            let decidedColor = boxes[i].style.backgroundColor;
            const isBlank = boxes[i].style.backgroundColor === '';
            notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55];

            if(notValid.includes(i)) continue;

            if(rowOfThree.every(index => boxes[index].style.backgroundColor === decidedColor && !isBlank)){
                score += 3;
                rowOfThree.forEach(index =>{
                    boxes[index].style.backgroundColor = '';
                })
            }
        }
    }
    const checkColumnForThree = () =>{
        for(let i=0; i < 47; i++){
            let columnOfThree = [i, i+width, i+(width*2)];
            let decidedColor = boxes[i].style.backgroundColor;
            const isBlank = boxes[i].style.backgroundColor === '';
            if(columnOfThree.every(index => boxes[index].style.backgroundColor === decidedColor && !isBlank)){
                score += 3;
                columnOfThree.forEach(index =>{
                    boxes[index].style.backgroundColor = '';
                })
            }
        }
    }


    //check for four
    const checkRowForFour = () =>{
        for(let i=0; i < 60; i++){
            let rowOfFour = [i, i+1, i+2, i+3];
            let decidedColor = boxes[i].style.backgroundColor;
            const isBlank = boxes[i].style.backgroundColor === '';
            notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55];

            if(notValid.includes(i)) continue;

            if(rowOfFour.every(index => boxes[index].style.backgroundColor === decidedColor && !isBlank)){
                score += 4;
                rowOfFour.forEach(index =>{
                    boxes[index].style.backgroundColor = '';
                })
            }
        }
    }
    const checkColumnForFour = () =>{
        for(let i=0; i < 39; i++){
            let columnOfFour = [i, i+width, i+(width*2), i+(width*3)];
            let decidedColor = boxes[i].style.backgroundColor;
            const isBlank = boxes[i].style.backgroundColor === '';
            if(columnOfFour.every(index => boxes[index].style.backgroundColor === decidedColor && !isBlank)){
                score += 4;
                columnOfFour.forEach(index =>{
                    boxes[index].style.backgroundColor = '';
                })
            }
        }
    }

    

    window.setInterval(()=>{
        checkRowForFour();
        checkColumnForFour();
        checkRowForThree();
        checkColumnForThree();
        
        scoreBox.innerText= `Score: ${score}`;
        highScore = score >= highScore ? score : highScore;
        localStorage.setItem('HighScore', highScore);
        highScoreBox.innerText= `HighScore: ${highScore}`;
    }, 100);

    window.setInterval(()=>{
        moveDown();
        fillEmptyBoxes();
    },250)

    












})