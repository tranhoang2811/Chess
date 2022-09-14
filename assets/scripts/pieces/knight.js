class Knight extends Piece {
    constructor(colIndex, rowIndex, name, color) {
        super(colIndex, rowIndex, name, color)
        this.rowMovement = [-2, -2, -1, -1 , 1, 1, 2, 2]
        this.colMovement = [-1 , 1, -2, 2, -2, 2, -1, 1]
    }

    findMove(rowList) {
        const squareObjectList = []
        for (let index = 0 ; index < this.rowMovement.length ; ++index) {
            let newRowIndex = this.rowIndex + this.rowMovement[index] 
            let newColIndex = this.colIndex + this.colMovement[index]
            if ((0 <= newRowIndex && newRowIndex <= 7) && (0 <= newColIndex && newColIndex <= 7)) {
                let squareOjbect = rowList[newRowIndex].colList[newColIndex]
                if ((squareOjbect.piece === null) || (squareOjbect.piece !== null && squareOjbect.piece.color !== this.color)) {
                    squareObjectList.push(squareOjbect)
                }
            }
        }
        board.changeValidElementsColor(squareObjectList)
    }
}