class King extends Piece {
    constructor(colIndex, rowIndex, name, color) {
        super(colIndex, rowIndex, name, color)
        this.isFirstMove = true
        this.rowMovement = [1, 1, -1, -1, 1, -1, 0, 0]
        this.colMovement = [-1, 1, -1, 1, 0, 0, 1, -1]
    }

    findMove(rowList) {
        const squareObjectList = []
        for (let index = 0 ; index < this.rowMovement.length ; ++index) {
            let newRowIndex = this.rowIndex + this.rowMovement[index] 
            let newColIndex = this.colIndex + this.colMovement[index]
            if ((0 <= newRowIndex && newRowIndex <= 7) && (0 <= newColIndex && newColIndex <= 7)) {
                let squareOjbect = rowList[newRowIndex].colList[newColIndex]
                let pieceObject = squareOjbect.piece
                if ((pieceObject === null) || (pieceObject !== null && pieceObject.color !== this.color)) {
                    squareObjectList.push(squareOjbect)
                }
            }
        }
        this.handleCastling(rowList[this.rowIndex].colList)
        board.changeValidElementsColor(squareObjectList)
    }

    hidePieceElement() {
        this.pieceElement.style.display = 'none'
        this.onBoard = false
        const winnerColor = this.color === 'white' ? 'black' : 'white'
        alert(`${winnerColor} win`)
        board.resetGame()
    }

    handleCastling(kingRow) {
        const havePieceInBetweenOnLeft = this.checkPieceInBetween(kingRow.slice(1, 4))
        const isLeftRookFirstMove = this.checkRookFirstMove(kingRow[0])
        const canLeftCasteling = havePieceInBetweenOnLeft && isLeftRookFirstMove

        const havePieceInBetweenOnRight = this.checkPieceInBetween(kingRow.slice(5, 7))
        const isRightRookFirstMove = this.checkRookFirstMove(kingRow[7])
        const canRightCasteling = havePieceInBetweenOnRight && isRightRookFirstMove

        if (this.isFirstMove && canLeftCasteling) {
            const leftRookSquare = kingRow[0]
            leftRookSquare.squareElement.style.backgroundColor = 'turquoise'
        }
        if (this.isFirstMove && canRightCasteling) {
            const leftRookSquare = kingRow[7]
            leftRookSquare.squareElement.style.backgroundColor = 'turquoise'
        }
    }

    checkPieceInBetween(squareList) {
        for (let squareIndex = 0 ; squareIndex < squareList.length ; ++squareIndex) {
            if (squareList[squareIndex].piece !== null) {
                return false
            }
        } 
        return true
    }

    checkRookFirstMove(squareObject) {
        if (squareObject.piece === null) {
            return false
        }
        return squareObject.piece.name ==='rook' && squareObject.piece.isFirstMove
    }
}