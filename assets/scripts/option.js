class LevelingOption {
    constructor(pawnObject) {
        this.pawnObject = pawnObject
        this.optionsContainerElement = document.createElement('div')
        this.optionNameList = ['queen', 'knight', 'rook', 'bishop']
        this.optionElementList = []
    }

    designOptionsContainerElement() {
        this.optionsContainerElement.id = 'options-container'
        if (this.pawnObject.color === 'white') {
            this.optionsContainerElement.style.top = '-1px'
        } else {
            this.optionsContainerElement.style.bottom = '-1px'
        }

        for (let nameIndex = 0 ; nameIndex < this.optionNameList.length ; ++nameIndex) {
            const optionElement = document.createElement('img')
            const optionName = this.optionNameList[nameIndex]

            optionElement.classList.add(optionName)
            optionElement.src = `./assets/images/pieces/${this.pawnObject.color}_${optionName}.png`

            this.optionElementList.push(optionElement)
            this.optionsContainerElement.appendChild(optionElement)
        }
        return this.optionsContainerElement
    }

    addEventToOptionElement() {
        const _this = this
        for (let elementIndex = 0 ; elementIndex < this.optionNameList.length ; ++elementIndex) {
            const elementName = this.optionNameList[elementIndex]
            this.optionElementList[elementIndex].addEventListener('click', function() {
                _this.createNewPiece(elementName, _this.pawnObject, board.rowList)
            })
        }
    }

    createNewPiece(name, pawnObject, rowList) {
        const pawnRowIndex = pawnObject.rowIndex
        const pawnColIndex = pawnObject.colIndex
        console.log(pawnRowIndex, pawnColIndex)
        const pawnColor = pawnObject.color
        let pawnLocation = rowList[pawnRowIndex].colList[pawnColIndex]
        switch (name) {
            case 'knight':
                pawnLocation.piece = new Knight(pawnColIndex, pawnRowIndex, name, pawnColor)
                break
            case 'bishop':
                pawnLocation.piece = new Bishop(pawnColIndex, pawnRowIndex, name, pawnColor)
                break
            case 'rook':
                pawnLocation.piece = new Rook(pawnColIndex, pawnRowIndex, name, pawnColor)
                break
            default:
                pawnLocation.piece = new Queen(pawnColIndex, pawnRowIndex, name, pawnColor)
                break
        }
        this.optionsContainerElement.remove()
        pawnLocation.piece.designPieceElement()
        pawnObject.hidePieceElement()
        board.renderElements()
    }
}