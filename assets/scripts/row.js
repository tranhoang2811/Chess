class Row {
    constructor() {
        this.colList = []
        this.rowElement = document.createElement('div')
    }

    designRowElement() {
        this.rowElement.classList.add('row')
        this.rowElement.style.display = 'flex'
    }
}