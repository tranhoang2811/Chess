class Queen extends Piece {
    constructor(colIndex, rowIndex, name, color) {
        super(colIndex, rowIndex, name, color)
        this.rowMovement = [-7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7]
        this.colMovement = [-7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7]
        this.reverseColMovement = [7, 6, 5, 4, 3, 2, 1, 0, -1, -2, -3, -4, -5, -6, -7]
    }

    findMove(rowList) {
        getPiecesOnLeftDiagonal.call(this, rowList)
        getPiecesOnRightDiagonal.call(this, rowList)
        getPiecesOnCol.call(this, rowList)
        getPiecesOnRow.call(this, rowList)
    }
}