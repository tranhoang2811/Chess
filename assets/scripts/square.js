class Square {
    constructor(rowIndex, colIndex, color, piece) {
        this.index = [rowIndex, colIndex]
        this.color = color
        this.piece = piece
        this.squareElement = document.createElement('div')
    }

    designSquareElement() {
        this.squareElement.classList.add('square')
        this.squareElement.style.backgroundColor = this.color

        const _this = this
        this.squareElement.addEventListener('click', function(event) {
            const squareElement = _this.squareElement
            let currentPiece = board.currentPiece
            if (squareElement.style.backgroundColor === 'gray' || squareElement.style.backgroundColor === 'red') {
                const newPieceIndex = _this.index
                const oldPieceIndex = [currentPiece.rowIndex, currentPiece.colIndex]
                board.replacePieceObject(oldPieceIndex, newPieceIndex)
                board.currentPiece = null
                board.renderElements()
            }
        })
    }

    changeSquareElementColor(color) {
        this.squareElement.style.backgroundColor = color
    }
}