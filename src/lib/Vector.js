class Vector {
    constructor(x = 0, y = 0){
        this.x = x;
        this.y = y;
    }

    add({x = 0, y = 0}){
        return new Vector(this.x + x, this.y + y)
    }

    multiply({x = 0, y = 0}){
        return new Vector(this.x * x, this.y * y)        
    }
}

export default Vector;