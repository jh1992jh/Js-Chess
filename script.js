const board = document.getElementById('board');
const berlinBtn = document.getElementById('berlinBtn');
let squares = []
let squareNodes = []



class Board {
    constructor() {
        this.pickedPiece = null
        this.picked = false
        this.pickedPieceIndex = ''
    }

    // Setup the squares array needed for setting up the board and moving the pieces etc...
    drawBoard() {
        squares = []
        let squareLetters = ['a','b','c','d','e','f','g','h']
        for (let i = 8; i > 0; i--) {
            let line = i

            for(let j = 0; j < squareLetters.length; j++) {
                let square = {
                    line: line,
                    square: squareLetters[j],
                    id: squareLetters[j]+line,
                    piece: {
                        name: '',
                        faction: '',
                        src: ''
                    }
                }
                squares.push(square)
            }

        }
    }

    // Setup the board
    drawPositions() {
        board.innerHTML = ""
        squares.forEach((square, i) => {
            if(square.line % 2 !== 0) {
                if((i) % 2 !== 0) {
                    board.innerHTML += `<div class="square" id=${square.id} data-line=${square.line} data-square=${i} data-piece=""></div>`
                } else {
                    board.innerHTML += `<div class="square black-square" id=${square.id} data-line=${square.line} data-square=${i} data-piece=""></div>`
                } 
            
                }

            if(square.line % 2 === 0) {
                
                if((i) % 2 === 0) {
                    board.innerHTML += `<div class="square" id=${square.id} data-line=${square.line} data-square=${i} data-piece=""></div>`
                } else {
                    board.innerHTML += `<div class="square black-square" id=${square.id} data-line=${square.line} data-square=${i} data-piece=""></div>`
                }                
            }

            if(square.piece.name !== "") {
                const squareDiv = document.getElementById(`${square.id}`)
                const pieceImg = document.createElement('img')
                pieceImg.src = `./pieces/${square.piece.src}.svg`
                squareDiv.appendChild(pieceImg)
            }
        }
        
            
    )
    squareNodes = []
    let squareQueryNodes = board.querySelectorAll('.square')
    let squareArr1 = Array.from(squareQueryNodes)
    squareNodes = squareArr1 
        
    }

    // Setup starting position
    startingPieces () {
        const updatedSquares = squares.map((square, i) => {

            const line = square.line
            switch(line) {
                case 1:
                square.piece.faction = "Valkoinen"
                break;
                case 2: 
                square.piece.faction = "Valkoinen"
                square.piece.name = "Sotilas"
                break;
                case 7:
                square.piece.faction = "Musta"
                square.piece.name = "Sotilas"
                break;
                case 8:
                square.piece.faction = "Musta"
                break;
            }

            const squareLetter = square.square

            if(line === 1 || line  === 8) {
                switch(squareLetter) {
                    case "a": 
                    square.piece.name = "Torni"
                    break;
                    case "h": 
                    square.piece.name = "Torni"
                    break;
                    case "b": 
                    square.piece.name = "Ratsu"
                    break;
                    case "g": 
                    square.piece.name = "Ratsu"
                    break;
                    case "c": 
                    square.piece.name = "Lähetti"
                    break;
                    case "f": 
                    square.piece.name = "Lähetti"
                    break;
                    case "d": 
                    square.piece.name = "Kuningatar"
                    break;
                    case "e": 
                    square.piece.name = "Kuningas"
                    break;
    
                }
            }

            square.piece.src = square.piece.name + square.piece.faction

            return square
        })
        squares = updatedSquares
        
    }

    pickupPiece (e) {

        // For being able to unpick a piece
        if(this.picked && this.pickedPiece !== "") {
            if(e.target.id === this.pickedPiece.id) {
                this.pickedPiece.classList.remove('picked')
                this.pickedPiece = ""
                this.pickedPieceIndex = ""
                this.picked = false
                return
            }
        }

        if(!this.picked) {
            
           
        let nodeIndex = squareNodes.indexOf(e.target)
        
        // For not being able to pick empty squares
        if(squares[nodeIndex].piece === "") {
            return 
        }

        this.pickedPiece = e.target
        this.pickedPieceIndex = nodeIndex
        this.pickedPiece.classList.add('picked')
        console.log(this.pickedPiece)
        this.picked = true
        }else {
            return 
        }
    }

    movePiece(e) {
        // For making sure that the rest of the function doesn't execute if the player has not picked up a piece
        if(!this.picked) return
        if(e.target.id === this.pickedPiece.id) return
        let nodeIndex = squareNodes.indexOf(e.target)
        // For making sure that a black piece can't kill a black piece and white piece can't kill a white piece
        if(squares[this.pickedPieceIndex].piece.faction === squares[nodeIndex].piece.faction) return 
        e.target.innerHTML = `<img src=./pieces/${squares[this.pickedPieceIndex].piece.src}.svg ></img>`
        squareNodes[this.pickedPieceIndex].innerHTML = ""
        squares[nodeIndex].piece = squares[this.pickedPieceIndex].piece
        squares[this.pickedPieceIndex].piece = ""
        this.picked = false
        this.pickedPiece.classList.remove('picked')
        this.pickedPiece = ""
        this.pickedPieceIndex = ""
    }

    BerlinDefence(from, to) {        
        const squareIDs = squares.map((square, i) => {
            return square.id
        })

        const moveFrom = squareIDs.indexOf(from)
        const moveTo = squareIDs.indexOf(to)
           
        squareNodes[moveTo].innerHTML = `<img src=./pieces/${squares[moveFrom].piece.src}.svg ></img>`
        squareNodes[moveFrom].innerHTML = "" 
        squares[moveTo].piece = squares[moveFrom].piece
        squares[moveFrom].piece = ""
    }
}

// Init BoardClass
const BoardClass = new Board() 

window.onload = () => {
    // Setup starting position and the bord
    BoardClass.drawBoard()
    BoardClass.startingPieces()
    BoardClass.drawPositions()

    board.addEventListener('click', BoardClass.pickupPiece)
    board.addEventListener('dblclick', BoardClass.movePiece)
}

// BerlinDefence Code
const reset = () => {
    BoardClass.drawBoard()
    BoardClass.startingPieces()
    BoardClass.drawPositions()
    i = 0;
}

let i = 0;

berlinBtn.addEventListener('click',() => {
    reset()
    const moves = [['e2','e4'],['e7','e5'],['g1','f3'], ['b8', 'c6'], ['f1', 'b5'], ['g8', 'f6']]
   
       let BerlinTimer = setInterval(() => {
           if(i === moves.length) {
               clearInterval(BerlinTimer)
               reset()
           } else {
            BoardClass.BerlinDefence(moves[i][0], moves[i][1]);
            i++
           }
          },1000)      
})



