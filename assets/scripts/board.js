class Board {
    constructor() {
        this.rows = 8
        this.cols = 8
        this.rowList = []
        this.currentPiece = null
        this.player = 'white'
    }

    createObjectsAndElements() {
        // Create squares object and pieces object
        for (let rowIndex = 0 ; rowIndex < this.rows ; ++rowIndex) {
            const rowObject = new Row()
            rowObject.designRowElement()
            for (let colIndex = 0 ; colIndex < this.cols ; ++colIndex) {
                const squareColor  = (colIndex + rowIndex) % 2 === 0 ? '#faf5de' : '#e1dbb5'
                const squareObject = new Square(rowIndex, colIndex, squareColor, null)
                squareObject.designSquareElement()

                if (rowIndex === 1) {
                    squareObject.piece = new Pawn(colIndex, rowIndex, 'pawn', 'black')
                    squareObject.piece.designPieceElement()
                }

                if (rowIndex === 6) {
                    squareObject.piece = new Pawn(colIndex, rowIndex, 'pawn', 'white')
                    squareObject.piece.designPieceElement()
                }
                rowObject.colList.push(squareObject)
            }
            this.rowList.push(rowObject)
        }

        // Create black rook
        this.rowList[0].colList[0].piece = new Rook(0, 0, 'rook', 'black')
        this.rowList[0].colList[0].piece.designPieceElement()

        this.rowList[0].colList[7].piece = new Rook(7, 0, 'rook', 'black')
        this.rowList[0].colList[7].piece.designPieceElement()

        // Create white rook
        this.rowList[7].colList[0].piece = new Rook(0, 7, 'rook', 'white')
        this.rowList[7].colList[0].piece.designPieceElement()

        this.rowList[7].colList[7].piece = new Rook(7, 7, 'rook', 'white')
        this.rowList[7].colList[7].piece.designPieceElement()

        // Create black knight
        this.rowList[0].colList[1].piece = new Knight(1, 0, 'knight', 'black')
        this.rowList[0].colList[1].piece.designPieceElement()

        this.rowList[0].colList[6].piece = new Knight(6, 0, 'knight', 'black')
        this.rowList[0].colList[6].piece.designPieceElement()

        // Create white knight
        this.rowList[7].colList[1].piece = new Knight(1, 7, 'knight', 'white')
        this.rowList[7].colList[1].piece.designPieceElement()

        this.rowList[7].colList[6].piece = new Knight(6, 7, 'knight', 'white')
        this.rowList[7].colList[6].piece.designPieceElement()
        
        // Create black bishop
        this.rowList[0].colList[2].piece = new Bishop(2, 0, 'bishop', 'black')
        this.rowList[0].colList[2].piece.designPieceElement()

        this.rowList[0].colList[5].piece = new Bishop(5, 0, 'bishop', 'black')
        this.rowList[0].colList[5].piece.designPieceElement()

        // Create white bishop
        this.rowList[7].colList[2].piece = new Bishop(2, 7, 'bishop', 'white')
        this.rowList[7].colList[2].piece.designPieceElement()

        this.rowList[7].colList[5].piece = new Bishop(5, 7, 'bishop', 'white')
        this.rowList[7].colList[5].piece.designPieceElement()

        // Create queen
        this.rowList[0].colList[3].piece = new Queen(3, 0, 'queen', 'black')
        this.rowList[0].colList[3].piece.designPieceElement()

        this.rowList[7].colList[3].piece = new Queen(3, 7, 'queen', 'white')
        this.rowList[7].colList[3].piece.designPieceElement()

        // Create king
        this.rowList[0].colList[4].piece = new King(4, 0, 'king', 'black')
        this.rowList[0].colList[4].piece.designPieceElement()

        this.rowList[7].colList[4].piece = new King(4, 7, 'king', 'white')
        this.rowList[7].colList[4].piece.designPieceElement()

        return this.rowList
    }

    renderElements() {
        const boardElement = document.getElementById('chess-board')
        for (let rowIndex = 0 ; rowIndex < this.rows ; ++rowIndex) {
            const rowObject = this.rowList[rowIndex]
            const rowElement = rowObject.rowElement
            for (let colIndex = 0 ; colIndex < this.cols ; ++colIndex) {
                const squareObject = rowObject.colList[colIndex]
                const squareElement = squareObject.squareElement
                squareObject.changeSquareElementColor(squareObject.color)
                const pieceOject = squareObject.piece
                if (pieceOject !== null) {
                    const pieceElement = pieceOject.pieceElement
                    squareElement.appendChild(pieceElement)
                }
                rowElement.appendChild(squareElement)
            }
            boardElement.appendChild(rowElement)
        }
    }

    replacePieceObject(oldIndex, newIndex) {
        const oldRowIndex = oldIndex[0]
        const oldColIndex = oldIndex[1]
        const oldSpot = this.rowList[oldRowIndex].colList[oldColIndex]

        if (oldSpot.piece.name === 'king' || oldSpot.piece.name === 'rook') {
            oldSpot.piece.isFirstMove = false
        }

        const newRowIndex = newIndex[0]
        const newColIndex = newIndex[1]
        const newSpot = this.rowList[newRowIndex].colList[newColIndex]

        if (newSpot.piece !== null) {
            newSpot.piece.hidePieceElement()
        }

        newSpot.piece = oldSpot.piece
        oldSpot.piece = null

        newSpot.piece.rowIndex = newRowIndex
        newSpot.piece.colIndex = newColIndex
        if (newSpot.piece.name === 'pawn') {
            newSpot.piece.handlePromotion(this.rowList)
        }
        this.player = this.player === 'white' ? 'black' : 'white'
    }

    handlePlayerTurn(playerColor) {
        if (playerColor === this.player) {
            return true
        }
        alert(`This is ${board.player} turn`)
        return false
    }

    changeValidElementsColor(squareObjectList) {
        for (let index = 0 ; index < squareObjectList.length ; ++index) {
            const color = squareObjectList[index].piece === null ? 'gray' : 'red'
            squareObjectList[index].changeSquareElementColor(color)
        }
    }

    resetGame() {
        const boardElement = document.getElementById('chess-board')
        const boardChildElement = boardElement.querySelectorAll('*')
        boardChildElement.forEach(element => element.remove())
        this.rowList = []
        this.currentPiece = null
        this.createObjectsAndElements()
        this.renderElements()
    }
}