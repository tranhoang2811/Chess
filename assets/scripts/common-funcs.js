function getPiecesOnCol(rowList) {
    const squareObjectList = []
    const pieceObjectList = []
    for (let rowIndex = 0 ; rowIndex < board.rows ; ++rowIndex) {
        const squareOjbect = rowList[rowIndex].colList[this.colIndex]
        const pieceOject = squareOjbect.piece
        squareObjectList.push(squareOjbect)
        pieceObjectList.push(pieceOject)
    }
    const coreIndex = pieceObjectList.indexOf(this)
    const validRowMoves = this.findValidMoveRange(squareObjectList, coreIndex)
    board.changeValidElementsColor(validRowMoves)
}

function getPiecesOnRow(rowList) {
    const squareObjectList = []
    const pieceObjectList = []
    for (let colIndex = 0 ; colIndex < board.cols ; ++colIndex) {
        const squareOjbect = rowList[this.rowIndex].colList[colIndex]
        const pieceOject = squareOjbect.piece
        squareObjectList.push(squareOjbect)
        pieceObjectList.push(pieceOject)
    }
    const coreIndex = pieceObjectList.indexOf(this)
    const validColMoves = this.findValidMoveRange(squareObjectList, coreIndex)
    board.changeValidElementsColor(validColMoves)
}

function getPiecesOnLeftDiagonal(rowList) {
    const squareObjectList = []
    const pieceObjectList = []
    for (let index = 0 ; index < this.rowMovement.length ; ++index) {
        let newRowIndex = this.rowIndex + this.rowMovement[index] 
        let newColIndex = this.colIndex + this.colMovement[index]
        if ((0 <= newRowIndex && newRowIndex <= 7) && (0 <= newColIndex && newColIndex <= 7)) {
            let squareOjbect = rowList[newRowIndex].colList[newColIndex]
            let pieceObject = squareOjbect.piece
            squareObjectList.push(squareOjbect)
            pieceObjectList.push(pieceObject)
        }
    }
    const coreIndex = pieceObjectList.indexOf(this)
    const validLeftDiagonalMoves = this.findValidMoveRange(squareObjectList, coreIndex)
    board.changeValidElementsColor(validLeftDiagonalMoves)
}

function getPiecesOnRightDiagonal(rowList) {
    const squareObjectList = []
    const pieceObjectList = []
    for (let index = 0 ; index < this.rowMovement.length ; ++index) {
        let newRowIndex = this.rowIndex + this.rowMovement[index] 
        let newColIndex = this.colIndex + this.reverseColMovement[index]
        if ((0 <= newRowIndex && newRowIndex <= 7) && (0 <= newColIndex && newColIndex <= 7)) {
            let squareOjbect = rowList[newRowIndex].colList[newColIndex]
            let pieceObject = squareOjbect.piece
            squareObjectList.push(squareOjbect)
            pieceObjectList.push(pieceObject)
        }
    }
    const coreIndex = pieceObjectList.indexOf(this)
    const validRightDiagonalMoves = this.findValidMoveRange(squareObjectList, coreIndex)
    board.changeValidElementsColor(validRightDiagonalMoves)
}
