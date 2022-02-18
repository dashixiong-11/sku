class Xxx {
    constructor(vertex) {
        this.vertex = vertex //[v0,v1,v2,v3,v4]
        this.quantity = vertex.length
        this.init()
    }

    init() {
        this.Matrix = Array.from({length: this.quantity * this.quantity})
    }

    findCol(id) {
        const index = this.vertex.indexOf(id)
        const col = []
        this.vertex.forEach(i => {
            col.push(i * this.quantity + index)
        })
        return col
    }

    findAssociate(id) {

    }


    setAssociate(id, ids) {
        const index = this.vertex.indexOf(id)
        ids.forEach(i => {
            const index2 = this.vertex.indexOf(i)
            this.Matrix[index * this.quantity + index2] = 1
        })
    }
}

export default Xxx