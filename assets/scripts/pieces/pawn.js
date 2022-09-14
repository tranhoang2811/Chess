class Pawn extends Piece {
    constructor(colIndex, rowIndex, name, color) {
        super(colIndex, rowIndex, name, color)
        this.isFirstMove = true
        this.rowMovement = this.color === 'white' ? -1 : 1
        this.colMovement = [0, -1, 1]
    }

    findMove(rowList) {
        const squareObjectList = []
        this.handlePromotion(rowList)
        for (let index = 0 ; index < this.colMovement.length ; ++index) {
            let newRowIndex = this.rowIndex + this.rowMovement
            let newColIndex = this.colIndex + this.colMovement[index]
            if ((0 <= newRowIndex && newRowIndex <= 7) && (0 <= newColIndex && newColIndex <= 7)) {
                let squareOjbect = rowList[newRowIndex].colList[newColIndex]
                let pieceObject = squareOjbect.piece
                if ((pieceObject === null && newColIndex === this.colIndex)) {
                    squareObjectList.push(squareOjbect)
                }
                if ((pieceObject !== null && pieceObject.color !== this.color && newColIndex !== this.colIndex)) {
                    squareObjectList.push(squareOjbect)
                }
            }
        }
        if (squareObjectList.length !== 0 && squareObjectList[0].piece === null) {
            this.handleFirstMove(squareObjectList, rowList)
        }
        board.changeValidElementsColor(squareObjectList)
    }

    handleFirstMove(squareObjectList, rowList) {
        if (this.isFirstMove) {
            let squareOjbect
            if (this.color === 'white') {
                squareOjbect = rowList[4].colList[this.colIndex]
            } else {
                squareOjbect = rowList[3].colList[this.colIndex]
            }
            squareObjectList.push(squareOjbect)
            this.isFirstMove = false
        }
    }

    handlePromotion(rowList) {
        if (this.rowIndex === 0 || this.rowIndex === 7) {
            const squareObject = rowList[this.rowIndex].colList[this.colIndex]
            const squareElement = squareObject.squareElement
            const options = new LevelingOption(this)
            squareElement.appendChild(options.designOptionsContainerElement())
            options.addEventToOptionElement()
        }
    }
}