import Mover from './Mover'

const rnd = (m = 1) => (Math.random() * m)
const rnd_floor = (m) => Math.floor(rnd(m))

class Circle extends Mover {
    constructor(props) {
        super(props)

        this.radius = props.radius || 2
        this.color = props.color ||
            `rgba(${rnd_floor(255)} ,${rnd_floor(255)}, ${rnd_floor(255)}, ${rnd()})`
    }

    checkCollision(v) {
        return Math.abs(this.position.new().sub(v).mag()) <= this.radius
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

export default Circle