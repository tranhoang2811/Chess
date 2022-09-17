class Piece {
    constructor(colIndex, rowIndex, name, color) {
        this.colIndex = colIndex
        this.rowIndex = rowIndex
        this.name = name
        this.color = color
        this.pieceElement = document.createElement('img')
        this.onBoard = true
    }
    
    designPieceElement() {
        this.pieceElement.classList.add('piece')
        this.pieceElement.src = `./assets/images/pieces/${this.color}_${this.name}.png`

        const _this = this
        this.pieceElement.addEventListener('click', function(event) {
            const squareElement = event.target.parentElement
            //  && board.handlePlayerTurn(_this.color)
            if (squareElement.style.backgroundColor === 'turquoise') {
                const newRookColIndex = _this.colIndex === 0 ? 3 : 5 
                const oldRookIndex = [_this.rowIndex, _this.colIndex]
                const newRookIndex = [_this.rowIndex, newRookColIndex]

                const newKingColIndex = _this.colIndex === 0 ? 2 : 6
                const oldKingIndex = [_this.rowIndex, 4]
                const newKingIndex = [_this.rowIndex, newKingColIndex]

                board.replacePieceObject(oldRookIndex, newRookIndex)
                board.replacePieceObject(oldKingIndex, newKingIndex)
                board.player = _this.color === 'white' ? 'black' : 'white'
                board.renderElements()
            } else if (squareElement.style.backgroundColor !== 'red') {
                board.renderElements()
                board.currentPiece = _this
                _this.findMove(board.rowList)
            } 
        })
    }

    hidePieceElement() {
        this.pieceElement.style.display = 'none'
        this.onBoard = false
    }

    findMove(rowList) {
        
    }

    findValidMoveRange(squareList, coreIndex) {
        // Limit two head of the list
        let leftLimit = 0
        let rightLimit = squareList.length - 1
        
        for (let index = 0 ; index < squareList.length ; ++index) {
            if (squareList[index].piece !== null && index !== coreIndex) {
                let pieceElementColor = squareList[index].piece.color
                if (index < coreIndex) {
                    // Because the slice method slice from a to b so if the color is ally it will count that spot too
                    leftLimit = pieceElementColor === this.color ? index + 1 : index
                } else {
                    // Because the slice method slice from a to b so if the color is ally it will count that spot too
                    rightLimit = pieceElementColor === this.color ? index -1 : index
                    break
                }
            }
        }
        
        squareList.splice(coreIndex, 1)
        return squareList.slice(leftLimit, rightLimit)
    }
}
