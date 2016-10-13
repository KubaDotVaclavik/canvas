import React, { Component } from 'react';
import Circles from '../circles/Circles';
import Vector from '../lib/Vector';
import Mover from '../lib/Mover';

class Canvas extends Component {
    constructor(props) {
        super(props)

        this.state = {
            hasTarget: false,
            mouseCoor: [],
            circles: [
                new Mover({
                    position: new Vector(60, 10),
                    velocity: new Vector(2, 0)
                }),
                new Mover({
                    position: new Vector(60, 10),
                    velocity: new Vector(-3, 0)
                })
            ],
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
        const circles = this.state.circles
        const hasTarget = this.state.hasTarget
        if (hasTarget) {
            const coor = this.getCoordinates(e)
            circles.forEach(circle => {
                circle.target = new Vector(coor.x, coor.y)
                circle.gravitySensitive = false
                circle.frictionSensitive = false
            })
        } else {
            circles.forEach(circle => {
                circle.target = null
                circle.gravitySensitive = true
                circle.frictionSensitive = true
                
            })
        }
        this.setState({ hasTarget: !hasTarget })
    }

    draw() {
        const ctx = this.ctx
        const circles = this.state.circles
        circles.forEach(circle => {
            circle.update()
            circle.draw(ctx)
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
        const { width, height } = this.props;

        return (
            <canvas style={{ border: '1px solid #ddd' }}
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