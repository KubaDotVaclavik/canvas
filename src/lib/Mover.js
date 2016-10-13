import Vector from './Vector'

const G = 0.1
const FRICTION = 0.01

const X_MAX = 400
const Y_MAX = 350

class Mover {
    constructor(props) {
        debugger;
        this.position = props.position
        this.velocity = props.velocity || new Vector(0, 0)
        this.acceleration = new Vector(0, 0)
        this.mass = props.mass || 1
        this.edgeCollision = props.edgeCollision || true
        this.gravitySensitive = props.gravitySensitive || true
        this.target = props.target || null
    }

    set target(target){
        if(target instanceof Vector){
            this._target = target
            this._initDistToTarget = target.new().sub(this.position).mag()
            this.velocity.multi(0)
            // const toTarget = this.target.new().sub(this.position)
            // const direction = toTarget.normalize()

            // this.applyForce(direction.multi(0.2))
        }else{
            this._target = null
            this._initDistToTarget = null
        }
    }

    move() {
        this.position.add(this.velocity)
        this.velocity.add(this.acceleration)
        this.acceleration = new Vector(0, 0)
    }

    update() {
        this.applyGravity()
        this.applyFriction()
        
        this.checkEdges()

        this.move()

        return this;
    }

    // getNew(){
    //     debugger;
    //     return new Mover(this)
    // }

    applyForce(force) {
        if (!force instanceof Vector) {
            throw new Error('Wrong data type. Expected instence of Vector.')
        }
        this.acceleration.add(force)
    }

    applyGravity() {
        if (this.gravitySensitive) {
            const gravity = new Vector(0, this.mass * G)
            if (this.position.y < Y_MAX - 1) {
                this.applyForce(gravity)
            }
        }else{
            debugger;
        }
    }

    applyFriction(){
        const friction = new Vector(this.velocity)
        friction.multi(-1).normalize().multi(FRICTION)
        this.applyForce(friction)
    }

    checkEdges() {
        const EDGE_ABSORBE = 0.4

        if (this.edgeCollision) {
            if (this.position.x > X_MAX) {
                this.position.x = X_MAX
                this.velocity
                    .multi(new Vector(-1, 1))
                    .multi(new Vector(1 - EDGE_ABSORBE, 1))

                if (Math.abs(this.velocity.x) < 0.5) {
                    this.velocity.x = 0
                }
            }
            if (this.position.y > Y_MAX) {
                this.position.y = Y_MAX
                this.velocity
                    .multi(new Vector(1, -1))
                    .multi(new Vector(1, 1 - EDGE_ABSORBE))

                if (Math.abs(this.velocity.y) < 0.5) {
                    this.velocity.y = 0
                }
            }
        }
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, 5, 0, 2 * Math.PI);
        ctx.stroke();
    }
}

export default Mover;