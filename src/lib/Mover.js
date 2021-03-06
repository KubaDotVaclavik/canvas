import Vector from './Vector'

const G = 0.1
const FRICTION = 0.01

class Mover {
    constructor(props) {
        this.X_MAX = props.X_MAX
        this.Y_MAX = props.Y_MAX
        this.position = props.position || new Vector(0, 0)
        this.velocity = props.velocity || new Vector(0, 0)
        this.acceleration = new Vector(0, 0)
        this.mass = props.mass || 1
        this.edgeCollision = props.edgeCollision || true
        this.gravitySensitive = props.gravitySensitive || true
        this.frictionSensitive = props.frictionSensitive || true
        this.target = props.target || null
    }

    set target(target) {
        if (target instanceof Vector) {
            this._target = target
            this._initDistToTarget = target.new().sub(this.position).mag()
            this.velocity.multi(0)
        } else {
            this._target = null
            this._initDistToTarget = null
        }
    }
    get target() {
        return this._target
    }

    move() {
        this.position.add(this.velocity)
        this.velocity.add(this.acceleration)
        this.acceleration = new Vector(0, 0)
    }

    update() {
        this.applyGravity()
        this.applyFriction()
        this.forceToTarget()

        this.checkEdges()

        this.move()

        return this;
    }

    applyForce(force) {
        if (!force instanceof Vector) {
            throw new Error('Wrong data type. Expected instence of Vector.')
        }
        this.acceleration.add(force)
    }

    randomVelocity(n = 1) {
        this.velocity = new Vector(0.5 - Math.random(), 0.5 - Math.random())
            .multi(n)
    }

    randomPosition() {
        this.position = new Vector(this.X_MAX * Math.random(), this.Y_MAX * Math.random())
    }

    applyGravity() {
        if (this.gravitySensitive) {
            const gravity = new Vector(0, this.mass * G)
            if (this.position.y < this.Y_MAX - 1) {
                this.applyForce(gravity)
            }
        }
    }

    applyFriction() {
        if (this.frictionSensitive) {
            const friction = new Vector(this.velocity)
            friction.multi(-1).normalize().multi(FRICTION)
            this.applyForce(friction)
        }
    }

    forceToTarget() {
        if (this.target instanceof Vector) {
            const toTarget = this.target.new().sub(this.position)
            const divRatio = toTarget.mag() / this._initDistToTarget // 1 -> 0
            const sinRatio = Math.sin(Math.PI / 2 * divRatio)
            const direction = toTarget.new().normalize()
            this.velocity = direction.multi(1 + 30 * sinRatio)

            if (toTarget.mag() < 3) {
                this.position = this.target.new()
                this.velocity.multi(0)
                this.target = null
            }
        }
    }

    checkEdges() {
        const EDGE_ABSORBE = 0.4

        if (this.edgeCollision) {
            if (this.position.x > this.X_MAX) {
                this.position.x = this.X_MAX
                this.velocity
                    .multi(new Vector(-1, 1))
                    .multi(new Vector(1 - EDGE_ABSORBE, 1))

                if (Math.abs(this.velocity.x) < 0.5) {
                    this.velocity.x = 0
                }
            }
            if (this.position.x < 0) {
                this.position.x = 0
                this.velocity
                    .multi(new Vector(-1, 1))
                    .multi(new Vector(1 - EDGE_ABSORBE, 1))

                if (Math.abs(this.velocity.x) < 0.5) {
                    this.velocity.x = 0
                }
            }
            if (this.position.y > this.Y_MAX) {
                this.position.y = this.Y_MAX
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
        ctx.arc(this.position.x, this.position.y, 1, 0, 2 * Math.PI);
        ctx.stroke();
    }
}

export default Mover;