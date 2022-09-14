class Rook extends Piece {
    constructor(colIndex, rowIndex, name, color) {
        super(colIndex, rowIndex, name, color)
        this.isFirstMove = true
    }
    
    findMove(rowList) {
        getPiecesOnCol.call(this, rowList)
        getPiecesOnRow.call(this, rowList)
    }
}