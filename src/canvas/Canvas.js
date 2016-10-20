import React, { Component } from 'react';
import Vector from '../lib/Vector';
import Circle from '../lib/Circle';

const getStyle = (style) =>
    Object.assign({
        position: 'absolute' 
    }, style)

class Canvas extends Component {
    constructor(props) {
        super(props)

        this.state = {
            hasTarget: false,
            mouseCoor: [],
            circles: Array.from(new Array(80), () => {
                const c = new Circle({
                    radius: Math.floor(Math.random() * 10 + 2),
                    X_MAX: props.width,
                    Y_MAX: props.height
                })
                c.randomPosition()
                c.randomVelocity(5)
                return c
            })
        }

        this.mouseMove = this.mouseMove.bind(this)
        this.mouseClick = this.mouseClick.bind(this)
        this.animate = this.animate.bind(this)
    }

    getCoordinates(event) {
        const refName = "canvas"

        if (event.pageX == null && event.clientX != null) {
            var doc = document.documentElement, body = document.body;
            event.pageX = event.clientX + ((doc && doc.scrollLeft) || (body && body.scrollLeft) || 0) - ((doc && doc.clientLeft) || (body && body.clientLeft) || 0);
            event.pageY = event.clientY + ((doc && doc.scrollTop) || (body && body.scrollTop) || 0) - ((doc && doc.clientTop) || (body && body.clientTop) || 0);
        }

        return {
            x: event.pageX - this.refs[refName].getBoundingClientRect().left,
            y: event.pageY - this.refs[refName].getBoundingClientRect().top
        }

    }

    mouseMove(e) {
        this.setState({ mouseCoor: this.getCoordinates(e) })
    }

    mouseClick(e) {
        const { height } = this.props  
        const circles = this.state.circles
        const hasTarget = this.state.hasTarget
        if (hasTarget) {
            const coor = this.getCoordinates(e)
            circles.forEach(circle => {
                circle.target = new Vector(coor.x, Math.random() * height)
                circle.gravitySensitive = false
                circle.frictionSensitive = false
            })
        } else {
            circles.forEach(circle => {
                circle.target = null
                circle.gravitySensitive = true
                circle.frictionSensitive = true
                circle.randomVelocity(10)

            })
        }
        this.setState({ hasTarget: !hasTarget })
    }

    draw() {
        const ctx = this.ctx
        const {circles, mouseCoor} = this.state
        const mouseVectore = new Vector(mouseCoor.x, mouseCoor.y)

        circles.forEach(c => {
            if (c.checkCollision(mouseVectore) && c.velocity.mag() === 0) {
                c.gravitySensitive = true
                c.frictionSensitive = true
                c.randomVelocity(10)
            }

            c.update()
            c.draw(ctx)
        })
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.draw()
        requestAnimationFrame(this.animate);
    }

    componentDidMount() {
        this.canvas = this.refs.canvas
        this.ctx = this.refs.canvas.getContext('2d')
        this.animate()
    }

    render() {
        const { width, height, style } = this.props;

        return (
            <canvas 
                style={getStyle(style)}
                width={width}
                height={height}
                ref="canvas"
                onMouseMove={this.mouseMove}
                onMouseUp={this.mouseClick}
                >
            </canvas>
        )
    }
}

Canvas.contextTypes = {
    store: React.PropTypes.object
};

export default Canvas