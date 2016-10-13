class Vector {
    constructor(x = 0, y = 0) {
        if (x instanceof Vector) {
            this._x = x.x;
            this._y = x.y;
        } else {
            this._x = x;
            this._y = y;
        }
    }

    set x(x) {
        this._x = x
    }
    set y(y) {
        this._y = y
    }
    get x() {
        return this._x
    }
    get y() {
        return this._y
    }

    new() {
        return new Vector(this)
    }

    add(v) {
        if (!v instanceof Vector) {
            throw new Error('Wrong data type. Expected instence of Vector.')
        }
        this.x = this.x + v.x
        this.y = this.y + v.y
        return this;
    }

    sub(v) {
        if (!v instanceof Vector) {
            throw new Error('Wrong data type. Expected instence of Vector.')
        }
        this.x = this.x - v.x
        this.y = this.y - v.y
        return this;
    }

    multi(v) {
        if (v instanceof Vector) {
            this.x = this.x * v.x
            this.y = this.y * v.y
        } else if (typeof v === 'number') {
            this.x = this.x * v
            this.y = this.y * v
        } else {
            throw new Error('Wrong data type. Expected instence of Vector or number.')
        }
        return this;
    }
    div(v) {
        if (v instanceof Vector) {
            this.x = this.x / v.x
            this.y = this.y / v.y
        } else if (typeof v === 'number') {
            this.x = this.x / v
            this.y = this.y / v
        } else {
            throw new Error('Wrong data type. Expected instence of Vector or number.')
        }
        return this;
    }

    mag() {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }
    normalize() {
        var m = this.mag();
        if (m > 0) {
            this.div(m);
        }
        return this;
    }

}

export default Vector;